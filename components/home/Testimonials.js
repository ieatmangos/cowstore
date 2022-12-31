import Link from "next/link";
import SplitImageCategoryPreview from "./SplitImageCategoryPreview";

import Image from "next/image";

export default function Testimonials({ reviews }) {
  return (
    <div className="relative overflow-hidden">
      {/* Decorative background image and gradient */}
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute inset-0 mx-auto overflow-hidden max-w-7xl xl:px-8">
          <Image
            fill
            sizes="(max-width: 1300px) 100vw,

90vw"
            src="/assets/steak/steak-grid-2.png"
            alt=""
            className="object-cover object-center w-full h-full"
          />
        </div>
        <div className="absolute inset-0 bg-white bg-opacity-75" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white" />
      </div>

      {/* Promo */}
      <section
        aria-labelledby="sale-heading"
        className="relative flex flex-col items-center px-4 pt-32 mx-auto text-center max-w-7xl sm:px-6 lg:px-8"
      >
        <div className="max-w-2xl mx-auto lg:max-w-none">
          <h2
            id="sale-heading"
            className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
          >
            Become Your Own Butcher Shop
          </h2>
          <p className="max-w-xl mx-auto mt-4 mb-12 text-xl text-gray-600">
            Check protein off your grocery list, steak is on the menu! Cow Store
            is about bridging a new supply chain, connecting VT farms to your
            door. Feast like a carnivore from Cows you can visit in the pastures
            they are raised!
          </p>
          <Link href="/shop">
            <div className="inline-block px-8 py-3 font-medium text-center text-teal-900 bg-teal-300 border border-transparent rounded-md hover:bg-teal-200">
              Shop favorites
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
            {reviews.map((testimonial) => (
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
                    {testimonial.comments}
                  </p>
                  <cite className="block mt-4 not-italic font-semibold text-gray-900">
                    {testimonial.name}
                  </cite>
                </div>
              </blockquote>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
