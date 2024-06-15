import { Button } from "~/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "~/components/ui/sheet";
import Link from "next/link";
import Image from "next/image";

export function MobileNav(props: { sections: { title: string }[] }) {
  const sectionValues = props.sections;
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Menu</Button>
      </SheetTrigger>
      <SheetContent>
        {sectionValues.map((section) => {
          return (
            <Link
              href={`/category/${encodeURIComponent(section.title)}`}
              className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-white p-4 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
              prefetch={false}
              key={section.title}
            >
              <div className="text-base font-bold group-hover:underline">
                {section.title}
              </div>
            </Link>
          );
        })}
        <SheetFooter>
          <Link href="/" className="w-full">
            <Image
              src="/images/purrfecttoys.png"
              width="400"
              height="400"
              alt="Purrfect Toys logo"
              className="aspect-[4/3] overflow-hidden rounded-xl w-3/4"
            />
          </Link>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
