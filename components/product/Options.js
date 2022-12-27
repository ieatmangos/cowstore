import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import React from "react";

export default function PurchaseOptions({ purchaseOption, setPurchaseOption }) {
  return (
    <RadioGroup value={purchaseOption} onChange={setPurchaseOption}>
      <RadioGroup.Label className="text-lg font-medium text-gray-900">
        Purchase Options
      </RadioGroup.Label>

      <div className="relative grid grid-cols-3 mt-4 space-x-4">
        {purchaseOptions.map((po, poIdx) => (
          <RadioGroup.Option
            key={po.id}
            value={po}
            className={({ checked, active }) =>
              cn(
                checked ? "border-transparent" : "border-gray-300",
                active ? "ring-2 ring-teal-500" : "",
                poIdx > 0 ? "col-span-2" : "",
                "relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none"
              )
            }
          >
            {({ checked, active }) => (
              <>
                <span className="flex flex-1">
                  <span className="flex flex-col">
                    <RadioGroup.Label
                      as="span"
                      className="block text-sm text-gray-900"
                    >
                      {po.title}hi
                    </RadioGroup.Label>
                    <RadioGroup.Description
                      as="span"
                      className="flex items-center mt-1 text-sm text-gray-500 "
                    >
                      {po.description}
                    </RadioGroup.Description>
                  </span>
                </span>
                {checked ? (
                  <CheckCircleIcon
                    className="absolute w-5 h-5 text-teal-600 top-1 right-1"
                    aria-hidden="true"
                  />
                ) : null}
                <span
                  className={cn(
                    active ? "border" : "border-2",
                    checked ? "border-teal-500" : "border-transparent",
                    "pointer-events-none absolute -inset-px rounded-lg"
                  )}
                  aria-hidden="true"
                />
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
}
