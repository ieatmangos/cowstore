import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { formatDate, formatMoney } from "@lib/utils";
import Link from "next/link";
import React from "react";

export default function OrdersList({ orders }) {
  if (!orders) return null;
  return (
    <section aria-labelledby="recent-heading" className="">
      <h2 id="recent-heading" className="sr-only">
        Recent orders
      </h2>
      <div className="">
        <div className="space-y-8 ">
          {orders.map((order) => (
            <OrderGroup order={order} key={order.number} />
          ))}
        </div>
      </div>
    </section>
  );
}

const OrderGroup = ({ order }) => {
  return (
    <div>
      <h3 className="sr-only">
        Order placed on <time dateTime={order.datetime}>{order.date}</time>
      </h3>

      <div className="px-4 py-6 rounded-lg bg-slate-200 sm:flex sm:items-center sm:justify-between sm:space-x-6 sm:px-6 lg:space-x-8">
        <dl className="flex-auto space-y-6 text-sm text-gray-600 divide-y divide-gray-200 sm:grid sm:grid-cols-3 sm:gap-x-6 sm:space-y-0 sm:divide-y-0 lg:w-1/2 lg:flex-none lg:gap-x-8">
          <div className="flex justify-between sm:block">
            <dt className="font-medium text-gray-900">Date placed</dt>
            <dd className="sm:mt-1">
              <time dateTime={order.dateCreated}>
                {formatDate(order.dateCreated)}
              </time>
            </dd>
          </div>
          <div className="flex justify-between pt-6 sm:block sm:pt-0">
            <dt className="font-medium text-gray-900">Order number</dt>
            <dd className="sm:mt-1">{order.number}</dd>
          </div>
          <div className="flex justify-between pt-6 font-medium text-gray-900 sm:block sm:pt-0">
            <dt>Total amount</dt>
            <dd className="sm:mt-1">{formatMoney(order.grandTotal)}</dd>
          </div>
        </dl>
        <a
          href={order.invoiceHref}
          className="flex items-center justify-center w-full px-4 py-2 mt-6 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto"
        >
          View Invoice
          <span className="sr-only">for order {order.number}</span>
        </a>
      </div>

      <table className="w-full mt-4 text-gray-500 sm:mt-6">
        <caption className="sr-only">Products</caption>
        <thead className="text-sm text-left text-gray-500 sr-only sm:not-sr-only">
          <tr>
            <th scope="col" className="py-3 pr-8 font-normal sm:w-2/5 lg:w-1/3">
              Product
            </th>
            <th
              scope="col"
              className="hidden w-1/5 py-3 pr-8 font-normal sm:table-cell"
            >
              Price
            </th>
            <th
              scope="col"
              className="hidden py-3 pr-8 font-normal sm:table-cell"
            >
              Status
            </th>
            <th scope="col" className="w-0 py-3 font-normal text-right">
              Info
            </th>
          </tr>
        </thead>
        <tbody className="text-sm border-b border-gray-200 divide-y divide-gray-200 sm:border-t">
          {/* const { product } = line;
      const _shipmentDate =
        order.shipments?.results.sort((a, b) =>
          new Date(a) < new Date(b) ? -1 : 1
        )[0] || null;
      const shipmentDate = _shipmentDate
        ? _shipmentDate.dateCreated
        : null;
      const purchaseOption = line ? line.purchaseOption.type : null;
      console.log(line); */}
          {order?.items?.map((line) => {
            const { product } = line;
            const _shipmentDate =
              order.shipments?.results.sort((a, b) =>
                new Date(a) < new Date(b) ? -1 : 1
              )[0] || null;
            const shipmentDate = _shipmentDate
              ? _shipmentDate.dateCreated
              : null;
            const purchaseOption = line ? line.purchaseOption.type : null;

            return (
              <tr key={product.id}>
                <td className="py-6 pr-8">
                  <div className="flex items-center">
                    <img
                      src={product.images[0].file.url}
                      alt={product.imageAlt}
                      className="object-cover object-center w-16 h-16 mr-6 rounded"
                    />

                    <div>
                      <div className="font-medium text-gray-900">
                        {product.name}
                      </div>
                      <div className="mt-1 sm:hidden">
                        {formatMoney(line.price)}
                      </div>
                      {purchaseOption === "subscription" && (
                        <button className="flex items-center px-3 py-1 mt-4 text-xs text-teal-900 bg-teal-200 rounded-full ring-1 ring-inset ring-teal-600">
                          <CheckCircleIcon className={`-ml-1 w-5  mr-1`} />
                          Subscription
                        </button>
                      )}
                    </div>
                  </div>
                </td>

                <td className="hidden py-6 pr-8 sm:table-cell">
                  {formatMoney(line.price)}
                </td>

                <td className="hidden py-6 pr-8 sm:table-cell">
                  {order.status}
                </td>
                <td className="py-6 font-medium text-right whitespace-nowrap">
                  <Link href={`/order/${order.id}`}>
                    <div className="text-rose-600">
                      View <span className="hidden lg:inline">Product</span>
                      <span className="sr-only">, {product.name}</span>
                    </div>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const old = () => {
  return (
    <div
      key={order.id}
      className="bg-white border-t border-b border-gray-200 shadow-sm sm:rounded-lg sm:border"
    >
      <h3 className="sr-only">
        Order placed on{" "}
        <time dateTime={order.dateCreated}>{order.dateCreated}</time>
      </h3>

      <div className="flex items-center border-b border-gray-200 sm:grid sm:grid-cols-4 sm:gap-x-6 ">
        <dl className="grid flex-1 grid-cols-2 text-sm gap-x-6 sm:col-span-3 sm:grid-cols-3 lg:col-span-2">
          <div
            className={` p-4 ${
              order.subscriptionDelivery ? "bg-teal-300" : "bg-gray-200"
            }`}
          >
            <dt className="font-medium text-gray-900">Order number</dt>
            <dd className="mt-1 text-lg text-gray-800">{order.number}</dd>
          </div>
          <div className="hidden p-4 sm:block">
            <dt className="font-medium text-gray-900">Date placed</dt>
            <dd className="mt-1 text-gray-500">
              <time dateTime={order.dateCreated}>
                {formatDate(order.dateCreated)}
              </time>
            </dd>
          </div>
          <div className={` p-4 `}>
            <dt className="font-medium text-gray-900">Total amount</dt>
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

        <div className="flex justify-end p-4 lg:col-span-2 lg:items-center lg:space-x-4">
          {/* <a
              href={order.href}
              className="flex items-center justify-center rounded-md border border-gray-300 bg-white py-2 px-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
              <span>View Order</span>
              <span className="sr-only">{order.number}</span>
            </a> */}
          <Link href={`/order/${order.id}`}>
            <div className="flex items-center justify-center rounded-md border border-gray-300 bg-white py-2 px-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2">
              <span>View Order</span>
              <span className="sr-only">for {order.number}</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Products */}
      <h4 className="sr-only">Items</h4>
      <ul role="list" className="divide-y divide-gray-200">
        {order.items?.map((line) => {
          const { product } = line;
          const _shipmentDate =
            order.shipments?.results.sort((a, b) =>
              new Date(a) < new Date(b) ? -1 : 1
            )[0] || null;
          const shipmentDate = _shipmentDate ? _shipmentDate.dateCreated : null;
          const purchaseOption = line ? line.purchaseOption.type : null;
          return (
            <li key={product.id} className="relative p-4 sm:p-6">
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
                    <p className="mt-2 sm:mt-0">{formatMoney(line.price)}</p>
                  </div>
                  {purchaseOption === "subscription" && (
                    <p className="flex items-center px-4 py-2 text-sm text-teal-900 bg-teal-200 rounded-full ring-1 ring-inset ring-teal-600">
                      <CheckCircleIcon className={`-ml-1 w-5  mr-2`} />
                      Subscription
                    </p>
                  )}
                  {/* <p className="hidden text-gray-500 sm:mt-2 sm:block">
                          {product.description}
                        </p> */}
                </div>
              </div>

              <div className="mt-6 sm:flex sm:justify-between">
                <div className={``}>
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
                        {order.status}
                      </p>
                    </div>
                  )}
                </div>

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
  );
};
