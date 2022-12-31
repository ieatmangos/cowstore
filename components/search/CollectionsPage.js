import PageTitle from "@components/ui/PageTitle";
import { MagnifyingGlassPlusIcon } from "@heroicons/react/20/solid";

import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function CollectionsPage(props) {
  return (
    <div className={``}>
      {/* <Breadcrumbs /> */}
      <PageTitle
        h3={props?.useH3}
        title={"Collections"}
        msg={`This how we like to shop. Pick between your favorites.`}
      />
      <div className="bg-gray-200">
        <div className="px-4 py-3 mx-auto max-w-7xl sm:flex sm:items-center sm:px-6 lg:px-8">
          <h3 className="text-sm font-medium text-gray-700">Categories</h3>

          <div
            aria-hidden="true"
            className="hidden w-px h-5 bg-gray-300 sm:ml-4 sm:block"
          />

          <div className="mt-2 sm:mt-0 sm:ml-4">
            <div className="flex flex-wrap items-center -m-1">
              {props.categories.map((activeFilter, idx) => (
                <Link
                  href={`/collections/${activeFilter.slug}`}
                  key={idx + "activeFilter.name"}
                >
                  <span className="m-1 inline-flex items-center rounded-full border border-gray-200 bg-white py-1.5 pl-3 pr-2 text-sm font-medium text-gray-900">
                    <span>{activeFilter.name}</span>
                    <button
                      type="button"
                      className="inline-flex flex-shrink-0 w-6 h-6 p-1 ml-1 text-gray-500 rounded-full hover:bg-gray-200 hover:text-gray-600"
                    >
                      <span className="sr-only">
                        Explore {activeFilter.name}
                      </span>
                      <MagnifyingGlassPlusIcon className={`w-full h-full `} />
                    </button>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={`px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8`}>
        <ul
          role="list"
          className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
        >
          {props.categories.map((file, idx) => (
            <li
              key={file.slug + idx}
              className={`${
                idx === 0 ? "col-span-1  h-full flex flex-col" : ""
              } relative`}
            >
              <Link href={`/collections/${file.slug}`}>
                <div className={``}>
                  <div
                    className={`block w-full overflow-hidden bg-gray-100 bg-teal-100 rounded-lg group  focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 
                  ${
                    idx === 0
                      ? "aspect-w-6 aspect-h-9"
                      : "aspect-w-6 aspect-h-9"
                  }
                  `}
                  >
                    <Image
                      src={
                        file.images
                          ? file.images[0].file.url
                          : "/assets/steak/4.jpg"
                      }
                      fill
                      sizes="420px"
                      alt={file.name}
                      className="object-cover pointer-events-none group-hover:opacity-75"
                    />
                    <button
                      type="button"
                      className="absolute inset-0 focus:outline-none"
                    >
                      <span className="sr-only">
                        View details for {file.name}
                      </span>
                    </button>
                  </div>
                  <div className={` `}>
                    <p className="block mt-2 text-sm font-medium text-gray-900 truncate pointer-events-none">
                      {file.name}
                    </p>
                    {/* <p className="block text-sm font-medium text-gray-600 pointer-events-none">
                      {file.description
                        .replace(/&#39;/g, "'")
                        .replace(/&quot;/g, '"')
                        .replace(/&amp;/g, "&")
                        .replace(/&lt;/g, "<")
                        .replace(/&gt;/g, ">")}
                    </p> */}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
