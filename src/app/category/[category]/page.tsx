import ProductWidget from "~/app/_components/partials/product-widget";
import Filter from "~/app/_components/partials/filter";
import NotFound from "~/app/_components/partials/not-found";
import { groq } from "next-sanity";
import { client } from "~/../sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";
const builder = imageUrlBuilder(client);

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { category: string };
  searchParams: { sort: string };
}) {
  const section = decodeURIComponent(params.category);
  const sort = searchParams.sort;
  //get products for category and sort by either "Highest Price" or "Lowest Price"
  const productQuery = groq`
    *[_type == "shopItems" && references(*[_type == "shopSections" && title == $section]._id)] | order(${sort == "Price Highest" ? "price desc" : sort == "Price Lowest" ? "price asc" : "_createdAt desc"}) {
      productId,
      name,
      price,
      image
    }
  `;
  const categoryProducts: {
    productId: string;
    name: string;
    image: {
      asset: {
        _ref: string;
        _type: string;
      };
    };
    price: number;
  }[] = await client.fetch(productQuery, {
    section: section,
  });
  

  //map products
  const productWidgets = categoryProducts.map((product) => {
    return (
      <ProductWidget
        title={product.name}
        image={builder.image(product.image).url()}
        price={product.price}
        productId={product.productId}
        key={product.productId}
      />
    );
  });
  return (
    <main className="px-4">
      <div className="flex flex-row justify-between px-8 md:px-16 my-8">
        <h2 className="text-3xl font-semibold">{section}</h2>
        <Filter
          query="sort"
          values={["Price Highest", "Price Lowest"]}
          default=""
        />
      </div>
      <div className="mx-auto grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {productWidgets}
      </div>
      {productWidgets.length === 0 && <NotFound message="No Products Found" margin={2}/>}
    </main>
  );
}
