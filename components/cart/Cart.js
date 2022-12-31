import { Fragment, useContext, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import useCart from "@lib/swell/cart/useCart";
import { formatMoney } from "@lib/utils";
import Image from "next/image";
import dynamic from "next/dynamic";
import EmptyCartSuggestions from "./EmptyCartSuggestions";
import { useRouter } from "next/router";
import PurchaseOptions from "@components/product/Options";
import ShowSubscription from "./ShowSubscription";
// const EmptyCartSuggestions = dynamic(() => import("./EmptyCartSuggestions"), {
//   ssr: false,
// });

export default function Cart() {
  const [open, setOpen] = useState(false);
  const { cart, emptyCart, updateQuantity, remove } = useCart();
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/cart/checkout`);
    // router.push(`/cart/checkout?cart=${cart.id}`);
    setOpen(false);
    // handleSubmit
  };
  // console.log(cart);

  return (
    <>
      <div
        role="button"
        onClick={() => {
          setOpen((c) => !c);
        }}
        className={`flex items-center p-2 -m-2 group
     sticky top-0
        `}
      >
        <ShoppingCartIcon
          className={`flex-shrink-0 w-6 h-6  group-hover:text-gray-500
          ${emptyCart ? "text-gray-400" : " text-teal-900 fill-teal-300"}
          `}
          aria-hidden="true"
        />
        <span
          className={`ml-2 text-sm font-medium ${
            emptyCart ? "text-gray-700" : "text-teal-900"
          } group-hover:text-gray-800`}
        >
          {cart ? cart.itemQuantity : 0}
        </span>
        <span className="sr-only">items in cart, view bag</span>
      </div>
      {open && (
        <Transition.Root show={open} as={Fragment}>
          <Dialog as="div" className="relative z-50" onClose={setOpen}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="hidden sm:fixed sm:inset-0 sm:block sm:bg-gray-500 sm:bg-opacity-75 sm:transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex items-stretch justify-center min-h-full text-center sm:items-center sm:px-6 lg:px-8">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-105"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-105"
                >
                  <Dialog.Panel className="flex w-full max-w-3xl text-base text-left transition transform sm:my-8">
                    <form
                      onSubmit={handleSubmit}
                      className="relative flex flex-col w-full pt-6 pb-8 overflow-hidden bg-white sm:rounded-lg sm:pb-6 lg:py-8"
                    >
                      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8">
                        <h2 className="text-lg font-medium text-gray-900">
                          Shopping Cart
                        </h2>
                        <button
                          type="button"
                          className="text-gray-400 hover:text-gray-500"
                          onClick={() => setOpen(false)}
                        >
                          <span className="sr-only">Close</span>
                          <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                        </button>
                      </div>
                      {!emptyCart && (
                        <>
                          <section aria-labelledby="cart-heading">
                            <h2 id="cart-heading" className="sr-only">
                              Items in your shopping cart
                            </h2>

                            <ul
                              role="list"
                              className="px-4 divide-y divide-gray-200 sm:px-6 lg:px-8"
                            >
                              {cart?.items.map((item, productIdx) => {
                                const {
                                  product,
                                  id,
                                  quantity,
                                  priceTotal,
                                  purchaseOption,
                                  options,
                                } = item;
                                return (
                                  <li
                                    key={product.id + productIdx}
                                    className="flex py-8 text-sm sm:items-center"
                                  >
                                    <div className={`relative w-24 h-24`}>
                                      <Image
                                        layout="fill"
                                        src={product.images[0].file.url}
                                        alt={"Cart item: " + product.name}
                                        className="flex-none object-cover object-center border border-gray-200 rounded-lg"
                                      />
                                    </div>
                                    <div className="grid items-start flex-auto grid-cols-1 grid-rows-1 ml-4 gap-y-3 gap-x-5 sm:ml-6 sm:flex sm:items-center sm:gap-0">
                                      <div className="flex-auto row-end-1 sm:pr-6">
                                        <h3 className="font-medium text-gray-900">
                                          <a href={product.href}>
                                            {product.name}
                                          </a>
                                        </h3>
                                        <p className="mt-1 text-gray-500">
                                          {options?.map((i) => {
                                            return (
                                              <span key={i.id}>
                                                {i.value} {i.name}{" "}
                                                <span className={`block`}>
                                                  {i.shipmentWeight} lbs
                                                </span>
                                              </span>
                                            );
                                          })}
                                        </p>
                                        <ShowSubscription
                                          purchaseOption={purchaseOption}
                                        />
                                      </div>
                                      <p className="row-span-2 row-end-2 font-medium text-gray-900 sm:order-1 sm:ml-6 sm:w-1/3 sm:flex-none sm:text-right">
                                        {formatMoney(priceTotal)}
                                      </p>
                                      <div className="flex items-center sm:block sm:flex-none sm:text-center">
                                        <label
                                          htmlFor={`quantity-${productIdx}`}
                                          className="sr-only"
                                        >
                                          Quantity, {product.name}
                                        </label>
                                        <select
                                          onChange={(e) => {
                                            e.preventDefault();
                                            updateQuantity(id, e.target.value);
                                          }}
                                          id={`quantity-${productIdx}`}
                                          name={`quantity-${productIdx}`}
                                          defaultValue={quantity}
                                          className="block max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 sm:text-sm"
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

                                        <button
                                          onClick={(e) => {
                                            e.preventDefault();
                                            remove(id);
                                          }}
                                          type="button"
                                          className="ml-4 font-medium text-teal-600 hover:text-teal-500 sm:ml-0 sm:mt-2"
                                        >
                                          <span>Remove</span>
                                        </button>
                                      </div>
                                    </div>
                                  </li>
                                );
                              })}
                            </ul>
                          </section>

                          <section
                            aria-labelledby="summary-heading"
                            className="mt-auto sm:px-6 lg:px-8"
                          >
                            <div className="p-6 bg-gray-50 sm:rounded-lg sm:p-8">
                              <h2 id="summary-heading" className="sr-only">
                                Order summary
                              </h2>

                              <div className="flow-root">
                                <dl className="-my-4 text-sm divide-y divide-gray-200">
                                  <div className="flex items-center justify-between py-4">
                                    <dt className="text-gray-600">Subtotal</dt>
                                    <dd className="font-medium text-gray-900">
                                      {formatMoney(cart?.subTotal || 0)}
                                    </dd>
                                  </div>
                                  <div className="flex items-center justify-between py-4">
                                    <dt className="text-gray-600">Shipping</dt>
                                    <dd className="font-medium text-gray-900">
                                      FREE
                                    </dd>
                                  </div>
                                  <div className="flex items-center justify-between py-4">
                                    <dt className="text-gray-600">Tax</dt>
                                    <dd className="font-medium text-gray-900">
                                      {/* {formatMoney(cart?.taxTotal || 0)} */}
                                      Calculated at next step
                                    </dd>
                                  </div>
                                  <div className="flex items-center justify-between py-4">
                                    <dt className="text-base font-medium text-gray-900">
                                      Order total
                                    </dt>
                                    <dd className="text-base font-medium text-gray-900">
                                      {formatMoney(cart?.grandTotal || 0)}
                                    </dd>
                                  </div>
                                </dl>
                              </div>
                            </div>
                          </section>
                        </>
                      )}
                      {emptyCart && (
                        <section
                          className={`px-4 sm:px-0`}
                          aria-labelledby="empty-cart-suggestions"
                        >
                          <h2 id="empty-cart-suggestions" className="sr-only">
                            Empty cart, may we suggest some of our favorite
                            packages
                          </h2>

                          <EmptyCartSuggestions />
                        </section>
                      )}

                      <div className="flex justify-end px-4 mt-8 sm:px-6 lg:px-8">
                        <button
                          disabled={emptyCart}
                          type="submit"
                          className={`px-4 py-2 text-sm font-medium text-white bg-teal-600 border border-transparent rounded-md shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-gray-50
                        
                        ${emptyCart ? "!bg-gray-200 !text-white" : ""}
                        `}
                        >
                          Continue to Payment
                        </button>
                      </div>
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      )}
    </>
  );
}
