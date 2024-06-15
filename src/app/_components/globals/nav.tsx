import Link from "next/link";
import Image from "next/image";
import { MobileNav } from "./mobile-nav";
import ShoppingBasket from "../partials/shopping-basket";
import { client } from "~/../sanity/lib/client";
import { groq } from "next-sanity";
import { getServerSession } from "next-auth";
import AccountMenu from "./account-menu";

export default async function Nav() {
  const session = await getServerSession();
  const user = session?.user;
  //get all shop sections
  const query = groq`
    *[_type == "shopSections"]{"title":title} | order(order)
  `;
  const sectionValues: { title: string }[] = await client.fetch(query);

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center sticky top-0 bg-white border-b">
      <div className="block lg:hidden">
        <MobileNav sections={sectionValues} />
      </div>
      <Link
        href="/"
        className="items-center gap-2 font-semibold hidden lg:flex"
        prefetch={false}
      >
        <Image
          src="/images/yarn.png"
          width={30}
          height={30}
          alt="Purrfect Toys Logo"
        />
        <span className="">Purrfect Toys</span>
      </Link>
      <nav className="ml-auto gap-4 sm:gap-6 hidden lg:flex">
        {sectionValues.map((section) => {
          return (
            <Link
              href={`/category/${encodeURIComponent(section.title)}`}
              className="text-sm font-medium hover:underline underline-offset-4"
              prefetch={false}
              key={section.title}
            >
              {section.title}
            </Link>
          );
        })}
      </nav>
      <div className="ml-auto lg:ml-0 flex flex-row">
      <div className="pl-4">
        {user ? (
          <AccountMenu image={user.image} email={user?.email ?? ''}/>
        ) : (
          <Link href="/auth/signin" className="ml-4 my-auto">
            Sign In
          </Link>
        )}
      </div>
      <Link href="/cart" className="ml-4">
        <ShoppingBasket />
      </Link>
      </div>
    </header>
  );
}
