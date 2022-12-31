import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";

import { TrashIcon } from "@heroicons/react/20/solid";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import useCart from "@lib/swell/cart/useCart";
import Image from "next/image";
import { formatMoney } from "@lib/utils";
import { useAccount } from "@lib/swell/auth/getUser";
import getCart from "@lib/swell/cart/getCart";
import createCardToken from "@lib/swell/cart/createCardToken";
import submitOrder from "@lib/swell/cart/submitOrder";
import { useRouter } from "next/router";
import ShowSubscription from "../ShowSubscription";
import toast from "react-hot-toast";
import FormInput from "@components/ui/forms/FormInput";
import { ShippingInformation } from "@components/ui/forms";
import AccountInformation from "@components/ui/forms/AccountInformation";
import ActivedCard from "@components/ui/forms/ActivedCard";
import {
  CheckCircleIcon,
  PlusIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import { createNull } from "typescript";
import ActiveAccount from "@components/ui/forms/ActiveAccount";
import { RadioGroup } from "@headlessui/react";
const normalizeAccount = (cart) => {
  const _account = cart?.account;
  let account = {};
  if (_account) {
    account.email = _account.email;
    account.email_optin = _account.email_optin;
    account.password = _account.password;
  }
  return account;
};
const normalizeAddress = (cart) => {
  let address = {};
  const _address = cart?.account?.addresses
    ? cart.account.addresses.results.find((x) => x.active)
    : null;
  if (_address) {
    address.address1 = _address.address1;
    address.address2 = _address.address2;
    address.city = _address.city;
    address.country = _address.country;
    address.firstName = _address.firstName;
    address.lastName = _address.lastName;
    address.phone = _address.phone;
    address.state = _address.state;
    address.zip = _address.zip;
  }
  return address;
};
const normalizeCards = (cart) => {
  const _cards = cart?.account.cards ? cart.account.cards : null;
  let cards = {};
  if (_cards) {
    cards.activeCards = _cards.results
      .filter((x) => x.active)
      .map((card, cardIdx) => {
        return {
          card,
          token: card.token,
          brand: card.brand,
          last4: card.last4,
          expMonth: card.expMonth,
          expYear: card.expYear,
        };
      });
  }
  return cards;
};
const products = [
  {
    id: 1,
    title: "Basic Tee",
    href: "#",
    price: "$32.00",
    color: "Black",
    size: "Large",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/checkout-page-02-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
  },
  // More products...
];
const deliveryMethods = [
  {
    id: 1,
    title: "One time delivery",
    turnaround: "30 - 40 days",
    price: "Free",
  },
  {
    id: 2,
    title: "Subscribe",
    turnaround: "Deliver on your schedule. Cancel anytime.",
    price: "25% discount",
  },
];
const paymentMethods = [
  { id: "account-cards", title: "My cards" },
  { id: "credit-card", title: "Credit card" },
  // { id: "paypal", title: "PayPal" },
  // { id: "etransfer", title: "eTransfer" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// A custom validation function. This must return an object
// which keys are symmetrical to our values/initialValues
const validate = (values) => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = "Required";
  } else if (values.firstName.length > 15) {
    errors.firstName = "Must be 15 characters or less";
  }

  if (!values.lastName) {
    errors.lastName = "Required";
  } else if (values.lastName.length > 20) {
    errors.lastName = "Must be 20 characters or less";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  return errors;
};

const initialValues = {
  // account
  email: "",
  email_optin: false,
  password: "",

  // shipping
  firstName: "",
  lastName: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  zip: "",
  country: "US",
  phone: "",

  // billing
  sameBilling: true, // turn on edit for billing
  "billing-firstName": "",
  "billing-lastName": "",
  "billing-address1": "",
  "billing-address2": "",
  "billing-city": "",
  "billing-state": "",
  "billing-zip": "",
  "billing-country": "US",
  "billing-phone": "",

  // payments
  number: "", // card number
  expiration_date: "",
  cvc: "",

  card: {
    token: "",
  },
  paypal: {
    payer_id: "",
    payment_id: "",
  },
  amazon: {
    access_token: "",
    order_reference_id: "",
  },
  affirm: {
    checkout_token: "",
  },
  activeCards: [],
};
export default function CheckoutForms() {
  const router = useRouter();
  const [applyActiveCard, setApplyActiveCard] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("credit-card");

  const { cart, update, updateQuantity, remove, createNewAccount } = useCart();

  // console.log(accountShipping, accountAccount);
  const initialFormValues = {
    ...initialValues,
  };
  const sendOrder = async () => {
    console.log("send");
    try {
      const order = await submitOrder();
      // Clear the loading toast from before
      toast.dismiss();
      toast.success("Success");
      if (order && order.id) {
        router.push(`/order/${order.id}`);
      } else {
        router.push(`/order`);
      }
    } catch (err) {
      toast.dismiss();

      toast.error(err.message);
    }
  };
  const formik = useFormik({
    initialValues: initialFormValues,
    // validate,
    onSubmit: async (values) => {
      alert("hi");
      toast.loading("Preparing order...");

      // Sanitize
      const ccDetails = values.expiration_date.split("/");
      const exp_month = ccDetails[0] ? parseInt(ccDetails[0]) : 0;
      const exp_year = ccDetails[1] ? parseInt(ccDetails[1]) + 2000 : 0;

      // Build objects
      const buildAccount = {
        email: values.email,
        email_optin: values.email_optin,
        password: values.password,
      };
      const shipping = {
        name: values.firstName + " " + values.lastName,
        address1: values.address1,
        address2: values.address2,
        city: values.city,
        state: values.state,
        zip: values.zip,
        phone: values.phone,
        country: values.country, // use initial values
      };

      const billing = {
        name: !values.sameBilling
          ? values["billing-firstName"] + " " + values["billing-lastName"]
          : shipping["name"],
        address1: !values.sameBilling
          ? values["billing-address1"]
          : shipping["address1"],
        address2: !values.sameBilling
          ? values["billing-address2"]
          : shipping["address2"],
        city: !values.sameBilling ? values["billing-city"] : shipping["city"],
        state: !values.sameBilling
          ? values["billing-state"]
          : shipping["state"],
        zip: !values.sameBilling ? values["billing-zip"] : shipping["zip"],
        phone: !values.sameBilling
          ? values["billing-phone"]
          : shipping["phone"],
        country: !values.sameBilling
          ? values["billing-country"]
          : shipping["country"],
      };
      const payments = {
        card: values.card || null,
        paypal: values.paypal || null,
        amazon: values.amazon || null,
        affirm: values.affirm || null,
      };

      const cardDetails = {
        number: values.number.replace(/\s/g, ""),
        exp_month,
        exp_year,
        cvc: values.cvc,
      };
      // account info
      if (!cart.account) {
        await update({ account: buildAccount, shipping });
      } else {
        await update({ shipping });
      }

      // payment
      if (paymentMethod === "credit-card") {
        // Add new card
        try {
          const response = await createCardToken(cardDetails);
          console.log("new token", response);
          // update billing
          await update({
            billing: {
              card: response,
            },
          });

          await sendOrder();
        } catch (errors) {
          toast.dismiss();
          toast.error(errors.message);
        }
      } else if (paymentMethod === "account-cards") {
        // submit
        // using account cards
        console.log("send");
        await sendOrder();
      }
    },
  });

  const mapObjToFormik = (map) => {
    Object.entries(map).map(([key, val], index) => {
      if (typeof formik.values[key] !== "undefined") {
        //   // if not the same
        if (formik.values[key] !== val) {
          if (val !== createNull) {
            // dont set to null
            formik.setFieldValue(key, val);
          }
        }
      }
    });
  };
  const editForms = () => {
    setUserAccount(null);
    // 2. normalize account from swell to input fields
    const account = normalizeAccount(cart);
    // 3. normalize address from swell store to input forms
    const address = normalizeAddress(cart);
    const cards = normalizeCards(cart);
    if (cards && Object.keys(cards).length > 1) {
      setPaymentMethod("account-cards");
    }

    // spread in user fields to update forms
    const map = !cart
      ? {}
      : {
          ...account,
          ...address,
          ...cards,
        };
    mapObjToFormik(map);
  };
  const resetForms = () => {
    mapObjToFormik(initialFormValues);
    setPaymentMethod("credit-card");
  };
  // const { errors } = formik || null;
  // console.log(formik.values.email);
  // console.log("l", formik.values);
  const ref = useRef(true);
  useEffect(() => {
    // your business logic around when to fetch goes here.

    if (ref.current && cart) {
      ref.current = false;

      // 1. copy account into state userAccount
      if (cart.account) {
        // setUserAccount(cart.account);
      } else {
      }
    }
  }, [cart]);

  const { values, handleSubmit } = formik.values;
  const [userAccount, setUserAccount] = useState(null);
  console.log("v", userAccount);
  const [sameBilling, setSameBilling] = useState(true);

  return (
    <div className="bg-gray-50">
      <div className="max-w-2xl px-4 pt-16 pb-24 mx-auto sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Checkout</h2>

        <form
          onSubmit={formik.handleSubmit}
          className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16"
        >
          <div>
            <div>
              <h2 className="text-lg font-medium text-gray-900">
                {userAccount ? "Welcome back" : "Contact information"}
              </h2>
              {userAccount && (
                <p className="text-base text-gray-700">
                  Using the same details as before?
                </p>
              )}

              {userAccount ? (
                <div className={`motion-fade-in`}>
                  <>
                    <ActiveAccount
                      cards={normalizeCards(cart).activeCards}
                      userAccount={userAccount}
                    />
                    <div className="flex justify-end ">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setUserAccount(null);
                          resetForms();
                        }}
                        className="!outline-none flex items-center inline-block px-8 py-3 mt-6 font-medium text-center text-gray-900 bg-gray-300 border border-transparent rounded-md hover:bg-gray-200"
                      >
                        New payment <PlusIcon className={"w-6 ml-4 -mr-2"} />
                      </button>
                    </div>
                  </>
                </div>
              ) : (
                <>
                  {cart?.account ? (
                    <div className={`space-y-0`}>
                      {cart.account.name && (
                        <div className={`text-base`}>{cart.account?.name}</div>
                      )}
                      {cart.account.email && (
                        <div className={`text-sm text-gray-600`}>
                          {" "}
                          {cart.account?.email}
                        </div>
                      )}
                    </div>
                  ) : (
                    <AccountInformation formik={formik} />
                  )}
                  {cart?.account && (
                    <div className="flex justify-end ">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setUserAccount(cart.account);
                        }}
                        className="inline-block px-8 py-3 mt-6 font-medium text-center text-gray-900 bg-gray-300 border border-transparent rounded-md hover:bg-gray-200"
                      >
                        Use account details
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>

            {!userAccount && (
              <div className={`pt-10 mt-10 border-t border-gray-200`}>
                <ShippingInformation
                  setSameBilling={setSameBilling}
                  sameBilling={sameBilling}
                  formik={formik}
                />
              </div>
            )}

            {/* <div className="pt-10 mt-10 border-t border-gray-200">
              <RadioGroup
                value={selectedDeliveryMethod}
                onChange={setSelectedDeliveryMethod}
              >
                <RadioGroup.Label className="text-lg font-medium text-gray-900">
                  Delivery method
                </RadioGroup.Label>

                <div className="grid grid-cols-1 mt-4 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  {deliveryMethods.map((deliveryMethod) => (
                    <RadioGroup.Option
                      key={deliveryMethod.id}
                      value={deliveryMethod}
                      className={({ checked, active }) =>
                        classNames(
                          checked ? "border-transparent" : "border-gray-300",
                          active ? "ring-2 ring-teal-500" : "",
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
                                className="block text-sm font-medium text-gray-900"
                              >
                                {deliveryMethod.title}
                              </RadioGroup.Label>
                              <RadioGroup.Description
                                as="span"
                                className="flex items-center mt-1 text-sm text-gray-500"
                              >
                                {deliveryMethod.turnaround}
                              </RadioGroup.Description>
                              <RadioGroup.Description
                                as="span"
                                className="pt-6 mt-auto text-sm font-medium text-gray-900"
                              >
                                {deliveryMethod.price}
                              </RadioGroup.Description>
                            </span>
                          </span>
                          {checked ? (
                            <CheckCircleIcon
                              className="w-5 h-5 text-teal-600"
                              aria-hidden="true"
                            />
                          ) : null}
                          <span
                            className={classNames(
                              active ? "border" : "border-2",
                              checked
                                ? "border-teal-500"
                                : "border-transparent",
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
            </div> */}

            {/* Payment */}
            {!userAccount && (
              <div className="pt-10 mt-10 border-t border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Payment</h2>
                <fieldset className="mt-4">
                  <legend className="sr-only">Payment type</legend>
                  <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                    {paymentMethods
                      .filter((x) => {
                        const hasActiveCards =
                          values?.activeCards && values.activeCards.length > 0;
                        return hasActiveCards
                          ? hasActiveCards
                          : x.id !== "account-cards";
                      })
                      .map((pay, paymentMethodIdx) => (
                        <div
                          onClick={() => {
                            setPaymentMethod(pay.id);
                          }}
                          key={pay.id}
                          className="flex items-center"
                        >
                          <input
                            id={pay.id}
                            name="payment-type"
                            type="radio"
                            defaultChecked={pay.id === paymentMethod}
                            className="w-4 h-4 text-teal-600 border-gray-300 focus:ring-teal-500"
                          />

                          <label
                            htmlFor={pay.id}
                            className="block ml-3 text-sm font-medium text-gray-700"
                          >
                            {pay.title}
                          </label>
                        </div>
                      ))}
                  </div>
                </fieldset>
                {values?.activeCards &&
                  values.activeCards.length > 0 &&
                  paymentMethod === "account-cards" && (
                    <div className={`mt-6`}>
                      {values?.activeCards?.map((card, cardIdx) => {
                        return (
                          <ActivedCard
                            basic
                            card={card}
                            key={cardIdx + "active-card"}
                          />
                        );
                      })}
                    </div>
                  )}
                {paymentMethod === "credit-card" && (
                  <div className="grid grid-cols-4 mt-6 gap-y-6 gap-x-4">
                    <div className="col-span-4">
                      <FormInput
                        formik={formik}
                        label={`Card number`}
                        type={`text`}
                        id={`number`}
                        autoComplete={`cc-number`}
                        className={``}
                      />
                    </div>

                    <div className="col-span-3 ">
                      <FormInput
                        formik={formik}
                        label={`Expiration date (MM/YY)`}
                        type={`text`}
                        id={`expiration_date`}
                        autoComplete={`cc-exp`}
                        className={``}
                      />
                    </div>

                    <div>
                      <FormInput
                        formik={formik}
                        label={`CVC`}
                        type={`text`}
                        id={`cvc`}
                        autoComplete={`csc`}
                        className={``}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Order summary */}
          <div className="mt-10 lg:mt-0">
            <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

            <div className="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm">
              <h3 className="sr-only">Items in your cart</h3>
              <ul role="list" className="divide-y divide-gray-200">
                {cart?.items?.map((item, itemIdx) => {
                  const {
                    product,
                    id,
                    quantity,
                    price,
                    options,
                    purchaseOption,
                  } = item || {};

                  return (
                    <li key={id} className="flex px-4 py-6 sm:px-6">
                      <div className="relative flex-shrink-0 w-20">
                        <Image
                          src={product.images[0].file.url}
                          alt={product.name + " cart item"}
                          className="object-cover rounded-md "
                          layout="fill"
                        />
                      </div>

                      <div className="flex flex-col flex-1 ml-6">
                        <div className="flex">
                          <div className="flex-1 min-w-0 text-sm">
                            <h4 className="text-sm">
                              <a
                                href={product.href}
                                className="font-medium text-gray-700 hover:text-gray-800"
                              >
                                {product.name}
                              </a>
                            </h4>
                            <p className="mt-1 text-sm text-gray-500">
                              {options?.map((opt, optIdx) => {
                                return (
                                  <div
                                    key={optIdx + "optIdx"}
                                    className={`flex space-x-1`}
                                  >
                                    <div>{opt.value}</div>
                                    <div>{opt.name}</div>
                                  </div>
                                );
                              })}
                            </p>
                            <ShowSubscription purchaseOption={purchaseOption} />
                          </div>

                          <div className="flex-shrink-0 flow-root ml-4">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                remove(id);
                              }}
                              className="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500"
                            >
                              <span className="sr-only">Remove</span>
                              <TrashIcon
                                className="w-5 h-5"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>

                        <div className="flex items-end justify-between flex-1 pt-2">
                          <div className={`flex flex-col`}>
                            {product.sale && (
                              <p className="mt-1 -mb-1 text-xs font-medium line-through text-rose-400 ">
                                {formatMoney(product.price)}
                              </p>
                            )}
                            <p className="mt-1 text-sm font-medium text-gray-900">
                              {formatMoney(price)}
                            </p>
                          </div>

                          <div className="ml-4">
                            <label htmlFor="quantity" className="sr-only">
                              Quantity
                            </label>
                            <select
                              className="text-base font-medium text-left text-gray-700 border border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 sm:text-sm"
                              onChange={(e) => {
                                e.preventDefault();
                                updateQuantity(id, e.target.value);
                              }}
                              id={`quantity-${id}`}
                              name={`quantity-${id}`}
                              defaultValue={quantity}
                            >
                              <option value={1}>1</option>
                              <option value={2}>2</option>
                              <option value={3}>3</option>
                              <option value={4}>4</option>
                              <option value={5}>5</option>
                              <option value={6}>6</option>
                              <option value={7}>7</option>
                              <option value={8}>8</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <dl className="px-4 py-6 space-y-6 border-t border-gray-200 sm:px-6">
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Subtotal</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {formatMoney(cart?.subTotal)}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Shipping</dt>
                  <dd className="text-sm font-medium text-gray-900">FREE</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Taxes</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    Calculate based on shipping
                  </dd>
                </div>
                <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                  <dt className="text-base font-medium">Total</dt>
                  <dd className="text-base font-medium text-gray-900">
                    {formatMoney(cart?.grandTotal)}
                  </dd>
                </div>
              </dl>

              <div className="px-4 py-6 border-t border-gray-200 sm:px-6">
                <button
                  type="submit"
                  className="w-full px-4 py-3 text-base font-medium text-white bg-teal-600 border border-transparent rounded-md shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Confirm order
                </button>
                {/* <a href={cart?.checkoutUrl}>
                  <button
                    type="button"
                    className="w-full px-4 py-3 text-base font-medium text-white bg-teal-600 border border-transparent rounded-md shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                  >
                    Pay
                  </button>
                </a> */}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
