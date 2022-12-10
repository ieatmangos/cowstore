import StarRating from "@components/review/StarRating";
import { formatMoney } from "@lib/utils";
import Link from "next/link";
import React from "react";

export default function ProjectMarquee({ products }) {
  return (
    <>
      <article class="relative overflow-hidden">
        <div class="flex whitespace-no-wrap overflow-x-scroll motion-safe:overflow-x-hidden">
          <MarqueeLine products={products} className={`marquee`} />
          <MarqueeLine products={products} className={`marquee2 `} />
        </div>
      </article>
    </>
  );
}

const MarqueeLine = ({ products, className }) => {
  return (
    <div className={` ${className}`}>
      <ul
        role="list"
        className="flex mx-4 space-x-8 lg:grid lg:grid-cols-4 lg:gap-x-8 lg:space-x-0"
      >
        {products &&
          products.slice(0, 6).map((product) => (
            <li
              key={product.id}
              className="flex-col w-64 text-center lg:w-auto"
            >
              <Link href={`product/${product.slug}`}>
                <div className="relative group">
                  <div className="w-full overflow-hidden bg-gray-200 rounded-md aspect-w-1 aspect-h-1">
                    <img
                      src={product.images[0].file.url}
                      alt={product.name}
                      className="object-cover object-center w-full h-full group-hover:opacity-75"
                    />
                  </div>
                </div>
              </Link>
              <div className="relative flex flex-col mt-4 ">
                <h3 className="mt-1 font-semibold text-gray-900 truncate">
                  {/* <span className="absolute inset-0" /> */}
                  {product.name}
                </h3>
                <div className={` flex mt-2 justify-center items-center`}>
                  <StarRating
                    value={
                      product.reviews?.results.reduce(
                        (a, c) => a + c.rating,
                        0
                      ) || 0
                    }
                    onChange={() => {}}
                  />
                  <div className="ml-2 text-sm text-gray-700 ">
                    {product.reviews?.count || 0}
                  </div>
                </div>
                <p className="mt-2 text-gray-900">
                  {formatMoney(product.price)}
                </p>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};
