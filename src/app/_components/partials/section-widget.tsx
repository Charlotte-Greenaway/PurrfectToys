import Image from "next/image";
import Link from "next/link";

export default async function SectionWidget(section: {
  title: string;
  image: string;
}) {
  return (
    <Link
      href={`/category/${encodeURIComponent(section.title)}`}
      className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-white p-4 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
      prefetch={false}
    >
      <Image
        src={section.image}
        width="500"
        height="700"
        alt="Cat Toys"
        className="overflow-hidden rounded-md object-cover aspect-square"
      />
      <div className="text-lg font-bold group-hover:underline">
        {section.title}
      </div>
    </Link>
  );
}
