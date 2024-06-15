"use client";
import useLocalStorageState from "use-local-storage-state";
import { type LocalBasketItem } from "~/types/basket";
import { Button } from "~/components/ui/button";
import { CalendarDaysIcon, PawPrintIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import PayPalButtonComponent from "./paypal-button";

export default function FinalCheckout(props: { hasAddressAndTel: boolean }) {
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
    <div className="bg-[#f7f7f7] dark:bg-[#1a1a1a] min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        <div className="bg-white dark:bg-[#242424] shadow-lg rounded-2xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-[#F1279A] dark:text-[#F1279A]">
              Checkout
            </h1>
            <div className="flex items-center space-x-2">
              <CalendarDaysIcon className="h-5 w-5 text-[#8c8c8c] dark:text-[#b8b8b8]" />
              <span className="text-[#8c8c8c] dark:text-[#b8b8b8] font-medium">
                Estimated Delivery: 3-5 days
              </span>
            </div>
          </div>
          <div className="border-t border-[#e5e5e5] dark:border-[#333333] pt-6 space-y-4">
            {basket.map((item) => {
              return (
                <div
                  className="flex items-center justify-between"
                  key={item.name}
                >
                  <div className="flex items-center space-x-2">
                    <Image
                      src={item.image}
                      alt="Cat Toy"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <h3 className="text-lg font-medium text-[#333333] dark:text-[#e5e5e5]">
                        {item.name}
                      </h3>
                      <p className="text-[#8c8c8c] dark:text-[#b8b8b8] text-sm">
                        Quantity: {item.count}
                      </p>
                    </div>
                  </div>
                  <span className="text-[#F1279A] dark:text-[#F1279A] font-medium text-lg">
                    £{(item.price * item.count).toFixed(2)}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="border-t border-[#e5e5e5] dark:border-[#333333] pt-6 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <PawPrintIcon className="h-6 w-6 text-[#F1279A] dark:text-[#F1279A]" />
              <h2 className="text-2xl font-bold text-[#333333] dark:text-[#e5e5e5]">
                Total
              </h2>
            </div>
            <span className="text-[#F1279A] dark:text-[#F1279A] font-bold text-2xl">
              £{(subTotal + shipping).toFixed(2)}
            </span>
          </div>
          {!hasAddressAndTel && (
            <span className="text-red-500">
              Please{" "}
              <Link href="/account" className="underline hover:text-red-800">
                add your address and phone number
              </Link>
              to proceed
            </span>
          )}
          {basketEmpty && (
            <p className="text-center text-[#8c8c8c] dark:text-[#b8b8b8]">
              Your cart is empty
            </p>
          )}
          {!basketEmpty && hasAddressAndTel && (
            <div className="my-4">
              <PayPalButtonComponent value={(subTotal + shipping).toFixed(2)} />
            </div>
          )}
        </div>
        <p className="text-red-600 text-center mx-auto w-full text-sm">
          This is a demo checkout page. No real orders will be processed.
        </p>
      </div>
    </div>
  );
}
