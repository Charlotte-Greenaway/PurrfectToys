"use client";
import { ShoppingBasketIcon } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import useLocalStorageState from "use-local-storage-state";
import { type LocalBasketItem } from "~/types/basket";

export default function ShoppingBasket() {
  const [basket] = useLocalStorageState<LocalBasketItem[]>("basket", { defaultValue: [] });

  // Get the length of the basket items
  const basketLength = basket.reduce((acc, item) => acc + item.count, 0);

  return (
    <div className="flex items-center gap-2">
      <ShoppingBasketIcon className="h-10 w-10 lg:h-8 lg:w-8" />
      {basketLength > 0 && (
        <Badge className="absolute text-xs right-1 lg:right-3 top-2">
          {basketLength}
        </Badge>
      )}
    </div>
  );
}
