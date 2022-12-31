import Logo from "@components/ui/Logo";
import getServerBlogs from "@lib/swell/blogs/getServerBlogs";
import { formatDate } from "@lib/utils";
import Link from "next/link";
import React from "react";

export default function index({ blogs }) {
  return (
    <div className={``}>
      <ContentSectionTwoColumnsTestimonial />
      <BlogExamples blogs={blogs} />
    </div>
  );
}
export async function getStaticProps() {
  const blogs = await getServerBlogs({ limit: 4 });

  // Generate static pages for each product
  const staticProps = {
    props: {
      blogs: !blogs ? [] : blogs.results,
    },
    revalidate: 5000,
  };
  return staticProps;
}

function ContentSectionTwoColumnsTestimonial() {
  return (
    <div className="py-16 overflow-hidden bg-gray-50">
      <div className="px-4 mx-auto space-y-8 max-w-7xl sm:px-6 lg:px-8">
        <div className="mx-auto text-base max-w-prose lg:max-w-none">
          <h1 className="text-lg font-semibold text-teal-600">About us</h1>
          <p className="mt-2 text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
            What makes us different
          </p>
        </div>
        <div className="relative z-10 mx-auto text-base max-w-prose lg:mx-0 lg:max-w-5xl lg:pr-72">
          <p className="text-lg text-gray-500">
            At Cow Store we are passionate about providing our customers with
            the highest quality USDA inspected beef and other perishable meat
            products. We are dedicated to supporting local farms and families,
            and are committed to building connections between these farms and
            families all across the northeast. We believe in the importance of
            supporting local agriculture and promoting sustainable and humane
            farming practices, and are proud to partner with small family-owned
            farms that share our values and ethics.
          </p>
        </div>
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-8">
          <div className="relative z-10">
            <div className="mx-auto prose text-gray-500 prose-teal lg:max-w-none">
              <p>
                Our company was founded on the principle of connecting our
                customers with the finest quality beef, while supporting local
                farmers and the community in Vermont. We are committed to
                offering our customers only the best products, and to providing
                excellent customer service. We take great care in selecting the
                farms we partner with, and in ensuring that our cows are raised
                to the highest standards of quality and care. All cows are
              </p>
              <ul role="list">
                <li>Pasture raised, grass fed</li>
                <li>Spend 100% of their life at the same farm</li>
                <li>Are cared for and loved</li>
              </ul>
              <p>
                We believe that our customers will appreciate the care and
                attention that goes into raising our cows, and will taste the
                difference in every bite of our delicious and nutritious beef.
                We are confident that our customers will be pleased with the
                quality of our products, and will come back for more. We are
                grateful for your support and look forward to serving you.
              </p>
              <h2>Our Farms</h2>
              <p>
                All of our cows are born and raised in Vermont, on small
                family-owned farms that have been passed down for generations.
                Our farmers are passionate about their work and take great pride
                in raising our cows to the highest standards. They are dedicated
                to providing our customers with the finest quality beef, and are
                committed to supporting their local community.
              </p>

              <p>
                Our cows are raised in a natural and humane environment, where
                they have access to plenty of fresh air and sunshine, and are
                allowed to roam and graze on lush green pastures. This means
                that our beef is not only delicious and nutritious, but also
                raised with the utmost care and respect for the animals and the
                environment. The farmers take great care of their cows and are
                proud of the happy and healthy lives they provide for them.
              </p>

              <p>
                We believe that the quality of our products starts on the farm,
                which is why we work closely with our farmers to ensure that our
                cows are raised to the highest standards. We are grateful for
                their dedication and hard work, and are committed to supporting
                their efforts and the local farming community. We are proud to
                partner with these families and are honored to bring their
                delicious and nutritious beef to our customers.
              </p>

              <p>
                We hope that our customers will appreciate the care and
                attention that goes into raising our cows, and will taste the
                difference in every bite of our delicious and nutritious beef.
                We are confident that our customers will be pleased with the
                quality of our products, and will come back for more.
              </p>
            </div>
            <div className="flex mx-auto mt-10 text-base max-w-prose lg:max-w-none">
              <div className="rounded-md shadow">
                <Link href={`/store`}>
                  <div className="flex items-center justify-center w-full px-5 py-3 text-base font-medium text-white bg-teal-600 border border-transparent rounded-md hover:bg-teal-700">
                    Shop
                  </div>
                </Link>
              </div>
              <div className="ml-4 rounded-md shadow">
                <Link href={`/blog`}>
                  <div className="flex items-center justify-center w-full px-5 py-3 text-base font-medium text-teal-600 bg-white border border-transparent rounded-md hover:bg-gray-50">
                    Learn more
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="relative mx-auto mt-12 text-base max-w-prose lg:mt-0 lg:max-w-none">
            <svg
              className="absolute top-0 right-0 -mt-20 -mr-20 lg:top-auto lg:right-auto lg:bottom-1/2 lg:left-1/2 lg:mt-0 lg:mr-0 xl:top-0 xl:right-0 xl:-mt-20 xl:-mr-20"
              width={404}
              height={384}
              fill="none"
              viewBox="0 0 404 384"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="bedc54bc-7371-44a2-a2bc-dc68d819ae60"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width={404}
                height={384}
                fill="url(#bedc54bc-7371-44a2-a2bc-dc68d819ae60)"
              />
            </svg>
            <blockquote className="relative bg-white rounded-lg shadow-lg">
              <div className="px-6 py-8 rounded-t-lg sm:px-10 sm:pt-10 sm:pb-8">
                <Logo color="teal" className={`w-8`} />
                <div className="relative mt-8 text-lg font-medium text-gray-700">
                  <svg
                    className="absolute top-0 left-0 w-8 h-8 text-gray-200 transform -translate-x-3 -translate-y-2"
                    fill="currentColor"
                    viewBox="0 0 32 32"
                    aria-hidden="true"
                  >
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                  <p className="relative">
                    We&apos;re bringing the best of Vermont&apos;s pastures
                    straight to your doorstep. From our family to yours, enjoy
                    the finest, healthiest beef and support local agriculture at
                    the same time. Let&apos;s make every meal a taste of home.
                  </p>
                </div>
              </div>
              <cite className="relative flex items-center px-6 py-5 not-italic bg-teal-600 rounded-b-lg sm:mt-10 sm:items-start sm:py-5 sm:pl-12 sm:pr-10">
                <span className="relative border-2 border-white rounded-full sm:absolute sm:top-0 sm:-translate-y-1/2 sm:transform">
                  <img
                    className="w-12 h-12 bg-teal-300 rounded-full sm:h-20 sm:w-20"
                    src="/assets/profile_pics/profile1.png"
                    alt=""
                  />
                </span>
                <span className="relative ml-4 font-semibold leading-6 text-teal-300 sm:ml-24 sm:pl-1">
                  <span className="font-semibold text-white sm:inline">
                    Gabriel Loubier
                  </span>{" "}
                  <span className="sm:inline">CEO at Cow Store</span>
                </span>
              </cite>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
}

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
const posts = [
  {
    title: "Boost your conversion rate",
    href: "#",
    description:
      "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
  },
  {
    title: "How to use search engine optimization to drive sales",
    href: "#",
    description:
      "Optio cum necessitatibus dolor voluptatum provident commodi et. Qui aperiam fugiat nemo cumque.",
    date: "Mar 10, 2020",
    datetime: "2020-03-10",
  },
  {
    title: "Improve your customer experience",
    href: "#",
    description:
      "Cupiditate maiores ullam eveniet adipisci in doloribus nulla minus. Voluptas iusto libero adipisci rem et corporis.",
    date: "Feb 12, 2020",
    datetime: "2020-02-12",
  },
  {
    title: "Writing effective landing page copy",
    href: "#",
    description:
      "Ipsum voluptates quia doloremque culpa qui eius. Id qui id officia molestias quaerat deleniti. Qui facere numquam autem libero quae cupiditate asperiores vitae cupiditate. Cumque id deleniti explicabo.",
    date: "Jan 29, 2020",
    datetime: "2020-01-29",
  },
];

function BlogExamples({ blogs }) {
  return (
    <div className="px-4 pb-16 mx-auto mt-32 space-y-8 max-w-7xl sm:px-6 lg:px-8">
      <div className="relative divide-y-2 divide-gray-200 ">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            The latest from our blog
          </h2>
          <div className="mt-3 sm:mt-4 lg:grid lg:grid-cols-2 lg:items-center lg:gap-5">
            <p className="text-xl text-gray-500">
              Get an idea of what&apos;s going on at the farm.
            </p>
            {/* <form className="flex flex-col mt-6 sm:flex-row lg:mt-0 lg:justify-end">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email-address"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full px-4 py-2 text-base text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-md appearance-none focus:border-teal-500 focus:outline-none focus:ring-teal-500 lg:max-w-xs"
                  placeholder="Enter your email"
                />
              </div>
              <div className="flex flex-shrink-0 w-full mt-2 rounded-md shadow-sm sm:mt-0 sm:ml-3 sm:inline-flex sm:w-auto">
                <button
                  type="button"
                  className="flex items-center justify-center w-full px-4 py-2 text-base font-medium text-white bg-teal-600 border border-transparent rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 sm:inline-flex sm:w-auto"
                >
                  Notify me
                </button>
              </div>
            </form> */}
          </div>
        </div>
        <div className="grid gap-16 pt-10 mt-6 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-12">
          {blogs.map((post) => (
            <div key={post.title}>
              <p className="text-sm text-gray-500">
                <time dateTime={post.date_created}>
                  {formatDate(post.date_created)}
                </time>
              </p>
              <Link href={`/blog/${post.slug}`} className="block mt-2">
                <p className="text-xl font-semibold text-gray-900">
                  {post.title}
                </p>
                <p className="mt-3 text-base text-gray-500">
                  {post.description}
                </p>
              </Link>
              <div className="mt-3">
                <Link href={`/blog/${post.slug}`}>
                  <div className="text-base font-semibold text-teal-600 hover:text-teal-500">
                    Read full story
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
