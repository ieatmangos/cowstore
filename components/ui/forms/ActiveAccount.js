import { TruckIcon } from "@heroicons/react/20/solid";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import React from "react";
import ActivedCard from "./ActivedCard";

export default function ActiveAccount({ userAccount, cards }) {
  return (
    <div
      className={`relative ring ring-teal-500 mt-6 px-4 py-4 rounded-md bg-white shadow-md grid grid-cols-2`}
    >
      <CheckCircleIcon
        className={`absolute top-2 right-3 w-8 text-teal-600  rounded-full flex justify-center items-center`}
      />
      <div className={`space-y-0`}>
        {userAccount?.name && (
          <div className={`text-base`}>{userAccount?.name}</div>
        )}
        {userAccount?.email && (
          <div className={`text-sm text-gray-600`}> {userAccount?.email}</div>
        )}
      </div>

      <div className={`-mt-2 text-sm`}>
        {/* <ActivedCard
          basic
          card={normalizeCards(cart).activeCards}
          // key={cardIdx + "active-card"}
        /> */}
        {cards.map((card, cardIdx) => {
          return (
            <ActivedCard basic card={card} key={cardIdx + "active-card"} />
          );
        })}
      </div>

      <div className={`col-span-full mt-4 space-y-0 text-sm text-gray-600`}>
        {userAccount?.addresses?.results.map((address, addressIdx) => {
          return (
            <div
              key={`${addressIdx}-address-option`}
              className={`flex space-x-1 justify-start items-center`}
            >
              <TruckIcon className={`w-6`} />
              <div className={``}>{address.address1}</div>
              <div className={``}>{address.address2}</div>
              <div className={``}>
                {address.city}, {address.state} {address.zip}
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setUserAccount(null);
                  editForms();
                }}
                className={` underline !ml-auto`}
              >
                Edit
              </button>
            </div>
          );
        })}
      </div>
      <div></div>
    </div>
  );
}
