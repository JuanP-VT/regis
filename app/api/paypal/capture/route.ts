import dbConnect from "@/lib/dbConnect";
import { purchaseOrderModel } from "@/lib/models/purchaseOrder";
import { UserModel } from "@/lib/models/user";
import { PurchaseOrder } from "@/types/PurchaseOrder";
import client from "@/utils/paypal/client";
import paypal from "@paypal/checkout-server-sdk";
import { NextResponse } from "next/server";

//Endpoint to capture a paypal order into database
export async function POST(req: Request) {
  const body = await req.json();
  if (!body.orderID) {
    return NextResponse.json(
      { message: "No order ID provided", success: false },
      { status: 400 },
    );
  }
  const { orderID } = body;
  const PaypalClient = client();
  const request = new paypal.orders.OrdersCaptureRequest(orderID);
  request.requestBody({
    payment_source: { token: { id: orderID, type: "BILLING_AGREEMENT" } },
  });
  const response = await PaypalClient.execute(request);
  if (!response) {
    return NextResponse.json(
      { message: "Error capturing order", success: false },
      { status: 500 },
    );
  }
  const getOrderRequest = new paypal.orders.OrdersGetRequest(orderID);
  const orderDetails = await PaypalClient.execute(getOrderRequest);

  // Extract the custom_id from the order details
  const custom_id = orderDetails.result.purchase_units[0].custom_id;

  //Abstract order object for database with only the necessary fields
  interface PurchaseUnit {
    reference_id: string;
    amount: {
      value: string;
    };
  }
  const newPurchaseOrder: PurchaseOrder = {
    createTime: orderDetails.result.create_time,
    id: orderID,
    userID: custom_id,
    payer: {
      address: {
        countryCode: orderDetails.result.payer.address.country_code,
      },
      email: orderDetails.result.payer.email_address,
      name: {
        givenName: orderDetails.result.payer.name.given_name,
        surname: orderDetails.result.payer.name.surname,
      },
    },
    purchaseUnits: orderDetails.result.purchase_units.map(
      (unit: PurchaseUnit) => ({
        referenceID: unit.reference_id,
        value: unit.amount.value,
      }),
    ),
  };
  // Save the order to the database
  try {
    await dbConnect();
    await purchaseOrderModel.create(newPurchaseOrder);

    //Update user purchased items
    const findUser = await UserModel.findOne({ _id: custom_id });
    if (findUser) {
      const purchasedItems = findUser.purchasedItems.concat(
        newPurchaseOrder.purchaseUnits.map((unit) => unit.referenceID),
      ) as [];
      //If the user has purchased the same item multiple times, only save it once
      const uniquePurchasedItems = purchasedItems.filter(
        (item, index) => purchasedItems.indexOf(item) === index,
      );
      await UserModel.updateOne(
        { _id: custom_id },
        { purchasedItems: uniquePurchasedItems },
      );
      return NextResponse.json({ success: true });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error saving order to database", success: false },
      { status: 500 },
    );
  }
}
