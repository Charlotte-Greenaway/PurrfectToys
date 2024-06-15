"use client";
import { Button } from "~/components/ui/button";
import useLocalStorageState from "use-local-storage-state";
import { type BasketItem, type LocalBasketItem } from "~/types/basket";
import { Check } from "lucide-react";
import { useState } from "react";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useToast } from "~/components/ui/use-toast";

export default function ShoppingBasketButton(basketItem: BasketItem) {
  const { toast } = useToast();
  const [amount, setAmount] = useState(1);
  const [hasAdded, setHasAdded] = useState(false);
  const [basket, setBasket] = useLocalStorageState<LocalBasketItem[]>(
    "basket",
    {
      defaultValue: [],
    }
  );

  const addToBasket = () => {
    if (amount > 99 ) {
      toast({
        title: "Amount too high",
        description: "You can only add up to 99 items at a time",
        variant: "destructive",
      });
      return;
    }
    //calculate 
    if(basket.filter((item) => item.productId === basketItem.productId).length + amount > basketItem.stock){
      toast({
        title: "Not enough stock",
        description: "There is not enough stock for this item",
        variant: "destructive",
      });
      return;
    }
    if (amount < 1) {
      toast({
        title: "Amount too low",
        description: "You need to add at least 1 item",
        variant: "destructive",
      });
      return;
    }
    //if item.stock is less than amount
    if (basketItem.stock < amount) {
      toast({
        title: "Not enough stock",
        description: "There is not enough stock for this item",
        variant: "destructive",
      });
      return;
    }
    setHasAdded(true);
    setBasket((prevBasket) => {
      const existingItem = prevBasket.find(
        (item) => item.productId === basketItem.productId
      );
      if (existingItem) {
        // Update count of existing item
        return prevBasket.map((item) =>
          item.productId === basketItem.productId
            ? { ...item, count: item.count + amount }
            : item
        );
      } else {
        // Add new item to the basket
        return [...prevBasket, { ...basketItem, count: amount }];
      }
    });
    setTimeout(() => {
      setHasAdded(false);
    }, 500);
  };

  return (
    <>
      <div className="grid gap-2">
        <Label htmlFor="amount">Amount</Label>
        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value))}
          min={1}
          max={99}
          className="w-full"
        />
      </div>
      <Button size="lg" onClick={addToBasket} disabled={hasAdded||
        basket.filter((item) => item.productId === basketItem.productId).length + amount > basketItem.stock
      }>
        {hasAdded ? <Check className="w-4 h-4 mr-2" /> : "Add to Basket"}
      </Button>
    </>
  );
}
