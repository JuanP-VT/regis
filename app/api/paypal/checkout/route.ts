import { NextResponse } from "next/server";
import paypal from "@paypal/checkout-server-sdk";
import { StoreItemDB_ID } from "@/types/storeItemDB";
import { StoreItemModel } from "@/lib/models/storeItem";
import dbConnect from "@/lib/dbConnect";
import client from "@/utils/paypal/client";
import { getServerSession } from "next-auth";
import { OPTIONS } from "../../auth/[...nextauth]/nextAuthOptions";
import { UserModel } from "@/lib/models/user";
import { User_ID } from "@/types/user";
//Endpoint to create a new paypal order
export async function POST(req: Request) {
  try {
    const session = await getServerSession(OPTIONS);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    // Validate incoming request
    const body = await req.json();
    const shoppingCart: [StoreItemDB_ID] | undefined = body.cart;
    if (!shoppingCart) {
      return NextResponse.json(
        { message: "No items in cart" },
        { status: 400 },
      );
    }
    const itemIDList = shoppingCart?.map((item) => item._id);
    await dbConnect();
    const findItems: StoreItemDB_ID[] = await StoreItemModel.find({
      _id: { $in: itemIDList },
    });
    if (findItems.length === 0) {
      return NextResponse.json({ message: "No items found" }, { status: 400 });
    }
    const request = new paypal.orders.OrdersCreateRequest();
    //We need to find the user DB ID to use a custom ID for the order
    const findUser = (await UserModel.findOne({
      googleId: session.user.googleId,
    })) as User_ID;
    const purchase_units: paypal.orders.PurchaseUnitRequest[] = findItems.map(
      (item) => {
        return {
          reference_id: item.fileName,
          custom_id: findUser._id,
          amount: {
            currency_code: "USD",
            value: (item.price * (1 - item.discountPercentage / 100)).toFixed(
              2,
            ),
            breakdown: {
              shipping_discount: { currency_code: "USD", value: "0.00" },
              discount: { currency_code: "USD", value: "0.00" },
              handling: { currency_code: "USD", value: "0.00" },
              insurance: { currency_code: "USD", value: "0.00" },
              shipping: { currency_code: "USD", value: "0.00" },
              tax_total: { currency_code: "USD", value: "0.00" },
              item_total: {
                currency_code: "USD",
                value: (
                  item.price *
                  (1 - item.discountPercentage / 100)
                ).toFixed(2),
              },
            },
          },
          items: [
            {
              name: item.storeItemName,
              unit_amount: {
                currency_code: "USD",
                value: (
                  item.price *
                  (1 - item.discountPercentage / 100)
                ).toFixed(2),
              },
              category: "DIGITAL_GOODS",
              quantity: "1",
            },
          ],
        };
      },
    );
    request.requestBody({
      intent: "CAPTURE",

      purchase_units: purchase_units,
    });
    const PaypalClient = client();
    const orderRes = await PaypalClient.execute(request);
    return NextResponse.json({ id: orderRes.result.id });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
