import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/20/solid";

import { Fragment, useEffect, useState } from "react";
import {
  Disclosure,
  Menu,
  RadioGroup,
  Switch,
  Transition,
} from "@headlessui/react";
import {
  Cog6ToothIcon,
  GiftIcon,
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
  TruckIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import {
  Bars3Icon,
  BellIcon,
  CogIcon,
  CreditCardIcon,
  KeyIcon,
  SquaresPlusIcon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { PlayIcon, RectangleStackIcon } from "@heroicons/react/24/outline";
import PageTitle from "@components/ui/PageTitle";
import { swellStore } from "@lib/swell";
import AccountInformation from "@components/ui/forms/AccountInformation";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import FormInput from "@components/ui/forms/FormInput";
import { ShippingInformation } from "@components/ui/forms";
import OrdersList from "@components/orders/OrdersList";
import ActiveAccount from "@components/ui/forms/ActiveAccount";
import Link from "next/link";
import Image from "next/image";
import SubscriptionsPage from "./SubscriptionsPage";

const navigation = [
  { name: "Account", id: "account", href: "#", icon: UserIcon, current: false },
  {
    name: "Orders",
    id: "orders",
    href: "#",
    icon: RectangleStackIcon,
    current: false,
  },
  {
    name: "Subscriptions",
    id: "subscriptions",
    href: "#",
    icon: PlayIcon,
    current: false,
  },
];
const plans = [
  {
    name: "Startup",
    priceMonthly: 29,
    priceYearly: 290,
    limit: "Up to 5 active job postings",
  },
  {
    name: "Business",
    priceMonthly: 99,
    priceYearly: 990,
    limit: "Up to 25 active job postings",
  },
  {
    name: "Enterprise",
    priceMonthly: 249,
    priceYearly: 2490,
    limit: "Unlimited active job postings",
  },
];
const payments = [
  {
    id: 1,
    date: "1/1/2020",
    datetime: "2020-01-01",
    description: "Business Plan - Annual Billing",
    amount: "CA$109.00",
    href: "#",
  },
  // More payments...
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function UserAccount() {
  const [data, setData] = useState({
    user: null,
    orders: null,
    subscriptions: null,
  });
  const orders = data?.orders?.results || null;

  const getUserData = async () => {
    const user = await swellStore("account", "get", { expand: ["shipping"] });
    const orders = await swellStore("account", "getOrders");
    const addresses = await swellStore("account", "listAddresses");
    const subscriptions = await swellStore("subscriptions", "list");
    setData({ user, orders, subscriptions, addresses });
  };
  const [page, setPage] = useState("account");
  const [selectedPlan, setSelectedPlan] = useState(plans[1]);
  const [annualBillingEnabled, setAnnualBillingEnabled] = useState(true);
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <>
      <PageTitle
        title={"Welcome back"}
        msg={data.user?.name || data.user?.email || ""}
      />
      <div className="h-full">
        <main className="pb-10 mx-auto max-w-7xl lg:pb-12 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
            <aside className="px-2 py-6 sm:px-6 lg:col-span-3 lg:py-0 lg:px-0">
              <nav className="space-y-1">
                {navigation.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setPage(item.id);
                    }}
                    className={classNames(
                      item.id === page
                        ? " bg-teal-100 text-teal-900 "
                        : " text-gray-900 hover:text-gray-900 hover:bg-gray-50",
                      "group w-full relative rounded-md  px-3 py-2 flex items-center text-sm font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    <item.icon
                      className={classNames(
                        item.id === page
                          ? "text-teal-700"
                          : "text-gray-400 group-hover:text-gray-500",
                        "flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                      )}
                      aria-hidden="true"
                    />
                    {/* {data[item.id] && (
                      <span className="flex items-center justify-center w-6 h-6 p-1 mr-2 text-sm text-center text-teal-900 bg-teal-100 rounded-full">
                        {data[item.id].count}
                      </span>
                    )} */}

                    <span className="truncate ">{item.name}</span>
                    <span
                      className={classNames(
                        item.id === page ? "text-teal-700" : "text-gray-500",
                        data[item.id] ? "" : "opacity-0",
                        "ml-auto text-sm "
                      )}
                    >
                      {data[item.id] ? data[item.id].count : "0"}
                    </span>
                  </button>
                ))}
              </nav>
            </aside>

            {/* Payment details */}
            <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
              {page === "account" ? (
                <>
                  <Address user={data.user} addresses={data.addresses} />
                  <PasswordGroup user={data.user} />
                </>
              ) : null}
              {page === "orders" ? <OrdersList orders={orders} /> : null}
              {page === "subscriptions" ? (
                <SubscriptionsPage
                  subscriptions={data?.subscriptions?.results}
                />
              ) : null}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

const Account = () => {
  const formik = useFormik({
    initialValues: {
      // account
      email: "",
      email_optin: false,
      password: "",
    },
    // validate,
    onSubmit: async (values) => {
      toast.loading("Preparing order...");
      toast.dismiss();
      toast.success();
    },
  });
  return (
    <section aria-labelledby="account-details-heading">
      <form action="#" method="POST">
        <div className="shadow sm:overflow-hidden sm:rounded-md">
          <div className="px-4 py-6 bg-white sm:p-6">
            <div>
              <h2
                id="account-details-heading"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                Account details
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Update your account information.
              </p>
            </div>
            <div className={`space-y-6 mt-6`}>
              <FormInput
                formik={formik}
                label={`Email`}
                type={`email`}
                id={`email`}
                autoComplete={`email`}
                className={`mt-4`}
              />
              <div className={`grid sm:grid-cols-2 gap-y-6 gap-4`}>
                <FormInput
                  formik={formik}
                  label={`First name`}
                  type={`text`}
                  id={`firstName`}
                  autoComplete={`given-name`}
                  className={`mt-4`}
                />
                <FormInput
                  formik={formik}
                  label={`Last name`}
                  type={`text`}
                  id={`lastName`}
                  autoComplete={`family-name`}
                  className={`mt-4`}
                />
              </div>
            </div>
          </div>
          <div className="px-4 py-3 text-right bg-gray-50 sm:px-6">
            <button
              type="submit"
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-gray-800 border border-transparent rounded-md shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

const Address = ({ user, addresses }) => {
  const formik = useFormik({
    initialValues: {
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
    },
    // validate,
    onSubmit: async (values) => {
      toast.loading("");
      toast.dismiss();
      toast.success();
    },
  });
  const [edit, setEdit] = useState(false);
  return (
    <DisplayOrEdit edit={edit} setEdit={setEdit} formik={formik}>
      {!edit ? (
        <div className={`space-y-1`}>
          <div className={`text-lg font-medium flex space-x-1`}>
            <div>{user?.firstName}</div>
            <div>{user?.lastName}</div>
          </div>
          <div>{user?.email}</div>

          {addresses?.results.map((add, addIdx) => {
            return (
              <div
                key={add.address1 + addIdx}
                className={`flex space-x-1 justify-start items-center`}
              >
                <TruckIcon className={`w-6`} />
                <div className={``}>{add?.address1}</div>
                <div className={``}>{add?.address2}</div>
                <div className={``}>
                  {add?.city}, {add?.state} {add?.zip}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <ShippingInformation
          setSameBilling={() => null}
          sameBilling={null}
          formik={formik}
        />
      )}
    </DisplayOrEdit>
  );
};

const PasswordGroup = ({ user }) => {
  const [edit, setEdit] = useState(false);
  const formik = useFormik({
    initialValues: {
      // shipping
      password: "",
    },
    // validate,
    onSubmit: async (values) => {
      toast.loading("");
      toast.dismiss();
      toast.success();
    },
  });
  return (
    <>
      <section aria-labelledby="account-details-heading">
        <form>
          <div className="shadow sm:overflow-hidden sm:rounded-md">
            <div className="px-4 py-6 bg-white sm:p-6">
              <div className={`text-lg font-medium`}>Password</div>
              <div className={`text-base text-gray-600 mt-1`}>
                Send an email to reset your password
              </div>
            </div>
            <div className="px-4 py-3 text-right bg-gray-50 sm:px-6">
              {/* <Link href={"/user/recover"}> */}
              <button
                onClick={async (e) => {
                  e.preventDefault();
                  if (user.email) {
                    try {
                      toast.loading();
                      await swellStore("account", "recover", {
                        email: user.email,
                        reset_url: `${process.env.NEXT_PUBLIC_STORE_URL}user/recover`,
                      });
                      toast.dismiss();
                      toast.success("Email sent");
                    } catch (e) {
                      toast.dismiss();
                      toast.error(e.message);
                    }
                  }
                }}
                type="submit"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-gray-800 border border-transparent rounded-md shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
              >
                Change password
              </button>
              {/* </Link> */}
            </div>
          </div>
        </form>
      </section>
    </>
  );
};
const DisplayOrEdit = ({ children, formik, edit, setEdit }) => {
  return (
    <div>
      <section aria-labelledby="account-details-heading">
        <form onSubmit={formik.handleSubmit}>
          <div className="shadow sm:overflow-hidden sm:rounded-md">
            <div className="px-4 py-6 bg-white sm:p-6">{children}</div>
            <div className="px-4 py-3 text-right bg-gray-50 sm:px-6">
              {!edit ? (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setEdit(true);
                  }}
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-gray-800 border border-transparent rounded-md shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                >
                  Edit
                </button>
              ) : (
                <button
                  // onClick={(e) => e.preventDefault()}
                  type="submit"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-gray-800 border border-transparent rounded-md shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                >
                  Save
                </button>
              )}
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};
