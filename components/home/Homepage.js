import Link from "next/link";
import SplitImageCategoryPreview from "./SplitImageCategoryPreview";
import ProjectMarquee from "@components/ui/marquee/ProjectMarquee";
import Image from "next/image";
import { Feature1 } from "@components/features";
import Cow, { ShopButtonCow } from "@components/ui/cow";
import CollectionsPage from "@components/search/CollectionsPage";
import Hero from "./Hero";
import Testimonials from "./Testimonials";

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

export default function Homepage({ products, categories, reviews }) {
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
        <Hero />

        {/* Trending products marquee */}
        <section
          aria-labelledby="trending-heading"
          className="relative z-10 bg-gradient-to-b from-gray-50 to-white"
        >
          <div className="py-16 sm:py-24 lg:mx-auto lg:py-32 ">
            <div className="flex items-center justify-between px-4 sm:px-6 lg:mx-auto lg:max-w-7xl lg:px-8">
              <h2
                id="trending-heading"
                className="text-2xl font-bold tracking-tight text-gray-900"
              >
                Trending products
              </h2>
              <Link href={`/collections/products`}>
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
        <Testimonials reviews={reviews} />

        {/* Collections */}
        <section aria-label="Collections" className="bg-gray-100">
          <CollectionsPage useH3 categories={categories} />
        </section>

        {/* Promo */}
        {/* <section aria-label="sale-heading" className="">
          <Feature1 />
        </section> */}
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
      {/* <div className={`h-screen`}>
        <SplitImageCategoryPreview categories={categories} />
      </div> */}
    </div>
  );
}
