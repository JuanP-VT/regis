"use client";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import ShoppingCart from "@/utils/classes/ShoppingCart";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { TrashIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { ArrowBack } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ShoppingCartPage() {
  const router = useRouter();
  const [Cart, setCart] = useState<ShoppingCart>();
  useEffect(() => {
    setCart(new ShoppingCart());
  }, []);
  if (!process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID) {
    throw new Error("Missing PayPal client ID");
  }
  async function paypalCaptureOrder(orderID: string) {
    try {
      const response = await fetch("/api/paypal/capture", {
        method: "POST",
        body: JSON.stringify({ orderID }),
      });
      const data = await response.json();
      if (!data.success) {
        return false;
      } else {
        return true;
      }
    } catch (error) {
      return false;
    }
  }
  return (
    <div className="mt-5 flex w-full justify-center">
      <div className="w-full max-w-[1200px] lg:min-w-[900px]">
        <Card>
          <CardHeader className="pb-4">
            <CardTitle>Carrito De Compras</CardTitle>
            <CardDescription>
              Tienes {Cart?.getItemCount()} Productos En El Carrito
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="border-t">
              <div className="grid gap-4 p-4">
                {Cart?.getCart().map((item, index) => (
                  <div key={`item${index}`} className="flex items-start gap-4">
                    <div className="w-24">
                      <Image
                        alt="Thumbnail"
                        className="aspect-square rounded-lg object-cover"
                        height="200"
                        src={item.imageUrlList[item.mainImageIndex]}
                        width="200"
                      />
                    </div>
                    <div className="grid flex-1 gap-1.5">
                      <div className="font-medium">{item.storeItemName}</div>
                      {item.discountPercentage > 0 && (
                        <div className="font-semibold ">
                          $
                          {(
                            item.price -
                            (item.price * item.discountPercentage) / 100
                          ).toFixed(2)}
                        </div>
                      )}
                      {item.discountPercentage <= 0 && (
                        <div className="font-semibold">${item.price}</div>
                      )}
                      <div className="flex items-center ">
                        <Button size="sm" variant="outline">
                          <TrashIcon
                            onClick={() => {
                              Cart?.deleteItem(item._id);
                              setCart(new ShoppingCart());
                            }}
                            className="h-4 w-4"
                          />
                          <span className="sr-only">Remove</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="mt-5 flex flex-col gap-4 p-7">
            {Cart && Cart?.getItemCount() > 0 && (
              <div className="self-start">
                <div className=" ">
                  <div>Total</div>
                  <div className="font-semibold">
                    {Cart?.getTotalCost().toFixed(2)} $MX
                  </div>
                </div>
                <PayPalScriptProvider
                  options={{
                    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
                  }}
                >
                  <PayPalButtons
                    style={{
                      color: "gold",
                    }}
                    createOrder={async () => {
                      const res = await fetch("/api/paypal/checkout", {
                        method: "POST",
                        body: JSON.stringify({ cart: Cart.getCart() }),
                      });
                      const order = await res.json();
                      return order.id;
                    }}
                    onApprove={async (data) => {
                      const success = await paypalCaptureOrder(data.orderID);
                      if (success) {
                        toast("Compra Exitosa 🎉");
                        Cart.setRecentPurchase(true);
                        setTimeout(() => {
                          router.push("/thanks");
                        }, 1000);
                      } else {
                        toast(
                          "Hubo un error al procesar tu compra, intenta de nuevo",
                        );
                      }
                    }}
                  />
                </PayPalScriptProvider>
              </div>
            )}

            <Button
              className="group flex self-start"
              variant={"secondary"}
              onClick={() => router.back()}
            >
              <ArrowBack className="mr-2 group-hover:text-pink-500" />
              <p className="group-hover:text-pink-500">Regresar A Comprar</p>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
