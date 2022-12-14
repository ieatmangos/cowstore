import ActivedCard from "@components/ui/forms/ActivedCard";
import { swellStore } from "@lib/swell";
import { formatDate } from "@lib/utils";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function Orders() {
  const router = useRouter();
  const orderId = router.query.id || null;
  const [order, setOrder] = useState();
  async function demo() {
    const storeOrder = await swellStore("cart", "getOrder", orderId);
    setOrder(storeOrder);
  }
  useEffect(() => {
    demo();
  }, []);

  return (
    <div>
      <Order order={order} />
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
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
const products = [
  {
    id: 1,
    name: "Nomad Tumbler",
    description:
      "This durable and portable insulated tumbler will keep your beverage at the perfect temperature during your next adventure.",
    href: "#",
    price: "35.00",
    status: "Preparing to ship",
    step: 1,
    date: "March 24, 2021",
    datetime: "2021-03-24",
    address: ["Floyd Miles", "7363 Cynthia Pass", "Toronto, ON N3Y 4H8"],
    email: "f•••@example.com",
    phone: "1•••••••••40",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/confirmation-page-03-product-01.jpg",
    imageAlt: "Insulated bottle with white base and black snap lid.",
  },
  {
    id: 2,
    name: "Minimalist Wristwatch",
    description:
      "This contemporary wristwatch has a clean, minimalist look and high quality components.",
    href: "#",
    price: "149.00",
    status: "Shipped",
    step: 0,
    date: "March 23, 2021",
    datetime: "2021-03-23",
    address: ["Floyd Miles", "7363 Cynthia Pass", "Toronto, ON N3Y 4H8"],
    email: "f•••@example.com",
    phone: "1•••••••••40",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/confirmation-page-03-product-02.jpg",
    imageAlt:
      "Arm modeling wristwatch with black leather band, white watch face, thin watch hands, and fine time markings.",
  },
  // More products...
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Order({ order }) {
  if (!order) return null;
  return (
    <div className="bg-gray-50">
      <div className="max-w-2xl pt-16 mx-auto sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="px-4 space-y-2 sm:flex sm:items-baseline sm:justify-between sm:space-y-0 sm:px-0">
          <div className="flex sm:items-baseline sm:space-x-4">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Order #{order.number}
            </h1>
            {/* <a
              href="#"
              className="hidden text-sm font-medium text-teal-600 hover:text-teal-500 sm:block"
            >
              View invoice
              <span aria-hidden="true"> &rarr;</span>
            </a> */}
          </div>
          <p className="text-sm text-gray-600">
            Order placed{" "}
            <time dateTime="2021-03-22" className="font-medium text-gray-900">
              {formatDate(order.dateCreated)}
            </time>
          </p>
          {/* <a
            href="#"
            className="text-sm font-medium text-teal-600 hover:text-teal-500 sm:hidden"
          >
            View invoice
            <span aria-hidden="true"> &rarr;</span>
          </a> */}
        </div>

        {/* Products */}
        <div className="mt-6">
          <h2 className="sr-only">Products purchased</h2>

          <div className="space-y-8">
            {order.items?.map((item) => {
              const { product } = item;
              return (
                <div
                  key={item.id}
                  className="bg-white border-t border-b border-gray-200 shadow-sm sm:rounded-lg sm:border"
                >
                  <div className="px-4 py-6 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:p-8">
                    <div className="sm:flex lg:col-span-7">
                      <div className="flex-shrink-0 w-full overflow-hidden rounded-lg aspect-w-1 aspect-h-1 sm:aspect-none sm:h-40 sm:w-40">
                        <img
                          src={product.images[0].file.url}
                          alt={product.name}
                          className="object-cover object-center w-full h-full sm:h-full sm:w-full"
                        />
                      </div>

                      <div className="mt-6 sm:mt-0 sm:ml-6">
                        <h3 className="text-base font-medium text-gray-900">
                          <a href={product.href}>
                            ({item.quantity}) {product.name}
                          </a>
                        </h3>
                        <p className="mt-2 text-sm font-medium text-gray-900">
                          ${item.priceTotal}
                        </p>
                        {/* <p className="mt-2 text-sm font-medium text-gray-900">
                          Qty: {item.quantity}
                        </p> */}
                        <p className="mt-3 text-sm text-gray-500">
                          {product.description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 lg:col-span-5 lg:mt-0">
                      <dl className="grid grid-cols-2 text-sm gap-x-6">
                        <div>
                          <dt className="font-medium text-gray-900">
                            Delivery address
                          </dt>
                          <dd className="mt-3 text-gray-500">
                            <span className="block">
                              {order.shipping.address1}
                            </span>
                            <span className="block">
                              {order.shipping.address2}
                            </span>
                            <span className="block">
                              {order.shipping.city}, {order.shipping.state}{" "}
                              {order.shipping.zip}
                            </span>
                            {/* <span className="block">{product.address[1]}</span>
                            <span className="block">{product.address[2]}</span> */}
                          </dd>
                        </div>
                        <div>
                          <dt className="font-medium text-gray-900">
                            Shipping updates
                          </dt>
                          <dd className="mt-3 space-y-3 text-gray-500">
                            <p>{product.email}</p>
                            <p>{product.phone}</p>
                            {/* <button
                              type="button"
                              className="font-medium text-teal-600 hover:text-teal-500"
                            >
                              Edit
                            </button> */}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>

                  <div className="px-4 py-6 border-t border-gray-200 sm:px-6 lg:p-8">
                    <h4 className="sr-only">Status</h4>
                    <p className="text-sm font-medium text-gray-900">
                      {product.status} on{" "}
                      <time dateTime={product.datetime}>{product.date}</time>
                    </p>
                    <div className="mt-6" aria-hidden="true">
                      <div className="overflow-hidden bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-teal-600 rounded-full"
                          style={{
                            width: `calc((${product.step} * 2 + 1) / 8 * 100%)`,
                          }}
                        />
                      </div>
                      <div className="hidden grid-cols-4 mt-6 text-sm font-medium text-gray-600 sm:grid">
                        <div className="text-teal-600">Order placed</div>
                        <div
                          className={classNames(
                            product.step > 0 ? "text-teal-600" : "",
                            "text-center"
                          )}
                        >
                          Processing
                        </div>
                        <div
                          className={classNames(
                            product.step > 1 ? "text-teal-600" : "",
                            "text-center"
                          )}
                        >
                          Shipped
                        </div>
                        <div
                          className={classNames(
                            product.step > 2 ? "text-teal-600" : "",
                            "text-right"
                          )}
                        >
                          Delivered
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Billing */}
        <div className="mt-16">
          <h2 className="sr-only">Billing Summary</h2>

          <div className="px-4 py-6 bg-gray-100 sm:rounded-lg sm:px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8 lg:py-8">
            <dl className="grid grid-cols-2 gap-6 text-sm sm:grid-cols-2 md:gap-x-8 lg:col-span-7">
              <div>
                <dt className="font-medium text-gray-900">Billing address</dt>
                <dd className="mt-3 text-gray-500">
                  <span className="block">Floyd Miles</span>
                  <span className="block">7363 Cynthia Pass</span>
                  <span className="block">Toronto, ON N3Y 4H8</span>
                </dd>
              </div>
              <ActivedCard card={order.billing.card} />
            </dl>

            <dl className="mt-8 text-sm divide-y divide-gray-200 lg:col-span-5 lg:mt-0">
              <div className="flex items-center justify-between pb-4">
                <dt className="text-gray-600">Subtotal</dt>
                <dd className="font-medium text-gray-900">$72</dd>
              </div>
              <div className="flex items-center justify-between py-4">
                <dt className="text-gray-600">Shipping</dt>
                <dd className="font-medium text-gray-900">$5</dd>
              </div>
              <div className="flex items-center justify-between py-4">
                <dt className="text-gray-600">Tax</dt>
                <dd className="font-medium text-gray-900">$6.16</dd>
              </div>
              <div className="flex items-center justify-between pt-4">
                <dt className="font-medium text-gray-900">Order total</dt>
                <dd className="font-medium text-teal-600">$83.16</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
