"use client";
import { signIn } from "next-auth/react";
import { PawPrintIcon, CatIcon, MailOpenIcon } from "lucide-react";
import Image from "next/image";
import { useToast } from "~/components/ui/use-toast";

export default function SignIn() {
  const {toast} = useToast();
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md space-y-8">
        <div>
          <Image
            src="/images/purrfecttoys.png"
            alt="Cat Icon"
            width={200}
            height={200}
            className="mx-auto"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Welcome to Purrfect Toys!
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in/sign up to start shopping for your furry friends.
          </p>
        </div>
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            const email = e.currentTarget.email.value;
            if(!email) return;
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            if(!emailRegex.test(email)){
              toast({
                title: "Invalid Email",
                description: "Please enter a valid email address.",
                variant:"destructive"
              });
              return;
            };
            signIn("email", { email });
          }}
        >
          <div>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MailOpenIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block text-[#F1279A] w-full rounded-md border-gray-300 pl-10 pr-12 py-3 focus:border-[#F1279A] focus:ring-[#F1279A] sm:text-sm"
                placeholder="Your email address"
              />
              <div className="absolute inset-y-0 right-0 flex items-center">
                <CatIcon className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-[#F1279A] py-2 px-4 text-sm font-medium text-white hover:bg-[#e744a1] focus:outline-none focus:ring-2 focus:ring-[#F1279A] focus:ring-offset-2"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <PawPrintIcon className="h-5 w-5 text-[#F1279A] group-hover:text-[#F1279A]" />
              </span>
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
