import { useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import cn from "@utils/cn";
import ProductCuts from "./ProductCuts";
import ProductReviews from "./ProductReviews";
import ProductImagesGrid from "./ProductImagesGrid";
import StarRating from "@components/review/StarRating";
import useCart from "@lib/swell/cart/useCart";
import { formatMoney, makeSlug } from "@lib/utils";
import Breadcrumbs from "@components/ui/breadcrumbs";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import PurchaseOptions from "./PurchaseOptions";
import { primalCuts } from "@lib/static/primalCuts";
import Image from "next/image";
import Link from "next/link";
const reviews = { href: "#", average: 4, totalCount: 117 };

export default function ProductPage({ product }) {
  const [selectedColor, setSelectedColor] = useState();
  const [subscriptionPlan, setSubscriptionPlan] = useState();
  const averageReview = Math.ceil(
    product.reviews?.results.reduce((a, c) => a + c.rating, 0) /
      product.reviews?.results.length
  );

  const { add, cart } = useCart();
  const handleSubmit = (e) => {
    e.preventDefault();
    add({ id: product.id });
  };

  const inStockOptions = product?.variants?.results.reduce((acc, variant) => {
    variant.option_value_ids.forEach((id) => {
      acc[id] = variant.stock_level;
    });
    return acc;
  }, {});

  const primalCut = product.primal_cuts;

  return (
    <div className="bg-white">
      <div className="">
        <Breadcrumbs />

        {/* Image gallery */}
        <ProductImagesGrid product={product} />

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {product.name}
            </h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p
              aria-label="Price"
              className="z-10 flex items-center text-3xl tracking-tight text-gray-900 "
            >
              {formatMoney(product.sale ? product.sale_price : product.price)}
              {product.sale && (
                <span className={`ml-2 line-through text-sm text-rose-400`}>
                  {formatMoney(product.price)}
                </span>
              )}
            </p>

            {/* Reviews */}
            <div className="mt-6 ">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <StarRating size="w-6" value={averageReview} />
                <p className="sr-only">{averageReview} out of 5 stars</p>
                <a
                  href={reviews.href}
                  className="ml-3 text-sm font-medium text-gray-600 hover:text-teal-500"
                >
                  {product.reviews.results.length || 0} review
                  {product.reviews.results.length > 1 ? "s" : ""}
                </a>
              </div>
            </div>

            <div className="h-full mt-10">
              {/* Colors */}
              {/* <div>
                <h3 className="text-sm font-medium text-gray-900">Color</h3>

                <RadioGroup
                  value={selectedColor}
                  onChange={setSelectedColor}
                  className="mt-4"
                >
                  <RadioGroup.Label className="sr-only">
                    {" "}
                    Choose a color{" "}
                  </RadioGroup.Label>
                  <div className="flex items-center space-x-3">
                    {subscription.plans.map((color) => (
                      <RadioGroup.Option
                        key={color.name}
                        value={color}
                        className={({ active, checked }) =>
                          cn(
                            color.selectedClass,
                            active && checked ? "ring ring-offset-1" : "",
                            !active && checked ? "ring-2" : "",
                            "-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none"
                          )
                        }
                      >
                        <RadioGroup.Label as="span" className="sr-only">
                          {" "}
                          {color.name}{" "}
                        </RadioGroup.Label>
                        <span
                          aria-hidden="true"
                          className={cn(
                            color.class,
                            "h-8 w-8 border border-black border-opacity-10 rounded-full"
                          )}
                        />
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div> */}

              {/* Sizes */}

              {/* purchaseOptions */}
              <PurchaseOptions
                inStockOptions={inStockOptions}
                product={product}
              />
            </div>
            {/* <button
              type="submit"
              onClick={handleSubmit}
              className="flex items-center justify-center w-full px-8 py-3 mt-10 text-base font-medium text-teal-900 bg-teal-300 border border-transparent rounded-md lg:sticky lg:top-12 hover:bg-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:ring-offset-2"
            >
              Add to cart
            </button> */}
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{product.description}</p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

              <div className="mt-4">
                <ul role="list" className="pl-4 space-y-2 text-sm list-disc">
                  {product.highlights?.map((highlight) => (
                    <li key={highlight} className="text-gray-400">
                      <span className="text-gray-600">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Details</h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">{product.details}</p>
                {product.common_names && (
                  <div className="flex flex-wrap space-x-2 text-sm">
                    Common names:
                    {product.common_names.map((name, nameIdx) => (
                      <p
                        key={nameIdx + name}
                        className="ml-2 text-sm text-gray-600"
                      >
                        {name}
                        {nameIdx < product.common_names.length - 1 ? "," : ""}
                      </p>
                    ))}
                  </div>
                )}
                {product.cooking_methods && (
                  <div className="text-sm">
                    Cooking methods:
                    <div
                      className={`mt-2 grid-cols-4 sm:grid-cols-9 lg:grid-cols-9 xl:grid-cols-12 grid `}
                    >
                      {product.cooking_methods.map((name, nameIdx) => (
                        <Link
                          key={nameIdx + name}
                          href={`/blog/${makeSlug(name)}`}
                          // Add redirect so you can come back here after reading the blog
                        >
                          <>
                            <div className="relative flex flex-col justify-center text-sm text-center text-gray-600">
                              <div
                                className={`mx-auto relative p-2 mb-1 rounded-full bg-rose-100`}
                              >
                                <Image
                                  width={32}
                                  height={32}
                                  src={`/assets/icons/mono/${makeSlug(
                                    name
                                  )}.svg`}
                                />
                              </div>
                              <div className={` whitespace-nowrap z-10   `}>
                                {" "}
                                {name}
                              </div>
                              {/* {nameIdx < product.cooking_methods.length - 1
                          ? ","
                        : ""} */}
                            </div>
                          </>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-10">
              <ProductCuts product={product} />
            </div>
          </div>
          <div className="relative col-span-full ">
            <ProductReviews id={product.id} reviews={product.reviews.results} />
          </div>
        </div>
      </div>
    </div>
  );
}

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    theme: {
      extend: {
        gridTemplateRows: {
          '[auto,auto,1fr]': 'auto auto 1fr',
        },
      },
    },
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
