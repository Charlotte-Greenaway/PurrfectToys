import Image from "next/image";
import SectionWidget from "../_components/partials/section-widget";
import FeaturedProducts from "../_components/partials/featured-products";
import { client } from "~/../sanity/lib/client";
import { groq } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
const builder = imageUrlBuilder(client);

export default async function Component() {
  const sectionQuery = groq`
    *[_type == "shopSections"]{"title":title} | order(order)
  `;
  const sectionValues: { title: string; image?: string }[] =
    await client.fetch(sectionQuery);
  //get images from products for each section - random image
  const sections = await Promise.all(
    sectionValues.map(async (section) => {
      const productQuery = groq`
      *[_type == "shopItems" && references(*[_type == "shopSections" && title == $title]._id)]{"image":image} | order(_createdAt desc) [0..0]
    `;
      const productImages = await client.fetch(productQuery, {
        title: section.title,
      });
      if (productImages.length==0||!productImages) return null;
      const image = builder.image(productImages[0].image).url();
      return { ...section, image: image };
    })
  );
  const sectionWidgets = sections.map((section) => {
    if (!section) return null;
    return (
      <SectionWidget
        key={section.title}
        title={section.title}
        image={section.image}
      />
    );
  });

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <section className="w-full pt-12 md:pt-24 lg:pt-32 border-y">
          <div className="px-4 md:px-6 space-y-10 xl:space-y-16">
            <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
              <div>
                <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                  Unleash Your Cat&apos;s Playful Side with Purrfect Toys
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Discover a world of fun and engaging cat toys that will keep
                  your feline friend entertained for hours.
                </p>
              </div>
              <Image
                src="/images/purrfecttoys.png"
                width="400"
                height="400"
                alt="Purrfect Toys logo"
                className="mx-auto aspect-[4/3] overflow-hidden rounded-xl object-cover"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container space-y-12 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Explore Our Products
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Find the perfect toys for your feline friend in our wide
                  selection of categories.
                </p>
              </div>
            </div>
            <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              {sectionWidgets}
            </div>
          </div>
        </section>
        <FeaturedProducts />
      </main>
    </div>
  );
}
