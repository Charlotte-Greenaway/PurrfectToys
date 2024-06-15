import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import Image from "next/image";
import { getUserOrderById } from "~/lib/user-accounts/utils";
import { type order } from "~/types/account";
import { format } from "date-fns";
import { ShoppingBagIcon } from "lucide-react";
import { client } from "~/../sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";
const builder = imageUrlBuilder(client);

export default async function OrderDrawer(order: { orderNumber: string }) {
  const orderDetails: order[] = await getUserOrderById(order.orderNumber);
  const orderDisplay = orderDetails[0];
  if (!orderDisplay?.orderItems) {
    return null;
  }
  const orderTotal = orderDisplay.orderItems.reduce((acc, item) => {
    return acc + Number(item.item.price) * item.count;
  }, 0);
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="bg-[#F1279A] text-white hover:bg-[#F1279A]/90"
        >
          <ShoppingBagIcon className="h-5 w-5 mr-2" />
          View Order
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[80dvh]">
        <div className="mx-auto w-full max-w-2xl">
          <DrawerHeader>
            <DrawerTitle>Order #{orderDisplay.orderNumber}</DrawerTitle>
            <DrawerDescription>
              Placed on {format(new Date(orderDisplay.orderDate), "yyyy-MM-dd")}
            </DrawerDescription>
          </DrawerHeader>
          <div className="h-[40dvh] overflow-y-auto">
            {orderDisplay.orderItems &&
              orderDisplay.orderItems.map((item) => (
                <div
                  className="grid grid-cols-[1fr_3fr_4fr] items-center gap-4 max-w-[100%]"
                  key={item.item.name}
                >
                  <Image
                    src={builder.image(item.item.image).url()}
                    alt={item.item.name}
                    width={80}
                    height={80}
                    className="rounded-md object-cover"
                  />
                  <div>
                    <Link href={`/product/${item.item.productId}`}>
                      <h3 className="font-medium hover:underline">
                        {item.item.name}
                      </h3>
                    </Link>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      {item.item.description.slice(0, 70)}...
                    </p>
                  </div>
                  <div className="flex items-center gap-2 justify-end">
                    <span>£{Number(item.item.price).toFixed(2)}</span>
                    <span>x{item.count}</span>
                  </div>
                </div>
              ))}
          </div>
          <DrawerFooter>
            <p>
              <span className="font-bold">Total:</span> £{Number(orderDisplay.orderTotal).toFixed(2)}
            </p>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
