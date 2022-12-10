import StarRating from "@components/review/StarRating";
import { HeartIcon, StarIcon } from "@heroicons/react/24/outline";
import cn from "@utils/cn";
import Link from "next/link";

export default function ProductReviews({ reviews, id }) {
  const average = Math.ceil(
    reviews.reduce((a, c) => a + c.rating, 0) / reviews.length
  );
  let count = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };
  reviews.forEach((review) => {
    if (count[review.rating]) {
      count[review.rating]++;
    } else {
      count[review.rating] = 1;
    }
  });
  let counts = Object.entries(count)
    .map(([rating, count]) => {
      return {
        rating,
        count,
      };
    })
    .reverse();
  return (
    <div className="bg-white">
      <div className=" sm:py-24 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:py-32 lg:px-8">
        <div className="lg:col-span-4">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Customer Reviews
          </h2>

          <div className="flex items-center mt-3">
            <div>
              <div className="flex items-center">
                {/* {[0, 1, 2, 3, 4].map((rating) => (
                  <StarRating
                    key={rating}
                    className={cn(
                      reviews.average > rating
                        ? "text-yellow-400"
                        : "text-gray-300",
                      "flex-shrink-0 h-5 w-5"
                    )}
                    aria-hidden="true"
                  />
                ))} */}
                <StarRating size="w-5" value={average} />
              </div>
              <p className="sr-only">5 out of 5 stars</p>
            </div>
            <p className="ml-2 text-sm text-gray-900">
              Based on {reviews.length} reviews
            </p>
          </div>

          <div className="mt-6">
            <h3 className="sr-only">Review data</h3>

            <dl className="space-y-3">
              {counts.map((count) => (
                <div key={count.rating} className="flex items-center text-sm">
                  <dt className="flex items-center flex-1">
                    <p className="w-3 font-medium text-gray-900">
                      {count.rating}
                      <span className="sr-only"> star reviews</span>
                    </p>
                    <div
                      aria-hidden="true"
                      className="flex items-center flex-1 ml-1"
                    >
                      <HeartIcon
                        className={cn(
                          count.count > 0 ? "text-rose-400" : "text-gray-300",
                          "flex-shrink-0 h-5 w-5"
                        )}
                        aria-hidden="true"
                      />

                      <div className="relative flex-1 ml-3">
                        <div className="h-3 bg-gray-100 border border-gray-200 rounded-full" />
                        {count.count > 0 ? (
                          <div
                            className="absolute inset-y-0 border rounded-full bg-rose-400 border-rose-400"
                            style={{
                              width: `calc(${count.count} / ${reviews.length} * 100%)`,
                            }}
                          />
                        ) : null}
                      </div>
                    </div>
                  </dt>
                  <dd className="w-10 ml-3 text-sm text-right text-gray-900 tabular-nums">
                    {Math.round((count.count / reviews.length) * 100)}%
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-10">
            <h3 className="text-lg font-medium text-gray-900">
              Share your thoughts
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              If you’ve used this product, share your thoughts with other
              customers
            </p>

            <Link href={`/review/${id}`}>
              <div className="inline-flex items-center justify-center w-full px-8 py-2 mt-6 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-md hover:bg-gray-50 sm:w-auto lg:w-full">
                Write a review
              </div>
            </Link>
          </div>
        </div>

        <div className="mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0">
          <h3 className="sr-only">Recent reviews</h3>

          <div className="flow-root">
            <div className="-my-12 divide-y divide-gray-200">
              {reviews.map((review) => (
                <div key={review.id} className="py-12">
                  <div className="flex items-center">
                    {/* <img
                      src={review.avatarSrc}
                      alt={`${review.author}.`}
                      className="w-12 h-12 rounded-full"
                    /> */}
                    <div className="">
                      <h4 className="text-sm font-bold text-gray-900">
                        {review.name}
                      </h4>
                      <div className="flex items-center mt-1">
                        <StarRating value={review.rating} />
                      </div>
                      <p className="sr-only">{review.rating} out of 5 stars</p>
                    </div>
                  </div>

                  <div
                    className="mt-4 space-y-6 text-base italic text-gray-600"
                    // dangerouslySetInnerHTML={{ __html: review.comments }}
                  >
                    {review.comments}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
