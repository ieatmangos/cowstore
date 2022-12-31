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
import OrdersList from "@components/orders/OrdersList";

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
  return <div className="bg-white"></div>;
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
        <OrdersList orders={data.orders.results} />
      </main>
    </div>
  );
}
