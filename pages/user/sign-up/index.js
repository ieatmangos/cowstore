import Logo from "@components/ui/Logo";
import {
  accountMetaDataOptions,
  createAccount,
  defaultAccount,
  logout,
} from "@lib/swell";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUp() {
  const router = useRouter();
  const [newAccount, setNewAccount] = useState(defaultAccount);

  const handleClick = async (e) => {
    e.preventDefault();
    const [act, error] = await createAccount(newAccount);

    if (act && !error) {
      router.push("/user");
    }
  };
  // return <div>hi</div>;
  // const handleValidation = useCallback(() => {
  //   // Test for Alphanumeric password
  //   const validPassword = /^(?=.*[a-zA-Z])(?=.*[0-9])/.test(password);

  //   // Unable to send form unless fields are valid.
  //   setDisabled(
  //     !newAccount.email.length < 5 ||
  //       newAccount.password.length < 7 ||
  //       !validPassword
  //   );
  // }, [newAccount]);

  // useEffect(() => {
  //   handleValidation();
  // }, [handleValidation]);
  return (
    <>
      <div className="">
        <div className="max-w-lg mx-auto ">
          <div className="mt-16 ">
            <Logo className={`w-16 mx-auto`} />
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-center text-gray-900">
              Create New Account
            </h2>
            <p className="mt-2 text-sm text-center text-gray-600">
              Or{" "}
              <Link href="/user/sign-in">
                <span
                  role="button"
                  className="font-medium text-teal-600 hover:text-teal-500"
                >
                  login
                </span>
              </Link>
              ,{" "}
              <span
                onClick={async () => {
                  await logout();
                }}
                role="button"
                className="font-medium text-teal-600 hover:text-teal-500"
              >
                logout
              </span>
            </p>
          </div>

          <div className="mt-8">
            <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
              <form className="space-y-6" action="#" method="POST">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      onChange={(e) => {
                        e.preventDefault();

                        const value = e.target.value;
                        if (value !== newAccount.email) {
                          setNewAccount((act) => {
                            return {
                              ...act,
                              email: e.target.value,
                            };
                          });
                        }
                      }}
                      required
                      className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      onChange={(e) => {
                        e.preventDefault();
                        const value = e.target.value;
                        if (value !== newAccount.password) {
                          setNewAccount((act) => {
                            return {
                              ...act,
                              password: e.target.value,
                            };
                          });
                        }
                      }}
                      required
                      className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      onChange={() => {
                        setNewAccount((act) => {
                          return {
                            ...act,
                            email_optin: !act.email_optin,
                          };
                        });
                      }}
                      className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                    />
                    <label
                      htmlFor="remember-me"
                      className="block ml-2 text-sm text-gray-900"
                    >
                      Receive email promotions
                    </label>
                  </div>

                  <Link href="/user/recover">
                    <div className="text-sm font-medium text-teal-600 hover:text-teal-500">
                      Forgot your password?
                    </div>
                  </Link>
                </div>
                {/* END */}
                {/* <RadioGroup value={selectedGroup} onChange={setSelectedGroup}>
                  <RadioGroup.Label className="block text-sm font-medium text-gray-700">
                    Account Type
                  </RadioGroup.Label>
                  <div className="grid grid-cols-1 gap-4 mt-1 sm:grid-cols-2">
                    {accountMetaDataOptions.map((size) => (
                      <RadioGroup.Option
                        as="div"
                        key={size.name}
                        value={size}
                        className={({ active, checked }) =>
                          cn(
                            active ? "ring-2 ring-teal-500 " : "",
                            checked ? "border-teal-300 " : "border-gray-300",
                            "relative block cursor-pointer rounded-lg border  p-4 "
                          )
                        }
                      >
                        {({ active, checked }) => (
                          <>
                            <div className={`flex justify-between`}>
                              <RadioGroup.Label
                                as="p"
                                className={`${
                                  active || checked
                                    ? "text-gray-900"
                                    : "text-gray-900"
                                } text-base font-medium `}
                              >
                                {size.name}
                              </RadioGroup.Label>
                              <CheckCircleIcon
                                className={cn(
                                  !checked ? "hidden" : "",
                                  "h-5 w-5 right-0  text-teal-600"
                                )}
                                aria-hidden="true"
                              />
                            </div>
                            <RadioGroup.Description
                              as="p"
                              className={`mt-1 text-sm ${
                                active || checked
                                  ? "text-gray-700"
                                  : " text-gray-500"
                              }`}
                            >
                              {size.description}
                            </RadioGroup.Description>

                     
                            <div
                              className={cn(
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
                </RadioGroup> */}
                <div>
                  <button
                    // disabled={disabled}
                    // type="submit"
                    onClick={handleClick}
                    className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-teal-600 border border-transparent rounded-md shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
