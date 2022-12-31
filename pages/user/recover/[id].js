import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import Logo from "@components/ui/Logo";
import { login, defaultAccount } from "@lib/swell";
import cn from "@utils/cn";

import Link from "next/link";
import recover from "@lib/swell/auth/recover";
import toast from "react-hot-toast";
import passwordReset from "@lib/swell/auth/passwordReset";
export default function Recover() {
  //   const router = useRouter();
  //   const [recoverId, setRecoverId] = useState("");
  //   useEffect(() => {
  //     if (router && router.query.id) {
  //       setRecoverId(router.query.id);
  //     }
  //   }, []);
  return <RecoverComponent />;
}

function RecoverComponent() {
  const router = useRouter();
  const [recoverId, setRecoverId] = useState("");
  useEffect(() => {
    if (router && router.query.id) {
      setRecoverId(router.query.id);
    }
  }, []);
  const [newAccount, setNewAccount] = useState(defaultAccount);

  const [hasError, setHasError] = useState(false);
  const handleClick = async (e) => {
    e.preventDefault();
    const key = router.query.id;
    setHasError(false);
    const [act, error] = await passwordReset(newAccount, key);
    if (act && act.success) {
      toast.success(`Password changed ${newAccount.email}`);
      router.push("/user/sign-in");
    }
    if (error) {
      setHasError(true);
      toast.error(`Error, please try again`);
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
        <div className="max-w-lg mx-auto">
          <div className="mt-16">
            <Logo className={`w-16 mx-auto`} />
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-center text-gray-900">
              Reset Password
            </h2>
          </div>

          <div className="mt-8">
            <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
              <form className="space-y-6">
                {/* <div>
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
                </div> */}

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

                        setNewAccount((act) => {
                          return {
                            ...act,
                            password: e.target.value,
                          };
                        });
                      }}
                      required
                      className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={handleClick}
                    className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-teal-600 border border-transparent rounded-md shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                  >
                    Reset Password
                  </button>
                </div>
              </form>
              {hasError && (
                <p className={`pt-6 text-rose-600`}>
                  It looks like you may have entered the wrong email address or
                  password. Please double-check and try again. If you&apos;re
                  having trouble, feel free to contact us for help.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
