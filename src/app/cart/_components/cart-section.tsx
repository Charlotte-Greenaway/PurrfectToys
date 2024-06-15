"use client";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import useLocalStorageState from "use-local-storage-state";
import { type LocalBasketItem } from "~/types/basket";
import CartItem from "./cart-item";
import Link from "next/link";
export default function Cart(props: { hasAddressAndTel: boolean }) {
  const { hasAddressAndTel } = props;
  const [basket, setBasket] = useLocalStorageState<LocalBasketItem[]>(
    "basket",
    {
      defaultValue: [],
    }
  );
  const basketEmpty = basket.length === 0;
  const subTotal = basket.reduce(
    (acc, item) => acc + item.price * item.count,
    0
  );
  const shipping = !basketEmpty ? (subTotal > 50 ? 0 : 5.99) : 0;
  return (
    <div className="container mx-auto px-4 md:px-6 py-6">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8">
        <div className="border rounded-lg p-6 shadow-sm">
          <div className="grid gap-6">
            {basket.map((item) => {
              return <CartItem {...item} key={item.productId} />;
            })}
            {basket.length <= 0 && <p>Your cart is empty</p>}
          </div>
        </div>
        <div className="border rounded-lg p-6 shadow-sm">
          <div className="grid gap-4">
            <div>
              <h2 className="text-lg font-medium mb-2">Order Summary</h2>
              <div className="grid grid-cols-[1fr_auto] gap-2">
                <span>Subtotal</span>
                <span>£{subTotal.toFixed(2)}</span>
                <span>Shipping</span>
                <span>£{shipping.toFixed(2)}</span>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-medium mb-2">Promo Code</h2>
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Enter promo code"
                  className="flex-1"
                />
                <Button>Apply</Button>
              </div>
            </div>
            <div className="grid grid-cols-[1fr_auto] gap-2">
              <span className="font-medium">Total</span>
              <span className="font-medium">
                £{(subTotal + shipping).toFixed(2)}
              </span>
            </div>
            <div className="grid gap-2">
              <Link href="/cart/checkout" className="w-full">
                <Button
                  size="lg"
                  disabled={basketEmpty || !hasAddressAndTel}
                  className="w-full"
                >
                  Proceed to Checkout
                </Button>
              </Link>
              <p>
                {!hasAddressAndTel && (
                  <span className="text-red-500">
                    Please{" "}
                    <Link href="/account" className="underline hover:text-red-800">
                      add your address and phone number
                    </Link>
                    to proceed
                  </span>
                )}
              </p>
              <Link href="/">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-center w-full"
                >
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
