import Logo from "@components/ui/Logo";
import { PlusIcon } from "@heroicons/react/20/solid";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import useCart from "@lib/swell/cart/useCart";
import useTrendingProducts from "@lib/swell/products/getTrendingProducts";
import { formatMoney } from "@lib/utils";
import Link from "next/link";

export default function EmptyCartSuggestions() {
  const trendingProducts = useTrendingProducts();
  const { add } = useCart();
  //   console.log(trendingProducts);
  return (
    <div className="max-w-lg mx-auto">
      <div>
        <div className="text-center">
          <ShoppingCartIcon
            className={`flex-shrink-0 w-8 h-8  group-hover:text-gray-500
            text-gray-400 mx-auto
          `}
            aria-hidden="true"
          />{" "}
          <h2 className="mt-2 text-lg font-medium text-gray-900">Empty Cart</h2>
          <p className="mt-1 text-sm text-gray-500">
            You haven’t added any items to your cart yet.
          </p>
        </div>
        <div className={`mt-6 flex justify-center`}>
          <Link href={`/store`}>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-teal-600 border border-transparent rounded-md shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
              Shop
            </button>
          </Link>
        </div>
      </div>
      <div className="mt-10">
        <h3 className="text-sm font-medium text-gray-500">Trending products</h3>
        <ul
          role="list"
          className="mt-4 border-t border-b border-gray-200 divide-y divide-gray-200"
        >
          {trendingProducts?.map((product, productIdx) => (
            <li
              key={productIdx}
              className="flex items-center justify-between py-4 space-x-3"
            >
              <div className="flex items-center flex-1 min-w-0 space-x-3">
                <div className="flex-shrink-0">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={product.images[0].file.url}
                    alt=""
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {product.name}
                  </p>
                  <p className="text-sm font-medium text-gray-500 truncate">
                    {product.description}
                  </p>
                  <p className="text-sm font-medium text-gray-500 truncate">
                    {formatMoney(product.price)}
                  </p>
                </div>
              </div>
              <div className="flex-shrink-0">
                <button
                  onClick={(e) => {
                    e.preventDefault();

                    add({ id: product.id });
                  }}
                  type="button"
                  className="inline-flex items-center px-3 py-2 bg-gray-100 border border-transparent rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                >
                  <PlusIcon
                    className="-ml-1 mr-0.5 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <span className="text-sm font-medium text-gray-900">
                    {" "}
                    Add <span className="sr-only">{product.name}</span>{" "}
                  </span>
                </button>
              </div>
            </li>
          ))}
        </ul>
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
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/

const people = [
  {
    name: "Lindsay Walton",
    role: "Front-end Developer",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Courtney Henry",
    role: "Designer",
    imageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Tom Cook",
    role: "Director, Product Development",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];
