import Logo from "@components/ui/Logo";
import Link from "next/link";

export default function FourOhFour() {
  // 404
  return (
    <>
      {/*
          This example requires updating your template:
  
          ```
          <html class="h-full">
          <body class="h-full">
          ```
        */}
      <div className="flex flex-col min-h-full pt-16 pb-12 bg-white">
        <main className="flex flex-col justify-center flex-grow w-full px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex justify-center flex-shrink-0">
            <div className="inline-flex">
              <span className="sr-only">Cow Store</span>
              <Logo color="rose" className={`w-12 hidden lg:block`} />
            </div>
          </div>
          <div className="py-16">
            <div className="text-center">
              <p className="text-base font-semibold text-rose-400">404</p>
              <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Page not found.
              </h1>
              <p className="mt-2 text-base text-gray-500">
                Sorry, we couldn’t find the page you’re looking for.
              </p>
              <div className="mt-6">
                <Link href={`/`}>
                  <div className="text-base font-medium text-gray-600 hover:text-gray-500">
                    Go back home
                    <span aria-hidden="true"> &rarr;</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
