import Logo from "@components/ui/Logo";
import { logout } from "@lib/swell";
import Link from "next/link";

export default function SignOut() {
  //   useEffect(() => {
  //     logout();
  //   }, []);
  return (
    <>
      <div className="">
        <div className="max-w-lg mx-auto">
          <div className="mt-16">
            <Logo className={`w-16 mx-auto`} />
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-center text-gray-900">
              See Ya Later
            </h2>
            <p className="mt-2 text-sm text-center text-gray-600">
              Or{" "}
              <Link href="/user/sign-up">
                <span className="font-medium text-teal-600 hover:text-teal-500">
                  create an account
                </span>
              </Link>
              ,{" "}
              <Link href="/user/sign-in">
                <span className="font-medium text-teal-600 hover:text-teal-500">
                  login
                </span>
              </Link>
            </p>
            <div>
              <button onClick={async () => await logout()}>Log out</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
