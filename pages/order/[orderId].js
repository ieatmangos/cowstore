import ActivedCard from "@components/ui/forms/ActivedCard";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import swell, { swellStore } from "@lib/swell";
import getOrder from "@lib/swell/cart/getOrder";
import { formatMoney } from "@lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function OrderId(props) {
  const [order, setOrder] = useState(null);
  const router = useRouter();
  const getData = async (orderId) => {
    const _order = await getOrder(orderId);
    if (_order) {
      setOrder(_order);
    }
  };
  useEffect(() => {
    const id = router.query.orderId;
    router && id && getData(id);
  }, [router]);
  return (
    <div>
      <OrderSummary order={order} />
    </div>
  );
}
// OrderId.getInitialProps = async ({ query }) => {
//   console.log(query.orderId);
//   const orderId = query.orderId;
//   const order = await swellStore("cart", "getOrder", orderId);
//   // const order = [];

//   return {
//     props: {
//       order: order ? order.results : null,
//       id: orderId,
//     },
//   };
// };

const products = [
  {
    id: 1,
    name: "Basic Tee",
    href: "#",
    price: "$36.00",
    color: "Charcoal",
    size: "L",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/confirmation-page-06-product-01.jpg",
    imageAlt: "Model wearing men's charcoal basic tee in large.",
  },
  // More products...
];

function OrderSummary({ order }) {
  if (!order) return null;
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
      <main className="relative lg:min-h-full">
        <div>
          <div className="max-w-2xl px-4 py-16 mx-auto sm:px-6 sm:py-24 lg:px-8 lg:py-32 ">
            <div className="lg:col-start-2 lg:col-span-2">
              <h1 className="text-sm font-medium text-teal-600">
                Payment successful
              </h1>
              <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Thanks for ordering
              </p>
              <p className="mt-2 text-base text-gray-500">
                We appreciate your order, we’re currently processing it. So hang
                tight and we’ll send you confirmation very soon!
              </p>

              {/* <dl className="mt-16 text-sm font-medium">
                <dt className="text-gray-900">Tracking number</dt>
                <dd className="mt-2 text-teal-600">51547878755545848512</dd>
              </dl> */}

              <ul
                role="list"
                className="mt-6 text-sm font-medium text-gray-500 border-t border-gray-200 divide-y divide-gray-200"
              >
                {order.items.map((item) => {
                  const { product, options } = item;
                  return (
                    <li key={product.id} className="flex py-6 space-x-6">
                      <img
                        src={product.images[0].file.url}
                        alt={product.imageAlt}
                        className="flex-none object-cover object-center w-24 h-24 bg-gray-100 rounded-md"
                      />
                      <div className="flex flex-col items-start flex-auto space-y-1">
                        <h3 className="text-gray-900">
                          <a href={product.href}>{product.name}</a>
                        </h3>

                        <p className="mt-1 text-gray-500">
                          {options.map((i) => {
                            return (
                              <span key={i.id}>
                                {i.value} {i.name}{" "}
                                {/* <span className={`block`}>
                                  {i.shipmentWeight} lbs
                                </span> */}
                              </span>
                            );
                          })}
                        </p>
                        {order.subscriptionDelivery && (
                          <p className="flex inline-flex items-center px-4 py-2 text-sm text-teal-900 bg-teal-200 rounded-full ring-1 ring-inset ring-teal-600">
                            <CheckCircleIcon className={`-ml-1 w-5  mr-2`} />
                            Subscription
                          </p>
                        )}
                      </div>
                      <p className="flex-none font-medium text-gray-900">
                        {formatMoney(item.price)}
                      </p>
                    </li>
                  );
                })}
              </ul>

              <dl className="pt-6 space-y-6 text-sm font-medium text-gray-500 border-t border-gray-200">
                <div className="flex justify-between">
                  <dt>Subtotal</dt>
                  <dd className="text-gray-900">
                    {formatMoney(order.subTotal)}
                  </dd>
                </div>

                <div className="flex justify-between">
                  <dt>Shipping</dt>
                  <dd className="text-gray-900">Free</dd>
                </div>

                <div className="flex justify-between">
                  <dt>Taxes</dt>
                  <dd className="text-gray-900">TODO</dd>
                </div>

                <div className="flex items-center justify-between pt-6 text-gray-900 border-t border-gray-200">
                  <dt className="text-base">Total</dt>
                  <dd className="text-base">{formatMoney(order.grandTotal)}</dd>
                </div>
              </dl>

              <dl className="grid grid-cols-2 mt-16 text-sm text-gray-600 gap-x-4">
                <div>
                  <dt className="font-medium text-gray-900">
                    Shipping Address
                  </dt>
                  <dd className="mt-2">
                    <address className="not-italic">
                      <span className="block">{order.shipping.name}</span>
                      {order.shipping.address2 && (
                        <span className="block">{order.shipping.address2}</span>
                      )}
                      <span className="block">{order.shipping.address1}</span>
                      <span className="block">
                        {order.shipping.city}, {order.shipping.state}{" "}
                        {order.shipping.zip}
                      </span>
                    </address>
                  </dd>
                </div>
                <ActivedCard card={order.billing.card} />
              </dl>

              <div className="py-6 mt-16 text-right border-t border-gray-200">
                <Link href={`/collections/products`}>
                  <div className="text-sm font-medium text-teal-600 hover:text-teal-500">
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
