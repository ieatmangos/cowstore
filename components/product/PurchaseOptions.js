import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import useCart from "@lib/swell/cart/useCart";
import cn from "@utils/cn";
import { useFormik } from "formik";
import React, { useState } from "react";

export default function PurchaseOptions({ product, inStockOptions }) {
  const standard = product.purchase_options["standard"] || null;
  const subscription = product.purchase_options["subscription"] || null;
  const [purchaseOption, setPurchaseOption] = useState(null);
  const [subscriptionPlan, setSubscriptionPlan] = useState(null);
  const [option1, setOption1] = useState(null);
  const _price = product.sale ? product.sale_price : product.price;
  const [price, setPrice] = useState(_price);

  const { add, cart } = useCart();

  //   console.log(subscription);
  //   console.log(standard);
  if (standard) {
    standard.type = "standard";
  }
  if (subscription) {
    subscription.type = "subscription";
  }

  const subscriptionDiscount = 0.15;
  const purchaseOptions = [
    {
      id: "standard",
      title: "One time",
      description: "",
      price: standard?.price,
      option: standard,
    },
    {
      id: "subscribe",
      title: "Subscribe",
      description: `Save $${standard?.price - subscription?.plans[0].price}`,
      price: null,
      plans: subscription?.plans || [],
      option: subscription,
    },
  ];

  const subscriptionPlans = subscription?.plans || [];
  if (subscriptionPlans.length < 1) {
    purchaseOptions.pop();
  }
  const initialFormValues = {
    purchase_option: {
      type: "",
      plan_id: null,
    },
  };
  const formik = useFormik({
    initialValues: initialFormValues,
    // validate,
    onSubmit: async (values) => {
      try {
      } catch (errors) {
        console.log(errors);
      }

      try {
      } catch (err) {
        console.log(err);
      }
      // console.log(exp_year);
      // alert(JSON.stringify(values, null, 2));
    },
  });
  const values = formik.values;
  const set = (fieldName, obj) => {
    formik.setFieldValue(fieldName, obj);
  };
  const subscriptionReady = values?.purchase_option?.type === "subscription";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.purchase_option) {
      add({
        id: product.id,
        options: values.options,
        purchase_option: values.purchase_option,
      });
    } else {
      add({ id: product.id });
    }
  };

  return (
    <>
      <>
        {product.options.map((option, optionIdx) => {
          if (!option.active) return null;
          return (
            <div key={option + "product_options"}>
              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-medium text-gray-900">
                    {option.name}
                  </h2>
                  <a
                    href="#"
                    className="text-sm font-medium text-teal-600 hover:text-teal-500"
                  >
                    See sizing chart
                  </a>
                </div>

                <RadioGroup
                  value={option1}
                  onChange={(obj) => {
                    set("options", {
                      [option.name]: obj.name,
                    });
                    setPrice(_price + obj.price);
                    setOption1(obj);
                  }}
                  className="mt-2"
                >
                  <RadioGroup.Label className="sr-only">
                    {" "}
                    Choose {option.name}
                  </RadioGroup.Label>
                  <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                    {option.values.map((size) => {
                      size.inStock = inStockOptions[size.id];
                      return (
                        <RadioGroup.Option
                          key={size.name}
                          value={size}
                          className={({ active, checked }) =>
                            cn(
                              size.inStock
                                ? "cursor-pointer focus:outline-none"
                                : "opacity-25 cursor-not-allowed",
                              active
                                ? "ring-2 ring-offset-2 ring-teal-300"
                                : "",
                              checked
                                ? "bg-teal-200 border-transparent text-teal-900 "
                                : "bg-white border-gray-200 text-gray-900 hover:bg-gray-50",
                              "border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1"
                            )
                          }
                          disabled={!size.inStock}
                        >
                          <RadioGroup.Label as="span">
                            {size.name}
                          </RadioGroup.Label>
                        </RadioGroup.Option>
                      );
                    })}
                  </div>
                </RadioGroup>
              </div>
            </div>
          );
        })}
      </>
      {subscription && (
        <div>
          {/* Subscription Plans */}
          <div className="relative pt-10 mt-10 space-y-6 border-t border-gray-200">
            <Group1
              value={purchaseOption}
              id="purchase_option"
              change={(obj) => {
                set("purchase_option", {
                  type: obj.type,
                });
                setPurchaseOption(obj);
              }}
              list={purchaseOptions}
            />
            {subscriptionReady && (
              <Group2
                value={subscriptionPlan}
                list={subscriptionPlans}
                id="plan_id"
                change={(obj) => {
                  set("purchase_option", {
                    ...values.purchase_option,
                    plan_id: obj.id,
                  });
                  setSubscriptionPlan(obj);
                }}
              />
            )}
            {/* <Group2
          {...props}
          value={subscriptionPlan}
          change={setSubscriptionPlan}
        /> */}
          </div>
        </div>
      )}
      <>
        <button
          type="submit"
          onClick={handleSubmit}
          className="flex items-center justify-center w-full px-8 py-3 mt-10 text-base font-medium text-teal-900 bg-teal-300 border border-transparent rounded-md lg:sticky lg:top-12 hover:bg-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:ring-offset-2"
        >
          Add to cart
        </button>
      </>
    </>
  );
}

const Group2 = ({ value, change, list, set }) => {
  return (
    <RadioGroup value={value} onChange={change}>
      <RadioGroup.Label className="text-gray-900 font-base text-md">
        Frequency
      </RadioGroup.Label>
      <RadioGroup.Description className="text-sm text-gray-700 font-base">
        Deliver once every
        {value &&
          `
        ${
          value?.billing_schedule.interval_count > 1
            ? value.billing_schedule.interval_count
            : ""
        }
        month${value?.billing_schedule.interval_count > 1 ? "s" : ""}
        `}
      </RadioGroup.Description>

      <div className="grid grid-cols-2 mt-4 sm:max-w-[75vw] sm:mx-auto sm:grid-cols-4 gap-x-4 gap-y-4 lg:grid-cols-3 xl:grid-cols-4">
        {list.map((po) => (
          <RadioGroup.Option
            key={po.id}
            value={po}
            className={({ checked, active }) =>
              cn(
                checked
                  ? "border-transparent ds-gradient-2"
                  : "border-gray-300",
                active ? "ring-2 ring-teal-500" : "",
                "relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none"
              )
            }
          >
            {({ checked, active }) => (
              <>
                <span className="flex w-full">
                  <span className="flex flex-col w-full">
                    <RadioGroup.Label
                      as="span"
                      className="block text-sm text-center text-gray-900"
                    >
                      {po.billing_schedule?.interval_count}{" "}
                    </RadioGroup.Label>
                    <RadioGroup.Description
                      as="span"
                      className="flex items-center justify-center mt-1 text-sm text-center text-gray-500 "
                    >
                      month{po.billing_schedule?.interval_count > 1 ? "s" : ""}
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
};
const Group1 = ({ value, change, list, values, set, id }) => {
  const po = list;
  return (
    <>
      <RadioGroup value={value} onChange={change}>
        <RadioGroup.Label className="text-lg font-medium text-gray-900">
          Purchase options
        </RadioGroup.Label>

        <div className="grid grid-cols-2 mt-4 gap-x-4 ">
          {list.map((po) => (
            <RadioGroup.Option
              key={po.id}
              value={po.option}
              className={({ checked, active }) =>
                cn(
                  checked ? "border-transparent" : "border-gray-300",
                  active ? "ring-2 ring-teal-500" : "",
                  po.id === "subscribe" && checked ? "ds-gradient-2" : "",
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
                        className="block text-sm text-left text-gray-900"
                      >
                        {po.title}{" "}
                      </RadioGroup.Label>
                      <RadioGroup.Description
                        as="span"
                        className="flex mt-1 text-sm text-gray-500 items-left "
                      >
                        {po.description}
                      </RadioGroup.Description>
                    </span>
                  </span>
                  {checked ? (
                    <CheckCircleIcon
                      className="w-5 h-5 text-teal-600 top-1 right-1"
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
    </>
  );
};
