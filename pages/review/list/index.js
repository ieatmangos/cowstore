import PageTitle from "@components/ui/PageTitle";
import getServerProducts from "@lib/swell/products/getServerProducts";
import React from "react";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/20/solid";
import { CheckBadgeIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

export default function List({ products }) {
  const router = useRouter();
  const handleApprove = async (id, approved) => {
    // const user = await getUser();
    const bodyString = JSON.stringify({ id, approved });
    try {
      const backend = await fetch(
        `${process.env.NEXT_PUBLIC_STORE_URL}/api/reviews/approve`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: bodyString,
        }
      );
      const js = await backend.json();
      if (js && js.id) {
        // toast.success("Review sent!");
        router.reload();
      } else {
        toast.error("Opps, something went wrong");
      }
    } catch (err) {
      console.log("error", err);
    }
  };
  const handleDelete = async (id) => {
    // const user = await getUser();
    const body = { id: id };
    const bodyString = JSON.stringify(body);
    const confirm = window.confirm("Are you sure you want to delete?");
    if (confirm) {
      try {
        const backend = await fetch(
          `${process.env.NEXT_PUBLIC_STORE_URL}/api/reviews/delete`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: bodyString,
          }
        );
        const js = await backend.json();
        if (js && js.id) {
          // toast.success("Review sent!");
          router.reload();
        } else {
          toast.error("Opps, something went wrong");
        }
      } catch (err) {
        console.log("error", err);
      }
    }
  };
  return (
    <div className={``}>
      <PageTitle
        title={"Approve and remove reviews"}
        msg={"Hide before production"}
      />
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 mx-auto max-w-7xl sm:px-6 lg:px-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        {products.map((product, productIndex) => {
          return product.reviews.results.map((review, reviewIndex) => {
            const approve = () => {
              handleApprove(review.id, !review.approved);
            };
            const deleteReview = () => {
              handleDelete(review.id);
            };
            return (
              <li
                key={review.id}
                className="flex flex-col col-span-1 bg-white divide-y divide-gray-200 rounded-lg shadow"
              >
                <div className={`p-6 mb-auto `}>
                  <div className="flex items-center justify-between w-full space-x-6">
                    <div className="flex-1 truncate">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-sm font-medium text-gray-900 truncate">
                          {review.name}
                        </h3>
                        <span
                          className={`inline-block flex-shrink-0 rounded-full  px-2 py-0.5 text-xs font-medium 
                      ${
                        !review.approved
                          ? "bg-amber-100 text-amber-800"
                          : "bg-teal-200 text-teal-800"
                      }

                      `}
                        >
                          {!review.approved ? "Pending" : "Approved"}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-500 truncate">
                        {product.name}
                      </p>
                    </div>
                    <img
                      className="flex-shrink-0 object-cover w-10 h-10 bg-gray-300 rounded-full"
                      src={product.images[0].file.url}
                      alt=""
                    />
                  </div>
                  <p className="mt-3 text-base text-gray-600 ">
                    {review.comments}
                  </p>
                  <p className="mt-2 text-sm text-gray-500 truncate">
                    {review.title}
                  </p>
                </div>
                <div>
                  <div className="flex -mt-px divide-x divide-gray-200">
                    <div className="flex flex-1 w-0">
                      <div
                        role="button"
                        onClick={approve}
                        className="relative inline-flex items-center justify-center flex-1 w-0 py-4 -mr-px text-sm font-medium text-gray-700 border border-transparent rounded-bl-lg hover:text-gray-500"
                      >
                        <CheckBadgeIcon
                          className="w-5 h-5 text-gray-400"
                          aria-hidden="true"
                        />
                        <span className="ml-3">Approve</span>
                      </div>
                    </div>
                    <div className="flex flex-1 w-0 -ml-px">
                      <div
                        role="button"
                        onClick={deleteReview}
                        className="relative inline-flex items-center justify-center flex-1 w-0 py-4 text-sm font-medium text-gray-700 border border-transparent rounded-br-lg hover:text-gray-500"
                      >
                        <TrashIcon
                          className="w-5 h-5 text-gray-400"
                          aria-hidden="true"
                        />
                        <span className="ml-3">Delete</span>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          });
        })}
      </ul>
    </div>
  );
}
export async function getStaticProps() {
  const products = await getServerProducts();
  const reviews = !products ? [] : products.results;
  // Generate static pages for each product
  const staticProps = {
    props: {
      products: !products ? [] : products.results,
    },
    revalidate: 5000,
  };
  return staticProps;
}

const people = [
  {
    name: "Jane Cooper",
    title: "Regional Paradigm Technician",
    role: "Admin",
    email: "janecooper@example.com",
    telephone: "+1-202-555-0170",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  // More people...
];

function GridList() {
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {people.map((person) => (
        <li
          key={person.email}
          className="col-span-1 bg-white divide-y divide-gray-200 rounded-lg shadow"
        >
          <div className="flex items-center justify-between w-full p-6 space-x-6">
            <div className="flex-1 truncate">
              <div className="flex items-center space-x-3">
                <h3 className="text-sm font-medium text-gray-900 truncate">
                  {person.name}
                </h3>
                <span className="inline-block flex-shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                  {person.role}
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-500 truncate">
                {person.title}
              </p>
            </div>
            <img
              className="flex-shrink-0 w-10 h-10 bg-gray-300 rounded-full"
              src={person.imageUrl}
              alt=""
            />
          </div>
          <div>
            <div className="flex -mt-px divide-x divide-gray-200">
              <div className="flex flex-1 w-0">
                <a
                  href={`mailto:${person.email}`}
                  className="relative inline-flex items-center justify-center flex-1 w-0 py-4 -mr-px text-sm font-medium text-gray-700 border border-transparent rounded-bl-lg hover:text-gray-500"
                >
                  <EnvelopeIcon
                    className="w-5 h-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <span className="ml-3">Email</span>
                </a>
              </div>
              <div className="flex flex-1 w-0 -ml-px">
                <a
                  href={`tel:${person.telephone}`}
                  className="relative inline-flex items-center justify-center flex-1 w-0 py-4 text-sm font-medium text-gray-700 border border-transparent rounded-br-lg hover:text-gray-500"
                >
                  <PhoneIcon
                    className="w-5 h-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <span className="ml-3">Call</span>
                </a>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
