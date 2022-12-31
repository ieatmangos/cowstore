import Image from "next/image";
import { ShopButtonCow } from "@components/ui/cow";

const offers = [
  {
    name: "Taste the difference",
    description: "Better flavor and quality",
    href: "#",
  },
  {
    name: "Buy in bulk",
    description: "Stock up on your favorite cuts",
    href: "#",
  },
  {
    name: "Free Delivery",
    description: "In the Northeast",
    href: "#",
  },
];

export default function Hero() {
  return (
    <div className="flex flex-col border-b border-gray-200 lg:border-0">
      <div
        aria-label="Offers"
        className="relative z-10 order-last lg:order-first"
      >
        <div className="mx-auto lg:px-8">
          <ul
            role="list"
            className="grid grid-cols-1 border-gray-200 divide-y divide-gray-200 border-y lg:grid-cols-3 lg:divide-y-0 lg:divide-x"
          >
            {offers.map((offer) => (
              <li
                key={offer.name}
                className="flex flex-col bg-white lg:bg-white/75 lg:backdrop-blur"
              >
                <div className="relative flex flex-col justify-center flex-1 px-4 py-6 text-center focus:z-10">
                  <p className="text-sm text-gray-500">{offer.name}</p>
                  <p className="font-semibold text-gray-900">
                    {offer.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative overflow-hidden ">
        {/* <div
            aria-hidden="true"
            className="absolute hidden w-1/2 h-full bg-gray-50 lg:block"
          /> */}

        <div className="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
          <div className="relative px-4 mx-auto max-w-7xl sm:static sm:px-6 lg:px-8">
            <div className="sm:max-w-lg">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 font sm:text-6xl">
                Your Freezer
              </h1>
              {/* <p className="mt-4 text-xl text-gray-500">
                  Vermont farmers supplying bulk orders of pasture raised beef
                  and lamb to homes in New Hampshire, Maine, Massachucessets,
                  and New York.
                </p> */}
              <p className="mt-4 text-xl text-gray-500">
                Farmers marketplace connecting Vermont pastures and neighbors
                homes. Free delivery in New York, New Hampshire, Maine,
                Massachucessets, New Jersey.
              </p>
            </div>
            <div>
              <div className="mt-24">
                {/* Decorative image grid */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
                >
                  <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                    <div className="flex items-center space-x-6 lg:space-x-8">
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="relative h-64 overflow-hidden rounded-lg w-44 sm:opacity-0 lg:opacity-100 bg-teal-300/25">
                          <Image
                            sizes="25vw"
                            fill // width={176}
                            // height={256}
                            alt="Cow Store Steak"
                            priority={true}
                            src="/assets/steak/4.jpg"
                            className="object-cover object-center w-full h-full"
                          />
                        </div>
                        <div className="relative h-64 overflow-hidden rounded-lg w-44 bg-teal-300/40">
                          <Image
                            // placeholder="blur"
                            // blurDataURL={rgbDataURL(153, 246, 228)}
                            // width={264}
                            // height={256}

                            sizes="25vw"
                            fill // width={176}
                            // height={256}
                            alt="Cow Store Steak"
                            src="/assets/steak/2.jpg"
                            className="object-cover object-center w-full h-full"
                          />
                        </div>
                      </div>
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="relative h-64 overflow-hidden rounded-lg w-44 realtive bg-teal-300/30">
                          <Image
                            // placeholder="blur"
                            // blurDataURL={rgbDataURL(153, 246, 228)}

                            // width={264}
                            // height={256}

                            sizes="25vw"
                            fill // width={176}
                            // height={256}
                            priority={true}
                            as="image"
                            alt="Cow Store Steak"
                            src="/assets/steak/3.jpg"
                            className="object-cover object-center w-full h-full"
                          />
                        </div>

                        <div className="relative h-64 overflow-hidden rounded-lg w-44 bg-teal-300/40">
                          <Image
                            // placeholder="blur"
                            // blurDataURL={rgbDataURL(153, 246, 228)}
                            // width={264}
                            // height={256}

                            sizes="25vw"
                            fill // width={176}
                            // height={256}
                            alt="Cow Store Steak"
                            src="/assets/steak/4.jpg"
                            className="object-cover object-center w-full h-full"
                          />
                        </div>
                        <div className="relative h-64 overflow-hidden rounded-lg w-44 bg-teal-300/25">
                          <Image
                            // placeholder="blur"
                            // blurDataURL={rgbDataURL(153, 246, 228)}
                            // width={264}
                            // height={256}

                            sizes="25vw"
                            fill // width={176}
                            // height={256}
                            alt="Cow Store Steak"
                            src="/assets/steak/5.jpg"
                            className="object-cover object-center w-full h-full"
                          />
                        </div>
                      </div>
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="relative h-64 overflow-hidden rounded-lg w-44 bg-teal-300/50">
                          <Image
                            // placeholder="blur"
                            // blurDataURL={rgbDataURL(153, 246, 228)}
                            // width={256}

                            sizes="25vw"
                            fill // width={176}
                            // height={256}
                            alt="Cow Store Steak"
                            // height={256}
                            src="/assets/steak/6.jpg"
                            className="object-cover object-center w-full h-full"
                          />
                        </div>
                        <div className="relative h-64 overflow-hidden rounded-lg w-44 bg-teal-300/10">
                          <Image
                            // placeholder="blur"
                            // blurDataURL={rgbDataURL(153, 246, 228)}
                            // width={264}
                            // height={256}

                            sizes="25vw"
                            fill // width={176}
                            // height={256}
                            alt="Cow Store Steak"
                            src="/assets/steak/12.jpg"
                            className="object-cover object-center w-full h-full"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <ShopButtonCow />
              </div>
            </div>
          </div>
        </div>
        {/* <div className="relative bg-gray-100 lg:bg-transparent">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:grid lg:grid-cols-2 lg:px-8">
              <div className="max-w-2xl py-24 mx-auto lg:max-w-none lg:py-64">
                <div className="lg:pr-16">
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl xl:text-6xl">
                    Feed your family
                  </h1>
                  <p className="mt-4 text-xl text-gray-600">
                    Build a protein tresure chest ready for dinner. Our cows
                    are born and raised in Vermont pastures by expert farmers.
                  </p>
                  <div className="mt-6">
                    <a
                      href="#"
                      className="inline-block px-8 py-3 font-medium text-teal-900 bg-teal-200 border border-transparent rounded-md hover:bg-teal-300"
                    >
                      Enter Store
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        {/* <div className="w-full h-48 sm:h-64 lg:absolute lg:top-0 lg:right-0 lg:h-full lg:w-1/2">
            <img
              src="/assets/homepage-hero.jpeg"
              alt=""
              className="object-cover object-center "
            />
            <div className="flex flex-col items-center justify-center w-full h-full bg-rose-300/25 ">
              <Logo color={'rose'} />
            </div>
          </div> */}
      </div>
    </div>
  );
}
