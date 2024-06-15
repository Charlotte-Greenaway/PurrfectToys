"use client";
import { Button } from "~/components/ui/button";
import Image from "next/image";
import Link from "next/link";
export default function ProductWidget(product: {
  title: string;
  image: string;
  price: number;
  productId: string;
}) {
  return (
    <div className="group grid h-auto w-full max-w-[300px] mx-auto items-center justify-start gap-1 rounded-md bg-white p-4 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50">
      <Image
        src={product.image}
        width="300"
        height="200"
        alt={product.title}
        className="aspect-square overflow-hidden rounded-md object-cover"
      />
      <div className="text-lg font-bold group-hover:underline">
        {product.title}
      </div>
      <div className="text-gray-500 dark:text-gray-400">
        £{product.price.toFixed(2)}
      </div>
      <Link href={`/product/${product.productId}`}>
        <Button className="w-3/4 mt-2">Buy Now</Button>
      </Link>
    </div>
  );
}
