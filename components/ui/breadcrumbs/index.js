import { HomeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export default function Breadcrumbs() {
  const router = useRouter();

  function generateBreadcrumbs() {
    // Remove any query parameters, as those aren't included in breadcrumbs
    const asPathWithoutQuery = router.asPath.split("?")[0];

    // Break down the path between "/"s, removing empty entities
    // Ex:"/my/nested/path" --> ["my", "nested", "path"]
    const asPathNestedRoutes = asPathWithoutQuery
      .split("/")
      .filter((v) => v.length > 0);

    // Iterate over the list of nested route parts and build
    // a "crumb" object for each one.
    const crumblist = asPathNestedRoutes.map((subpath, idx) => {
      // We can get the partial nested route for the crumb
      // by joining together the path parts up to this point.
      const href = "/" + asPathNestedRoutes.slice(0, idx + 1).join("/");
      // The title will just be the route string for now
      const title = subpath.replace(/-/g, " ");
      return { href, text: title };
    });

    // Add in a default "Home" crumb for the top-level
    return [{ href: "/", text: "Home" }, ...crumblist];
  }
  const breadcrumbs = generateBreadcrumbs();
  if (breadcrumbs.length < 2) {
    return null;
  }
  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol
          role="list"
          className="flex items-center px-4 py-4 mx-auto space-x-2 sm:py-6 sm:px-6 max-w-7xl lg:px-8"
        >
          {breadcrumbs.map((breadcrumb, bIndx) => {
            return (
              <Crumb
                breadcrumb={breadcrumb}
                key={bIndx}
                idx={bIndx}
                last={bIndx === breadcrumbs.length - 1}
              />
            );
          })}
          {/* <li className="text-sm">
            <a
              href={product.href}
              aria-current="page"
              className="font-medium text-gray-500 hover:text-gray-600"
            >
              {product.name}
            </a>
          </li> */}
        </ol>
      </nav>
    </>
  );
}

function Crumb({ breadcrumb, last = false, idx }) {
  // The last crumb is rendered as normal text since we are already on the page
  if (last) {
    return (
      <li className={`truncate `} key={breadcrumb.id}>
        <p className="mr-2 text-sm font-medium text-gray-500 capitalize">
          {breadcrumb.text}
        </p>
      </li>
    );
  }

  // All other crumbs will be rendered as links that can be visited
  return (
    <li className={`truncate `} key={breadcrumb.id}>
      <div className="flex items-center ">
        <Link className={``} color="inherit" href={breadcrumb.href}>
          {idx === 0 ? (
            <HomeIcon className={`w-5 text-gray-400`} />
          ) : (
            <p
              href={breadcrumb.href}
              className="mr-2 text-sm font-medium text-gray-500 capitalize hover:underline"
            >
              {breadcrumb.text}
            </p>
          )}
        </Link>
        <svg
          width={16}
          height={20}
          viewBox="0 0 16 20"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="w-4 h-5 text-gray-300"
        >
          <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
        </svg>
      </div>
    </li>
  );
}
