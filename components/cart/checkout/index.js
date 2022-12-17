import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon, TrashIcon } from "@heroicons/react/20/solid";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import useCart from "@lib/swell/cart/useCart";
import Image from "next/image";
import { formatMoney } from "@lib/utils";
import FormDropdown from "@components/ui/forms/FormDropdown";
import getUser, { useAccount } from "@lib/swell/auth/getUser";
import getCart from "@lib/swell/cart/getCart";
import createCardToken from "@lib/swell/cart/createCardToken";
import submitOrder from "@lib/swell/cart/submitOrder";
import { useRouter } from "next/router";

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
  // country: "US",
  phone: "",

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
};
export default function CheckoutForms() {
  const { router } = useRouter();
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(
    deliveryMethods[0]
  );
  const { cart, update, updateQuantity, remove } = useCart();

  const account = useAccount();
  const accountShipping = cart?.shipping || {};
  const accountAccount = cart?.account || {};
  const accountCard = cart?.card || {};

  // console.log(accountShipping, accountAccount);
  const initialFormValues = {
    ...initialValues,
    ...accountShipping,
    ...accountAccount,
    ...accountCard,
  };
  const formik = useFormik({
    initialValues: initialFormValues,
    validate,
    onSubmit: async (values) => {
      // Sanitize
      const ccDetails = values.expiration_date.split("/");
      const exp_month = ccDetails[0] ? parseInt(ccDetails[0]) : 0;
      const exp_year = ccDetails[1] ? parseInt(ccDetails[1]) + 2000 : 0;

      // Build objects
      const account = {
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
        country: "US", // use initial values
      };
      const payments = {
        card: values.card || null,
        paypal: values.paypal || null,
        amazon: values.amazon || null,
        affirm: values.affirm || null,
      };

      const cardDetails = {
        number: values.number,
        exp_month,
        exp_year,
        cvc: values.cvc,
      };
      // updateCart
      update({ shipping });
      // console.log(cardDetails);
      try {
        const response = await createCardToken(cardDetails);
        console.log(response);
        update({
          billing: {
            card: response,
          },
        });
      } catch (errors) {
        console.log(errors);
      }

      try {
        const order = await submitOrder();

        console.log("order", order);
      } catch (err) {
        console.log(err);
      }
      // console.log(exp_year);
      // alert(JSON.stringify(values, null, 2));
    },
  });
  // const { errors } = formik || null;
  // console.log(formik.values.email);
  console.log(cart);
  // console.log("l", formik.values);
  useEffect(() => {
    let isCurrent = true;
    // your business logic around when to fetch goes here.

    getCart().then((cart) => {
      if (!cart) return null;
      // console.log(user);
      // traverse user fields
      const map = !cart
        ? {}
        : {
            ...cart.shipping,
            ...cart.account,
          };
      Object.entries(map).map(([key, val], index) => {
        // if exists
        if (typeof formik.values[key] !== "undefined") {
          //   // if not the same
          // console.log(key, typeof formik.values[key]);
          if (formik.values[key] !== val) {
            if (val) {
              // dont set to null
              formik.setFieldValue(key, val);
            }
          }
        }
      });
    });

    return () => {
      isCurrent = false;
    };
  }, []);

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
                Contact information
              </h2>

              <div className={`space-y-6`}>
                <FormInput
                  formik={formik}
                  label={`Email`}
                  type={`email`}
                  id={`email`}
                  autoComplete={`email`}
                  className={`mt-4`}
                />
                <FormInput
                  formik={formik}
                  label={`Password (optional)`}
                  type={`password`}
                  id={`password`}
                  autoComplete={`password`}
                  className={`mt-4`}
                  msg={
                    "Create an account by adding a password, or leave it blank to checkout as guest."
                  }
                />
              </div>
            </div>

            <div className="pt-10 mt-10 border-t border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                Shipping information
              </h2>

              <div className="grid grid-cols-1 mt-4 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <FormInput
                  formik={formik}
                  label={`First name`}
                  type={`text`}
                  id={`firstName`}
                  autoComplete={`given-name`}
                  className={``}
                />

                <FormInput
                  formik={formik}
                  label={`Last name`}
                  type={`text`}
                  id={`lastName`}
                  autoComplete={`family-name`}
                  className={``}
                />

                {/* <div className="sm:col-span-2">
                  <FormInput
                    formik={formik}
                    label={`Company`}
                    type={`text`}
                    id={`company`}
                    autoComplete={``}
                    className={``}
                  />
                </div> */}

                <div className="sm:col-span-2">
                  <FormInput
                    formik={formik}
                    label={`Address`}
                    type={`text`}
                    id={`address1`}
                    autoComplete={``}
                    className={``}
                  />
                </div>

                <div className="sm:col-span-2">
                  <FormInput
                    formik={formik}
                    label={`Apartment, suite, etc.`}
                    type={`text`}
                    id={`address2`}
                    autoComplete={``}
                    className={``}
                  />
                </div>

                <div>
                  <FormInput
                    formik={formik}
                    label={`City`}
                    type={`text`}
                    id={`city`}
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
                    id={`state`}
                    autoComplete={`address-level1`}
                    className={``}
                  />
                </div>

                <div>
                  <FormInput
                    formik={formik}
                    label={`Postal code`}
                    type={`text`}
                    id={`zip`}
                    autoComplete={`postal-code`}
                    className={``}
                  />
                </div>

                <div className="sm:col-span-2">
                  <FormInput
                    formik={formik}
                    label={`Phone`}
                    type={`text`}
                    id={`phone`}
                    autoComplete={`tel`}
                    className={``}
                  />
                </div>
              </div>
            </div>

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
            <div className="pt-10 mt-10 border-t border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Payment</h2>

              <fieldset className="mt-4">
                <legend className="sr-only">Payment type</legend>
                <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                  {paymentMethods.map((paymentMethod, paymentMethodIdx) => (
                    <div key={paymentMethod.id} className="flex items-center">
                      {/* {paymentMethodIdx === 0 ? (
                        <input
                          id={paymentMethod.id}
                          name="payment-type"
                          type="radio"
                          defaultChecked
                          className="w-4 h-4 text-teal-600 border-gray-300 focus:ring-teal-500"
                        />
                      ) : (
                        <input
                          id={paymentMethod.id}
                          name="payment-type"
                          type="radio"
                          className="w-4 h-4 text-teal-600 border-gray-300 focus:ring-teal-500"
                        />
                      )} */}
                      <input
                        id={paymentMethod.id}
                        name="payment-type"
                        type="radio"
                        className="w-4 h-4 text-teal-600 border-gray-300 focus:ring-teal-500"
                      />

                      <label
                        htmlFor={paymentMethod.id}
                        className="block ml-3 text-sm font-medium text-gray-700"
                      >
                        {paymentMethod.title}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>

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

                {/* <div className="col-span-4">
                  <FormInput
                    formik={formik}
                    label={`Name on card`}
                    type={`text`}
                    id={`card-number`}
                    autoComplete={`cc-name`}
                    className={``}
                  />
                </div> */}

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
            </div>
          </div>

          {/* Order summary */}
          <div className="mt-10 lg:mt-0">
            <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

            <div className="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm">
              <h3 className="sr-only">Items in your cart</h3>
              <ul role="list" className="divide-y divide-gray-200">
                {cart?.items?.map((item, itemIdx) => {
                  const { product, id, quantity, price } = item || {};
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
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm">
                              <a
                                href={product.href}
                                className="font-medium text-gray-700 hover:text-gray-800"
                              >
                                {product.name}
                              </a>
                            </h4>
                            <p className="mt-1 text-sm text-gray-500">
                              {"product.options"}
                            </p>
                            {/* <p className="mt-1 text-sm text-gray-500">
                              {"product.size"}
                            </p> */}
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
{
  /* <FormInput
label={``}
type={``}
id={``}
name={``}
autoComplete={``}

/> */
}
const FormInput = ({
  label,
  type,
  id,
  autoComplete = "",
  formik,
  className,
  msg,
}) => {
  return (
    <div className={`relative ${className}`}>
      <label
        htmlFor="email-address"
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="relative mt-1">
        <input
          type={type}
          id={id}
          name={id}
          autoComplete={autoComplete}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values[id]}
          className={`block w-full border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm 
                    ${
                      formik.touched[id] &&
                      formik.errors[id] &&
                      "!border-rose-500 focus:!ring-rose-300"
                    }
                    `}
        />
        {formik.touched[id] && formik.errors[id] && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <ExclamationCircleIcon
              className="w-5 h-5 text-rose-300"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
      {msg && <p className={`text-xs text-gray-500 max-w-sm mt-1`}>{msg}</p>}

      {formik.touched[id] && formik.errors[id] && (
        <p className="mt-2 text-sm text-rose-500" id="email-error">
          {formik.errors[id]}
        </p>
      )}
    </div>
  );
};
