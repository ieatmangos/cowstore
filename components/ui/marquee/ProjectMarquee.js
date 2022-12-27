import StarRating from "@components/review/StarRating";
import { formatMoney } from "@lib/utils";
import Image from "next/image";
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
      <ul role="list" className="flex mx-4 space-x-8 ">
        {products &&
          products
            .slice(0, 6)
            .map((product) => (
              <MarqueeProductCard key={product.id} product={product} />
            ))}
      </ul>
    </div>
  );
};

const MarqueeProductCard = ({ product }) => {
  return (
    <li className="flex-col w-64 overflow-hidden text-center rounded-md ">
      <Link href={`/collections/products/${product.slug}`}>
        <div className="relative w-64 h-64 overflow-hidden rounded-md group">
          <div className="w-full overflow-hidden transition-all duration-500 scale-125 bg-gray-200 pointer-events-none aspect-w-1 group-hover:-translate-y-24 group-hover:scale-100 aspect-h-1">
            <Image
              layout="fill"
              src={product.images[0].file.url}
              alt={product.name}
              className="object-cover object-center w-full h-full "
            />
          </div>
          <div className="absolute inset-0 w-full overflow-hidden transition-transform duration-700 scale-125 translate-y-[280px] bg-gray-200 pointer-events-none group-hover:translate-y-0 group-hover:scale-100 aspect-w-1 aspect-h-1">
            <Image
              layout="fill"
              src={product.images[1].file.url}
              alt={product.name}
              className="object-cover object-center w-full h-full "
            />
          </div>
          {/* <div className="w-full overflow-hidden transition-transform duration-500 bg-gray-200 group-hover:-translate-x-96 aspect-w-1 aspect-h-1">
            <Image
              layout="fill"
              src={
                product.images[3]
                  ? product.images[3].file.url
                  : product.images[0].file.url
              }
              alt={product.name}
              className="object-cover object-center w-full h-full "
            />
          </div> */}
        </div>
      </Link>
      <div className="relative flex flex-col mt-4 ">
        <h3 className="mt-1 font-semibold text-gray-900 truncate">
          {/* <span className="absolute inset-0" /> */}
          {product.name}
        </h3>
        <div className={` flex flex-col mt-2 justify-between items-center`}>
          <div className={` flex items-center`}>
            <StarRating
              size={"w-5"}
              value={
                product.reviews?.results.reduce((a, c) => a + c.rating, 0) || 0
              }
              onChange={() => {}}
            />
            <div className="ml-2 text-sm text-gray-700 ">
              ( {product.reviews?.count || 0} )
            </div>
          </div>
          <p className="relative flex flex-col items-center justify-center mt-2 text-gray-900">
            {product.sale && (
              <span
                className={`whitespace-nowrap line-through absolute left-14  text-xs text-rose-400`}
              >
                / {formatMoney(product.price)}
              </span>
            )}
            {formatMoney(product.sale ? product.sale_price : product.price)}
          </p>
        </div>
      </div>
    </li>
  );
};
