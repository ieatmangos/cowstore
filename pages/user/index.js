import swell, { defaultAccount } from "@lib/swell";
import { getCookie, getCookies } from "cookies-next";
import { Fragment, useEffect, useState } from "react";
import { Menu, Popover, Transition } from "@headlessui/react";
import {
  EllipsisVerticalIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { formatDate, formatMoney } from "@lib/utils";

export default function User() {
  const cookies = getCookies(); // - server side
  const [userData, setUserData] = useState(null);

  const getUser = async () => {
    const account = await swell.account.get();
    if (account) {
      const results = await swell.account.listOrders({
        expand: "shipments",
      });

      setUserData({ ...account, orders: !results ? [] : results });
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      {/* <NotLoggedIn /> */}
      {userData ? <UserPage data={userData} /> : <NotLoggedIn />}
    </>
  );
}

function NotLoggedIn() {
  return (
    <div className="bg-white">
      <div className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="overflow-hidden bg-teal-100 rounded-lg shadow-xl lg:grid lg:grid-cols-2 lg:gap-4">
          <div className="px-6 pt-10 pb-12 sm:px-16 sm:pt-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
            <div className="lg:self-center">
              <h2 className="text-3xl font-bold tracking-tight text-teal-900 sm:text-4xl">
                <span className="block text-black">Ready to feast?</span>
                <span className="block">Create an account for free.</span>
              </h2>
              <p className="mt-4 text-lg leading-6 text-teal-700">
                Join as a customer or as a Vermont Farm vendor.
              </p>
              <Link href={"/user/sign-up"}>
                <div className="inline-flex items-center px-5 py-3 mt-8 text-base font-medium text-white bg-teal-500 border border-transparent rounded-md shadow hover:bg-teal-400">
                  Sign up for free
                </div>
              </Link>
            </div>
          </div>
          <div className="-mt-6 aspect-w-5 aspect-h-3 md:aspect-w-2 md:aspect-h-1">
            <img
              className="object-cover object-left-top transform translate-x-6 translate-y-6 rounded-md sm:translate-x-16 lg:translate-y-20"
              src="/assets/steak/1.jpg"
              alt="App screenshot"
            />
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
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/

// const orders = [
//   {
//     number: "WU88191111",
//     href: "#",
//     invoiceHref: "#",
//     createdDate: "Jul 6, 2021",
//     createdDatetime: "2021-07-06",
//     deliveredDate: "July 12, 2021",
//     deliveredDatetime: "2021-07-12",
//     total: "$160.00",
//     products: [
//       {
//         id: 1,
//         name: "Micro Backpack",
//         description:
//           "Are you a minimalist looking for a compact carry option? The Micro Backpack is the perfect size for your essential everyday carry items. Wear it like a backpack or carry it like a satchel for all-day use.",
//         href: "#",
//         price: "$70.00",
//         imageSrc:
//           "https://tailwindui.com/img/ecommerce-images/order-history-page-03-product-01.jpg",
//         imageAlt:
//           "Moss teal canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps.",
//       },
//       // More products...
//     ],
//   },
//   // More orders...
// ];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function UserPage({ data }) {
  return (
    <div className="bg-gray-50">
      <main className="py-24">
        <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
          <div className="max-w-2xl px-4 mx-auto lg:max-w-4xl lg:px-0">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Order history
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Check the status of recent orders for {data.email}
            </p>
          </div>
        </div>

        {/* Recent Orders */}

        {data && data.orders && data.orders.length > 0 && (
          <section aria-labelledby="recent-heading" className="mt-16">
            <h2 id="recent-heading" className="sr-only">
              Recent orders
            </h2>
            <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
              <div className="max-w-2xl mx-auto space-y-8 sm:px-4 lg:max-w-4xl lg:px-0">
                {data.orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white border-t border-b border-gray-200 shadow-sm sm:rounded-lg sm:border"
                  >
                    <h3 className="sr-only">
                      Order placed on{" "}
                      <time dateTime={order.dateCreated}>
                        {order.dateCreated}
                      </time>
                    </h3>

                    <div className="flex items-center p-4 border-b border-gray-200 sm:grid sm:grid-cols-4 sm:gap-x-6 sm:p-6">
                      <dl className="grid flex-1 grid-cols-2 text-sm gap-x-6 sm:col-span-3 sm:grid-cols-3 lg:col-span-2">
                        <div>
                          <dt className="font-medium text-gray-900">
                            Order number
                          </dt>
                          <dd className="mt-1 text-gray-500">{order.number}</dd>
                        </div>
                        <div className="hidden sm:block">
                          <dt className="font-medium text-gray-900">
                            Date placed
                          </dt>
                          <dd className="mt-1 text-gray-500">
                            <time dateTime={order.dateCreated}>
                              {formatDate(order.dateCreated)}
                            </time>
                          </dd>
                        </div>
                        <div>
                          <dt className="font-medium text-gray-900">
                            Total amount
                          </dt>
                          <dd className="mt-1 font-medium text-gray-900">
                            {formatMoney(order.grandTotal)}
                          </dd>
                        </div>
                      </dl>

                      {/* <Menu
                      as="div"
                      className="relative flex justify-end lg:hidden"
                    >
                      <div className="flex items-center">
                        <Menu.Button className="flex items-center p-2 -m-2 text-gray-400 hover:text-gray-500">
                          <span className="sr-only">
                            Options for order {order.number}
                          </span>
                          <EllipsisVerticalIcon
                            className="w-6 h-6"
                            aria-hidden="true"
                          />
                        </Menu.Button>
                      </div>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 w-40 mt-2 origin-bottom-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="py-1">
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href={order.href}
                                  className={classNames(
                                    active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700",
                                    "block px-4 py-2 text-sm"
                                  )}
                                >
                                  View
                                </a>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href={order.invoiceHref}
                                  className={classNames(
                                    active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700",
                                    "block px-4 py-2 text-sm"
                                  )}
                                >
                                  Invoice
                                </a>
                              )}
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu> */}

                      <div className="hidden lg:col-span-2 lg:flex lg:items-center lg:justify-end lg:space-x-4">
                        {/* <a
                        href={order.href}
                        className="flex items-center justify-center rounded-md border border-gray-300 bg-white py-2 px-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                      >
                        <span>View Order</span>
                        <span className="sr-only">{order.number}</span>
                      </a> */}
                        <a
                          href={order.invoiceHref}
                          className="flex items-center justify-center rounded-md border border-gray-300 bg-white py-2 px-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                        >
                          <span>View Invoice</span>
                          <span className="sr-only">
                            for order {order.number}
                          </span>
                        </a>
                      </div>
                    </div>

                    {/* Products */}
                    <h4 className="sr-only">Items</h4>
                    <ul role="list" className="divide-y divide-gray-200">
                      {order.items.map((line) => {
                        const { product } = line;
                        const shipmentDate = order.shipments.results.sort(
                          (a, b) => (new Date(a) < new Date(b) ? -1 : 1)
                        )[0].dateCreated;
                        return (
                          <li key={product.id} className="p-4 sm:p-6">
                            <div className="flex items-center sm:items-start">
                              <div className="flex-shrink-0 w-20 h-20 overflow-hidden bg-gray-200 rounded-lg sm:h-40 sm:w-40">
                                <img
                                  src={product.images[0].file.url}
                                  alt={product.name}
                                  className="object-cover object-center w-full h-full"
                                />
                              </div>
                              <div className="flex-1 ml-6 text-sm">
                                <div className="font-medium text-gray-900 sm:flex sm:justify-between">
                                  <h5>{product.name}</h5>
                                  <p className="mt-2 sm:mt-0">{order.price}</p>
                                </div>
                                <p className="hidden text-gray-500 sm:mt-2 sm:block">
                                  {product.description}
                                </p>
                              </div>
                            </div>

                            <div className="mt-6 sm:flex sm:justify-between">
                              {shipmentDate ? (
                                <div className="flex items-center">
                                  <CheckCircleIcon
                                    className="w-5 h-5 text-teal-500"
                                    aria-hidden="true"
                                  />
                                  <p className="ml-2 text-sm font-medium text-gray-500">
                                    Shipped on{" "}
                                    <time dateTime={shipmentDate}>
                                      {formatDate(shipmentDate)}
                                    </time>
                                  </p>
                                </div>
                              ) : (
                                <div className="flex items-center">
                                  <CheckCircleIcon
                                    className="w-5 h-5 text-teal-500"
                                    aria-hidden="true"
                                  />
                                  <p className="ml-2 text-sm font-medium text-gray-500">
                                    Your order is at the butcher shop
                                  </p>
                                </div>
                              )}

                              <div className="flex items-center pt-4 mt-6 space-x-4 text-sm font-medium border-t border-gray-200 divide-x divide-gray-200 sm:mt-0 sm:ml-4 sm:border-none sm:pt-0">
                                <div className="flex justify-center flex-1">
                                  <a
                                    href={product.href}
                                    className="text-teal-600 whitespace-nowrap hover:text-teal-500"
                                  >
                                    View product
                                  </a>
                                </div>
                                <div className="flex justify-center flex-1 pl-4">
                                  <a
                                    href="#"
                                    className="text-teal-600 whitespace-nowrap hover:text-teal-500"
                                  >
                                    Buy again
                                  </a>
                                </div>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
