import NotFound from "~/app/_components/partials/not-found";
import Image from "next/image";
import ShoppingBasketButton from "~/app/_components/partials/add-to-basket";
import FeaturedProducts from "~/app/_components/partials/featured-products";
import { groq } from "next-sanity";
import { client } from "~/../sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";
import Link from "next/link";
const builder = imageUrlBuilder(client);

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const productId = decodeURIComponent(params.id);
  const productQuery = groq`
    *[_type == "shopItems" && productId == $productId][0]{
      name,
      price,
      image,
      description,
      "sections": sections[]->title, 
      productId,
      stock
    }
  `;
  const productRaw: {
    name: string;
    price: number;
    image: {
      asset: {
        _ref: string;
        _type: string;
      };
    };
    description: string;
    sections: string[];
    productId: string;
    stock: string;
  } = await client.fetch(productQuery, {
    productId: productId,
  });
  if (!productRaw) return <NotFound message="Product Not Found" margin={6} />;
  const product = {
    name: productRaw.name,
    price: productRaw.price,
    image: builder.image(productRaw.image).url(),
    description: productRaw.description,
    sections: productRaw.sections,
    productId: productRaw.productId,
    stock: Number(productRaw.stock),
  };
  return (
    <main>
      <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
        <div className="grid gap-4 md:gap-10 items-start order-2 md:order-1 my-auto">
          <div className="hidden md:flex items-start">
            <div className="grid gap-4">
              <h1 className="font-bold text-3xl">{product.name}</h1>
              <div className="flex items-center gap-2">
                {product.sections.map((section) => {
                  return (
                    <Link
                      href={`/category/${encodeURIComponent(section)}`}
                      key={section}
                    >
                      <span className=" hover:underline bg-primary/10 text-primary px-2 py-1 rounded-md text-sm font-medium">
                        {section}
                      </span>
                    </Link>
                  );
                })}
              </div>
              <div>
                <p>{product.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500">Stock: {product.stock}</span>
              </div>
            </div>
            <div className="text-4xl font-bold ml-auto">£{product.price.toFixed(2)}</div>
          </div>
          <div className="grid gap-4 md:gap-10">
            <ShoppingBasketButton {...product} />
          </div>
        </div>
        <div className="grid gap-3 items-start order-1">
          <div className="flex md:hidden items-start">
            <div className="grid gap-4">
              <h1 className="font-bold text-2xl sm:text-3xl">{product.name}</h1>
              <div className="flex items-center gap-2">
                {product.sections.map((section) => {
                  return (
                    <span
                      key={section}
                      className="bg-primary/10 text-primary px-2 py-1 rounded-md text-sm font-medium"
                    >
                      {section}
                    </span>
                  );
                })}
              </div>
              <div>
                <p>{product.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500">Stock: {product.stock}</span>
              </div>
            </div>
            <div className="text-4xl font-bold ml-auto">£{product.price}</div>
          </div>
          <div className="grid gap-4">
            <Image
              priority={true}
              src={product.image}
              width={600}
              height={600}
              alt="Product Image"
              className="aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
            />
          </div>
        </div>
      </div>
      <FeaturedProducts />
    </main>
  );
}
