'use client';
import { Button } from "~/components/ui/button";
import Image from "next/image";
import { PlusIcon, MinusIcon } from "lucide-react";
import { type LocalBasketItem } from "~/types/basket";
import useLocalStorageState from "use-local-storage-state";
import Link from "next/link";
import { TrashIcon } from "lucide-react";
import { useToast } from "~/components/ui/use-toast";

export default function CartItem(CartItem: LocalBasketItem) {
  const { toast } = useToast();
  const [basket, setBasket] = useLocalStorageState<LocalBasketItem[]>(
    "basket",
    {
      defaultValue: [],
    }
  );
  const removeItem = () => {
    setBasket((prevBasket) => {
      return prevBasket.filter(
        (item) => item.productId !== CartItem.productId
      );
    });
  };
  const editQuantity = (add:boolean) => {
    const quantity = (add ? 1 : -1)
    //if quantity is 0, remove item from basket
    if (CartItem.count + quantity === 0) {
      setBasket((prevBasket) => {
        return prevBasket.filter((item) => item.productId !== CartItem.productId);
      });
    } else {
      if (CartItem.count + quantity > CartItem.stock) {
        toast({
          title: "Not enough stock",
          description: "There is not enough stock for this item",
          variant: "destructive",
        });
        return;
      }
      setBasket((prevBasket) => {
        return prevBasket.map((item) =>
          item.productId === CartItem.productId
            ? { ...item, count: item.count + quantity }
            : item
        );
      });
    }
  }
  return (
    <div className="grid grid-cols-[1fr_3fr_4fr] items-center gap-4 max-w-[100%]">
      <Image
        src={CartItem.image}
        alt={CartItem.name}
        width={80}
        height={80}
        className="rounded-md object-cover"
      />
      <div>
        <Link href={`/product/${CartItem.productId}`}><h3 className="font-medium hover:underline">{CartItem.name}</h3></Link>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          {CartItem.description.slice(0, 30)}...
        </p>
      </div>
      <div className="flex items-center gap-2 justify-end">
        <Button variant="outline" size="icon" className="px-1" onClick={()=>{editQuantity(false)}}>
          <MinusIcon className="w-4 h-4" />
        </Button>
        <span>{CartItem.count}</span>
        <Button variant="outline" size="icon" className="px-1" onClick={()=>{editQuantity(true)}}>
          <PlusIcon className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="icon" className="px-1" onClick={removeItem}>
            <TrashIcon className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
