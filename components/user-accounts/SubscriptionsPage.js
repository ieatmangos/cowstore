import {
  PauseCircleIcon,
  PauseIcon,
  PlayCircleIcon,
  PlayIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { swellStore } from "@lib/swell";
import { swellStoreId } from "@lib/swell/swellStore";
import Image from "next/image";
import React, { useState } from "react";

export default function SubscriptionsPage({ subscriptions }) {
  return (
    <>
      <div className={``}>Active subscriptions</div>

      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 "
      >
        {subscriptions?.map((sub) => {
          if (sub.canceled) return null;
          return <Subscription sub={sub} key={sub.id} />;
        })}
      </ul>
      <div className={` !mt-12 text-gray-600`}>Deactivated subscriptions</div>
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 opacity-50 sm:grid-cols-2 md:grid-cols-3 "
      >
        {subscriptions?.map((sub) => {
          if (!sub.canceled) return null;
          return <Subscription sub={sub} key={sub.id} />;
        })}
      </ul>
    </>
  );
}
const Subscription = ({ sub }) => {
  const [subscription, setSubscription] = useState(sub);
  return (
    <li className="flex flex-col col-span-1 text-center bg-white divide-y divide-gray-200 rounded-lg shadow">
      <div className="relative flex flex-col flex-1 ">
        <div className={`relative w-full h-32`}>
          <Image
            fill
            className="flex-shrink-0 object-cover object-center w-full h-full mx-auto rounded-t-md "
            src={sub.product.images[0].file.url}
            alt={sub.product.name}
          />
        </div>
        <div className={`p-8`}>
          <h3 className="text-sm font-medium text-gray-900 ">
            {sub.product.name}
          </h3>
          <dl className="flex flex-col justify-between flex-grow mt-1">
            <dt className="sr-only">Interval</dt>
            <dd className="text-sm text-gray-500">
              Once{" "}
              {sub.billingSchedule.intervalCount > 1
                ? `every ${sub.billingSchedule.intervalCount}`
                : "a"}{" "}
              month
              {sub.billingSchedule.intervalCount > 1 ? "s" : ""}
            </dd>
            <dt className="sr-only">Status</dt>
            <dd className="mt-3">
              <span
                className={`px-2 py-1 text-xs font-medium  
                            ${
                              subscription.canceled
                                ? "text-rose-800  bg-rose-100 "
                                : subscription.paused
                                ? "text-amber-800  bg-amber-100 "
                                : "text-emerald-800  bg-emerald-100 "
                            }
                            rounded-full`}
              >
                {subscription.canceled
                  ? "Canceled"
                  : subscription.paused
                  ? "Paused"
                  : "Active"}
              </span>
            </dd>
          </dl>
        </div>
      </div>
      <div className={`${subscription.canceled === true ? "hidden" : ""}`}>
        <div className="flex -mt-px divide-x divide-gray-200">
          <div className="flex flex-1 w-0">
            <div
              role="button"
              onClick={async () => {
                const confirm = await window.confirm(
                  "Are you sure you want to cancel this subscription? This action cannot be undone."
                );
                if (confirm) {
                  const res = await swellStoreId(
                    "subscriptions",
                    "update",
                    `${sub.id}`,
                    {
                      canceled: true,
                    }
                  );
                  setSubscription((c) => {
                    return { ...c, canceled: true };
                  });
                }
              }}
              className="relative inline-flex items-center justify-center flex-1 w-0 py-4 -mr-px text-sm font-medium text-gray-700 border border-transparent rounded-bl-lg hover:text-gray-500"
            >
              <XMarkIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
              <span className="ml-3">Cancel</span>
            </div>
          </div>
          <div className={`flex flex-1 w-0 -ml-px `}>
            {!subscription.paused ? (
              <div
                role="button"
                onClick={async () => {
                  const res = await swellStoreId(
                    "subscriptions",
                    "update",
                    `${sub.id}`,
                    {
                      paused: true,
                      date_pause_end: null,
                    }
                  );
                  setSubscription((c) => {
                    return { ...c, paused: true };
                  });
                }}
                className="relative inline-flex items-center justify-center flex-1 w-0 py-4 text-sm font-medium text-gray-700 border border-transparent rounded-br-lg hover:text-gray-500"
              >
                <PauseIcon
                  className="w-5 h-5 text-gray-400"
                  aria-hidden="true"
                />
                <span className="ml-3">Pause</span>
              </div>
            ) : (
              <div
                role="button"
                onClick={async () => {
                  const res = await swellStoreId(
                    "subscriptions",
                    "update",
                    `${sub.id}`,
                    {
                      paused: false,
                      date_pause_end: null,
                    }
                  );
                  setSubscription((c) => {
                    return { ...c, paused: false };
                  });
                }}
                className="relative inline-flex items-center justify-center flex-1 w-0 py-4 text-sm font-medium text-gray-700 border border-transparent rounded-br-lg hover:text-gray-500"
              >
                <PlayIcon
                  className="w-5 h-5 text-gray-400"
                  aria-hidden="true"
                />

                <span className="ml-3">Resume</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </li>
  );
};
