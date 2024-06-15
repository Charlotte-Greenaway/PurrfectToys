import ProductWidget from "./product-widget";
import { groq } from "next-sanity";
import { client } from "~/../sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";
const builder = imageUrlBuilder(client);

export default async function FeaturedProducts() {
  //get top 8 products for featured products
  const productQuery = groq`
    *[_type == "shopItems"]{"name":name, "image":image, "productId":productId, "price":price} | order(_createdAt desc) [0..8]
  `;
  const products = await client.fetch(productQuery);
  const featuredProducts: {
    productId: string;
    title: string;
    image: string;
    price: number;
  }[] = products.map(
    (product: {
      productId: string;
      name: string;
      image: {
        asset: {
          _ref: string;
          _type: string;
        };
      };
      price: number;
    }) => {
      const image = builder.image(product.image).url();
      return {
        productId: product.productId,
        title: product.name,
        image: image,
        price: product.price,
      };
    }
  );

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
      <div className="container space-y-12 ">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Featured Products
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Check out our top-selling and most popular cat toys.
            </p>
          </div>
        </div>
        <div className="mx-auto grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductWidget {...product} key={product.productId} />
          ))}
        </div>
      </div>
    </section>
  );
}
