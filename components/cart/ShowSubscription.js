import React from "react";

export default function ShowSubscription({ purchaseOption }) {
  if (!purchaseOption) return null;
  return (
    <>
      <p className="mt-1 text-gray-500">
        {purchaseOption.type === "subscription" ? "Subscription" : null}
      </p>
      {purchaseOption.type === "subscription" ? (
        <p className="mt-1 text-gray-500">
          Deliver once{" "}
          {purchaseOption.billingSchedule.intervalCount > 1
            ? `every ${purchaseOption.billingSchedule.intervalCount}`
            : "a"}{" "}
          month
          {purchaseOption.billingSchedule.intervalCount > 1 ? "s" : ""}
        </p>
      ) : null}
    </>
  );
}
