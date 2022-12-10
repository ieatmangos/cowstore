import { useEffect, useState } from "react";

import Link from "next/link";
import formatMoney from "@lib/utils/formatMoney";
import SplitImageCategoryPreview from "./SplitImageCategoryPreview";
import Centered from "@components/ui/cta/CTACentered";
import ProjectMarquee from "@components/ui/marquee/ProjectMarquee";

const currencies = ["CAD", "USD", "AUD", "EUR", "GBP"];
const navigation = {
  categories: [
    {
      name: "Women",
      featured: [
        { name: "Sleep", href: "#" },
        { name: "Swimwear", href: "#" },
        { name: "Underwear", href: "#" },
      ],
      collection: [
        { name: "Everything", href: "#" },
        { name: "Core", href: "#" },
        { name: "New Arrivals", href: "#" },
        { name: "Sale", href: "#" },
      ],
      categories: [
        { name: "Basic Tees", href: "#" },
        { name: "Artwork Tees", href: "#" },
        { name: "Bottoms", href: "#" },
        { name: "Underwear", href: "#" },
        { name: "Accessories", href: "#" },
      ],
      brands: [
        { name: "Full Nelson", href: "#" },
        { name: "My Way", href: "#" },
        { name: "Re-Arranged", href: "#" },
        { name: "Counterfeit", href: "#" },
        { name: "Significant Other", href: "#" },
      ],
    },
    {
      name: "Men",
      featured: [
        { name: "Casual", href: "#" },
        { name: "Boxers", href: "#" },
        { name: "Outdoor", href: "#" },
      ],
      collection: [
        { name: "Everything", href: "#" },
        { name: "Core", href: "#" },
        { name: "New Arrivals", href: "#" },
        { name: "Sale", href: "#" },
      ],
      categories: [
        { name: "Artwork Tees", href: "#" },
        { name: "Pants", href: "#" },
        { name: "Accessories", href: "#" },
        { name: "Boxers", href: "#" },
        { name: "Basic Tees", href: "#" },
      ],
      brands: [
        { name: "Significant Other", href: "#" },
        { name: "My Way", href: "#" },
        { name: "Counterfeit", href: "#" },
        { name: "Re-Arranged", href: "#" },
        { name: "Full Nelson", href: "#" },
      ],
    },
  ],
  pages: [
    { name: "Company", href: "#" },
    { name: "Stores", href: "#" },
  ],
};
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
const trendingProducts = [
  {
    id: 1,
    name: "Machined Pen",
    color: "Black",
    price: "$35",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-02-product-01.jpg",
    imageAlt:
      "Black machined steel pen with hexagonal grip and small white logo at top.",
    availableColors: [
      { name: "Black", colorBg: "#111827" },
      { name: "Brass", colorBg: "#FDE68A" },
      { name: "Chrome", colorBg: "#E5E7EB" },
    ],
  },
  // More products...
];
const collections = [
  {
    name: "Desk and Office",
    description: "Work from home accessories",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg",
    imageAlt:
      "Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.",
    href: "#",
  },
  {
    name: "Self-Improvement",
    description: "Journals and note-taking",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg",
    imageAlt:
      "Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.",
    href: "#",
  },
  {
    name: "Travel",
    description: "Daily commute essentials",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg",
    imageAlt: "Collection of four insulated travel bottles on wooden shelf.",
    href: "#",
  },
];
const testimonials = [
  {
    id: 1,
    quote:
      "My order arrived super quickly. The product is even better than I hoped it would be. Very happy customer over here!",
    attribution: "Sarah Peters, New Orleans",
  },
  {
    id: 2,
    quote:
      "I had to return a purchase that didn’t fit. The whole process was so simple that I ended up ordering two new items!",
    attribution: "Kelly McPherson, Chicago",
  },
  {
    id: 3,
    quote:
      "Now that I’m on holiday for the summer, I’ll probably order a few more shirts. It’s just so convenient, and I know the quality will always be there.",
    attribution: "Chris Paul, Phoenix",
  },
];

export default function Homepage({ products, categories }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [variants, setVariants] = useState(null);

  // const getVariants = async () => {
  //   const a = await swell.get('/products:variants', {
  //     where: { active: true },
  //     limit: 25,
  //     page: 1,
  //   })
  //   return a
  // }
  // useEffect(() => {
  //   const _variants: any = getVariants()
  //   if (_variants) {
  //     setVariants(_variants)
  //   }
  // }, [])

  return (
    <div className="bg-white">
      <main>
        {/* Hero */}
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
                    Fill Your Freezer
                  </h1>
                  {/* <p className="mt-4 text-xl text-gray-500">
                    Vermont farmers supplying bulk orders of pasture raised beef
                    and lamb to homes in New Hampshire, Maine, Massachucessets,
                    and New York.
                  </p> */}
                  <p className="mt-4 text-xl text-gray-500">
                    Farmers marketplace connecting Vermont pastures and
                    neighbors homes. Free delivery in New York, New Hampshire,
                    Maine, Massachucessets, New Jersey.
                  </p>
                </div>
                <div>
                  <div className="mt-10">
                    {/* Decorative image grid */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
                    >
                      <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                        <div className="flex items-center space-x-6 lg:space-x-8">
                          <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                            <div className="h-64 overflow-hidden rounded-lg w-44 sm:opacity-0 lg:opacity-100">
                              <img
                                src="/assets/steak/1.jpg"
                                alt=""
                                className="object-cover object-center w-full h-full "
                              />
                            </div>
                            <div className="h-64 overflow-hidden rounded-lg w-44">
                              <img
                                src="/assets/steak/2.jpg"
                                alt=""
                                className="object-cover object-center w-full h-full"
                              />
                            </div>
                          </div>
                          <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                            <div className="h-64 overflow-hidden rounded-lg w-44 ">
                              <img
                                src="/assets/steak/1.jpg"
                                alt=""
                                className="object-cover object-center w-full h-full"
                              />
                            </div>
                            <div className="h-64 overflow-hidden delay-1000 rounded-lg w-44 ">
                              <img
                                src="/assets/steak/4.jpg"
                                alt=""
                                className="object-cover object-center w-full h-full"
                              />
                            </div>
                            <div className="h-64 overflow-hidden rounded-lg w-44 ">
                              <img
                                src="/assets/steak/5.jpg"
                                alt=""
                                className="object-cover object-center w-full h-full"
                              />
                            </div>
                          </div>
                          <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                            <div className="h-64 overflow-hidden rounded-lg w-44">
                              <img
                                src="/assets/steak/6.jpg"
                                alt=""
                                className="object-cover object-center w-full h-full"
                              />
                            </div>
                            <div className="h-64 overflow-hidden rounded-lg w-44">
                              <img
                                src="/assets/steak/8.jpg"
                                alt=""
                                className="object-cover object-center w-full h-full"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Link href="/shop">
                      <div className="inline-block px-8 py-3 font-medium text-center text-teal-900 bg-teal-300 border border-transparent rounded-md hover:bg-teal-200">
                        Shop
                      </div>
                    </Link>
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
                className="object-cover object-center w-full h-full"
              />
              <div className="flex flex-col items-center justify-center w-full h-full bg-rose-300/25 ">
                <Logo color={'rose'} />
              </div>
            </div> */}
          </div>
        </div>

        {/* <AllProductLabels /> */}

        {/* Trending products */}
        <section
          aria-labelledby="trending-heading"
          className="relative z-10 bg-gray-50"
        >
          <div className="py-16 sm:py-24 lg:mx-auto lg:py-32 ">
            <div className="flex items-center justify-between px-4 sm:px-6 lg:mx-auto lg:max-w-7xl lg:px-8">
              <h2
                id="trending-heading"
                className="text-2xl font-bold tracking-tight text-gray-900"
              >
                Trending products
              </h2>
              <Link href={`store`}>
                <div className="hidden text-sm font-semibold text-gray-700 hover:text-gray-900 sm:block">
                  See everything
                  <span aria-hidden="true"> &rarr;</span>
                </div>
              </Link>
            </div>

            <div className="relative mt-8">
              <ProjectMarquee products={products} />
            </div>

            <div className="px-4 mt-12 sm:hidden">
              <a
                href="#"
                className="text-sm font-semibold text-teal-600 hover:text-teal-500"
              >
                See everything
                <span aria-hidden="true"> &rarr;</span>
              </a>
            </div>
          </div>
        </section>

        {/* Collections */}
        {/* <section aria-labelledby="collections-heading" className="bg-white">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="max-w-2xl py-16 mx-auto sm:py-24 lg:max-w-none lg:py-32">
              <h2
                id="collections-heading"
                className="text-2xl font-bold text-gray-900"
              >
                Farms
              </h2>

              <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
                {products &&
                  products.brands &&
                  products.brands.slice(0, 4).map((collection: any) => (
                    <div key={collection.name} className="relative group">
                      <div className="relative w-full overflow-hidden bg-white rounded-lg h-80 group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                        <img
                          src={collection.imageSrc}
                          alt={collection.imageAlt}
                          className="object-cover object-center w-full h-full"
                        />
                      </div>
                      <h3 className="mt-6 text-sm text-gray-500">
                        <a href={collection.href}>
                          <span className="absolute inset-0" />
                          {collection.name}
                        </a>
                      </h3>
                      <p className="text-base font-semibold text-gray-900">
                        {collection.description}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </section> */}

        {/* Sale and testimonials */}
        <div className="relative overflow-hidden">
          {/* Decorative background image and gradient */}
          <div aria-hidden="true" className="absolute inset-0">
            <div className="absolute inset-0 mx-auto overflow-hidden max-w-7xl xl:px-8">
              <img
                src="/assets/steak/steak-grid-2.png"
                alt=""
                className="object-cover object-center w-full h-full"
              />
            </div>
            <div className="absolute inset-0 bg-white bg-opacity-75" />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white" />
          </div>

          {/* Sale */}
          <section
            aria-labelledby="sale-heading"
            className="relative flex flex-col items-center px-4 pt-32 mx-auto text-center max-w-7xl sm:px-6 lg:px-8"
          >
            <div className="max-w-2xl mx-auto lg:max-w-none">
              <h2
                id="sale-heading"
                className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
              >
                A Butcher Shop in the Garage
              </h2>
              <p className="max-w-xl mx-auto mt-4 mb-12 text-xl text-gray-600">
                Enjoy convenience, quality, and freshness with our carefully
                sourced meat, butchered to order. Feast like a carnivore!
              </p>
              <Link href="/shop">
                <div className="inline-block px-8 py-3 font-medium text-center border border-transparent rounded-md text-rose-900 bg-rose-300 hover:bg-rose-200">
                  Explore Options
                </div>
              </Link>
            </div>
          </section>

          {/* Testimonials */}
          <section
            aria-labelledby="testimonial-heading"
            className="relative px-4 py-24 mx-auto max-w-7xl sm:px-6 lg:py-32 lg:px-8"
          >
            <div className="max-w-2xl mx-auto lg:max-w-none">
              <h2
                id="testimonial-heading"
                className="text-2xl font-bold tracking-tight text-gray-900"
              >
                What are people saying?
              </h2>

              <div className="mt-16 space-y-16 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:space-y-0">
                {testimonials.map((testimonial) => (
                  <blockquote key={testimonial.id} className="sm:flex lg:block">
                    <svg
                      width={24}
                      height={18}
                      viewBox="0 0 24 18"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      className="flex-shrink-0 text-gray-300"
                    >
                      <path
                        d="M0 18h8.7v-5.555c-.024-3.906 1.113-6.841 2.892-9.68L6.452 0C3.188 2.644-.026 7.86 0 12.469V18zm12.408 0h8.7v-5.555C21.083 8.539 22.22 5.604 24 2.765L18.859 0c-3.263 2.644-6.476 7.86-6.451 12.469V18z"
                        fill="currentColor"
                      />
                    </svg>
                    <div className="mt-8 sm:mt-0 sm:ml-6 lg:mt-10 lg:ml-0">
                      <p className="text-lg text-gray-600">
                        {testimonial.quote}
                      </p>
                      <cite className="block mt-4 not-italic font-semibold text-gray-900">
                        {testimonial.attribution}
                      </cite>
                    </div>
                  </blockquote>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* <section aria-labelledby="sale-heading">
        <div className="pt-32 overflow-hidden sm:pt-14">
          <div className="bg-amber-200">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="relative pt-48 pb-16 sm:pb-24">
                <div>
                  <h2
                    id="sale-heading"
                    className="text-4xl font-bold tracking-tight text-amber-900 md:text-5xl"
                  >
                    Our Animals
                    <br />
                    Are Loved
                  </h2>
                  <div className="mt-6 text-base">
                    <a
                      href="#"
                      className="px-6 py-3 font-semibold rounded-full text-amber-900 bg-amber-300"
                    >
                      Learn about our farms
                      <span aria-hidden="true"> &rarr;</span>
                    </a>
                  </div>
                </div>

                <div className="absolute transform -translate-x-1/2 -top-32 left-1/2 sm:top-6 sm:translate-x-0">
                  <div className="flex ml-24 space-x-6 min-w-max sm:ml-3 lg:space-x-8">
                    <div className="flex space-x-6 sm:flex-col sm:space-x-0 sm:space-y-6 lg:space-y-8">
                      <div className="flex-shrink-0">
                        <img
                          className="object-cover w-64 h-64 rounded-lg md:h-72 md:w-72"
                          src="/assets/steak/15.jpg"
                          alt=""
                        />
                      </div>

                      <div className="flex-shrink-0 mt-6 sm:mt-0">
                        <img
                          className="object-cover w-64 h-64 rounded-lg md:h-72 md:w-72"
                          src="/assets/steak/15.jpg"
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="flex space-x-6 sm:-mt-20 sm:flex-col sm:space-x-0 sm:space-y-6 lg:space-y-8">
                      <div className="flex-shrink-0">
                        <img
                          className="object-cover w-64 h-64 rounded-lg md:h-72 md:w-72"
                          src="/assets/steak/15.jpg"
                          alt=""
                        />
                      </div>

                      <div className="flex-shrink-0 mt-6 sm:mt-0">
                        <img
                          className="object-cover w-64 h-64 rounded-lg md:h-72 md:w-72"
                          src="/assets/steak/15.jpg"
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="flex space-x-6 sm:flex-col sm:space-x-0 sm:space-y-6 lg:space-y-8">
                      <div className="flex-shrink-0">
                        <img
                          className="object-cover w-64 h-64 rounded-lg md:h-72 md:w-72"
                          src="/assets/steak/15.jpg"
                          alt=""
                        />
                      </div>

                      <div className="flex-shrink-0 mt-6 sm:mt-0">
                        <img
                          className="object-cover w-64 h-64 rounded-lg md:h-72 md:w-72"
                          src="/assets/steak/15.jpg"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      <div className={`h-screen`}>
        <SplitImageCategoryPreview categories={categories} />
      </div>
    </div>
  );
}
