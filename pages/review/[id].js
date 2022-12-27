import StarRating from "@components/review/StarRating";
import { useModal } from "@lib/context/ModalContext";
import getUser from "@lib/swell/auth/getUser";
import getProduct from "@lib/swell/products/getProduct";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Review() {
  return (
    <div className="">
      <NewReviewPage />
    </div>
  );
}

function NewReviewPage() {
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [newReview, setNewReview] = useState({
    title: "",
    rating: 5,
    parent_id: "",
    comments: "",
    account_id: "",
    name: "",
  });
  const changeReview = (arg, type) => {
    setNewReview((c) => {
      return { ...c, [type]: arg };
    });
  };
  useEffect(() => {
    changeReview(router.query.id, "parent_id");
    findUser(router.query.id);
  }, []);
  const { isOpen, open } = useModal();

  const findUser = async (productId) => {
    //
    //
    //
    //
    const user = await getUser();
    if (!user) {
      open();
      return;
    }
    //
    //
    //
    //
    changeReview(user.id, "account_id");
    changeReview(user.email, "title");
    const product = await getProduct(productId);
    setProduct(product);
  };
  const handleSubmit = async () => {
    // const user = await getUser();
    const bodyString = JSON.stringify(newReview);
    try {
      const user = await getUser();
      const adminOnly = isAdmin(user);
      if (adminOnly) {
        const backend = await fetch(
          `${process.env.NEXT_PUBLIC_STORE_URL}/api/reviews/create`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: bodyString,
          }
        );
        const js = await backend.json();
        if (js && js.id) {
          toast.success("Review sent!");
          router.push("/review");
        } else {
          toast.error("Opps, something went wrong");
        }
      } else {
        toast.error("Not Allowed");
      }
    } catch (err) {
      console.log("error", err);
    }
  };
  return (
    <div
      className={`max-w-2xl px-4 py-16 mx-auto sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8`}
    >
      <div className={``}>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Review
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                We&apos;d love to hear what you thought of our products. A few
                sentences in a review would be a great help to us and other
                customers.
              </p>
              {product && product.images && product.images.length > 0 && (
                <div className="flex flex-col items-center mt-8 lg:mt-12 group">
                  <img
                    className="inline-block object-cover w-32 h-32 rounded"
                    src={product.images[0].file.url}
                    alt=""
                  />
                  <h4 className="mt-4 text-lg text-center text-gray-700 ">
                    {product.name}
                  </h4>
                </div>
              )}
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <form action="#" method="POST">
              <div className="shadow sm:overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 space-y-6 bg-white sm:p-6">
                  <div className={` mt-2 flex justify-center lg:justify-start`}>
                    <StarRating
                      value={newReview.rating}
                      onChange={(e) => changeReview(e, "rating")}
                      size="w-9"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name
                    </label>
                    <div className="mt-1">
                      <input
                        value={newReview.name}
                        onChange={(e) => changeReview(e.target.value, "name")}
                        type="text"
                        name="name"
                        id="inputname"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                        placeholder=""
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Message
                    </label>
                    <div className="mt-1">
                      <textarea
                        value={newReview.message}
                        onChange={(e) =>
                          changeReview(e.target.value, "comments")
                        }
                        id="message"
                        name="message"
                        rows={5}
                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                        placeholder={`I recently tried the ${
                          !product ? "pasture raised tenderloin" : product.name
                        } and it was ...`}
                        defaultValue={""}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Describe your experience
                    </p>
                    <p className="mt-2 text-sm text-gray-500"></p>
                  </div>
                </div>
                <div className="px-4 py-3 text-right bg-gray-50 sm:px-6">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleSubmit();
                    }}
                    type="submit"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-teal-600 border border-transparent rounded-md shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div> */}
    </div>
  );
}
