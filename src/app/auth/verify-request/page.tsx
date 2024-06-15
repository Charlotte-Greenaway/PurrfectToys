import Image from "next/image"
export default function Component() {
  return (
    <div className="flex items-center justify-center h-[80dvh]">
      <div className="max-w-md w-full px-6 py-12 space-y-4 bg-white rounded-lg shadow-lg dark:bg-gray-950">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Check your email</h1>
          <p className="text-gray-500 dark:text-gray-400">A sign-in link has been sent to your email address.</p>
        </div>
        <div className="flex justify-center">
        <Image
            src="/images/purrfecttoys.png"
            alt="Cat Icon"
            width={200}
            height={200}
            className="mx-auto"
          />
        </div>
      </div>
    </div>
  )
}
  