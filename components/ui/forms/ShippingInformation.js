import { PlusIcon } from "@heroicons/react/24/outline";
import cn from "@utils/cn";
import React, { useState } from "react";
import FormInput from "./FormInput";

export default function ShippingInformation({
  formik,
  setSameBilling,
  sameBilling,
}) {
  const [selectedTab, setSelectedTag] = useState("Shipping");

  return (
    <div className="">
      <h2 className="text-lg font-medium text-gray-900">
        {selectedTab === "Shipping"
          ? "Shipping information"
          : "  Billing information"}
      </h2>

      <Tabs setSelectedTag={setSelectedTag} selectedTab={selectedTab} />
      {/* <ShippingForms formik={formik} /> */}

      {selectedTab === "Shipping" ? (
        <>
          <ShippingForms formik={formik} />
        </>
      ) : (
        <div className={` text-sm text-gray500`}>
          {sameBilling && (
            <>
              {/* <p className={`mt-6 mb-2 text-gray-500`}>Optional</p> */}
              {/* <span className={`mt-6 inline-flex mr-2 text-gray-500`}>
                Optional
              </span> */}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setSameBilling(false);
                }}
                className={`mt-6 mb-72 inline-flex px-4 py-2 rounded-full bg-rose-100 text-rose-800 flex items-center `}
              >
                Use different billing address{" "}
                <PlusIcon
                  className={`w-6 bg-rose-50 rounded-full ml-4 -mr-2`}
                />
              </button>
            </>
          )}
          {!sameBilling && <ShippingForms formik={formik} isBilling />}
        </div>
      )}
    </div>
  );
}

const ShippingForms = ({ formik, isBilling }) => {
  return (
    <div className="grid grid-cols-1 mt-4 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
      <FormInput
        formik={formik}
        label={`First name`}
        type={`text`}
        id={`${isBilling ? "billing-" : ""}firstName`}
        autoComplete={`given-name`}
        className={``}
      />

      <FormInput
        formik={formik}
        label={`Last name`}
        type={`text`}
        id={`${isBilling ? "billing-" : ""}lastName`}
        autoComplete={`family-name`}
        className={``}
      />

      <div className="sm:col-span-2">
        <FormInput
          formik={formik}
          label={`Address`}
          type={`text`}
          id={`${isBilling ? "billing-" : ""}address1`}
          autoComplete={``}
          className={``}
        />
      </div>

      <div className="sm:col-span-2">
        <FormInput
          formik={formik}
          label={`Apartment, suite, etc.`}
          type={`text`}
          id={`${isBilling ? "billing-" : ""}address2`}
          autoComplete={``}
          className={``}
        />
      </div>

      <div>
        <FormInput
          formik={formik}
          label={`City`}
          type={`text`}
          id={`${isBilling ? "billing-" : ""}city`}
          autoComplete={`address-level2`}
          className={``}
        />
      </div>

      <div>
        <label
          htmlFor="country"
          className="block text-sm font-medium text-gray-700"
        >
          Country
        </label>
        <div className="mt-1">
          <select
            id="country"
            name="country"
            autoComplete="country-name"
            className="block w-full border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
          >
            <option>United States</option>
          </select>
        </div>
      </div>

      <div>
        <FormInput
          formik={formik}
          label={`State / Province`}
          type={`text`}
          id={`${isBilling ? "billing-" : ""}state`}
          autoComplete={`address-level1`}
          className={``}
        />
      </div>

      <div>
        <FormInput
          formik={formik}
          label={`Postal code`}
          type={`text`}
          id={`${isBilling ? "billing-" : ""}zip`}
          autoComplete={`postal-code`}
          className={``}
        />
      </div>

      <div className="sm:col-span-2">
        <FormInput
          formik={formik}
          label={`Phone`}
          type={`text`}
          id={`${isBilling ? "billing-" : ""}phone`}
          autoComplete={`tel`}
          className={``}
        />
      </div>
    </div>
  );
};

const tabs = [
  { name: "Shipping", href: "#", current: true },
  { name: "Billing", href: "#", current: false },
];
const Tabs = ({ selectedTab, setSelectedTag }) => {
  return (
    <div className="relative pb-5 border-b border-gray-200 sm:pb-0">
      <div className="mt-4">
        <div className="block">
          <nav className="flex -mb-px space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                type="button"
                onClick={() => {
                  setSelectedTag(tab.name);
                }}
                className={cn(
                  selectedTab === tab.name
                    ? "border-rose-500 text-rose-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                  "whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm"
                )}
                aria-current={selectedTab === tab.name ? "page" : undefined}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};
