import PageTitle from "@components/ui/PageTitle";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import getServerBlogs from "@lib/swell/blogs/getServerBlogs";
import { formatDate, makeSlug } from "@lib/utils";
import Link from "next/link";
import React from "react";

export default function Blog({ blogs }) {
  return (
    <div className={`overflow-hidden`}>
      <PageTitle
        title="Latest Updates"
        msg="All the latest Cow Store news, straight from the team."
      />
      <div
        className={`max-w-[52rem] mx-auto px-4 pb-28 sm:px-6 md:px-8 xl:px-12 lg:max-w-6xl`}
      >
        <div
          className={`relative sm:pb-12 sm:ml-[calc(2rem+1px)] md:ml-[calc(3.5rem+1px)] lg:ml-[max(calc(14.5rem+1px),calc(100%-48rem))]`}
        >
          <div
            className={`hidden absolute top-3 bottom-0 right-full mr-7 md:mr-[3.25rem] w-px bg-slate-200 sm:block`}
          />
          <div className={`space-y-16`}>
            {blogs.map((blog, index) => {
              const { title, description, date_created, slug } = blog;
              return (
                <article className={`relative group`} key={index + blog.title}>
                  <div
                    className={`absolute -inset-y-2.5 -inset-x-4 md:-inset-y-4 md:-inset-x-6 sm:rounded-2xl group-hover:bg-slate-50/70 `}
                  />
                  <svg
                    viewBox="0 0 9 9"
                    class="hidden absolute right-full mr-6 top-2 text-slate-200  md:mr-12 w-[calc(0.5rem+1px)] h-[calc(0.5rem+1px)] overflow-visible sm:block"
                  >
                    <circle
                      cx="4.5"
                      cy="4.5"
                      r="4.5"
                      stroke="currentColor"
                      class="fill-white "
                      stroke-width="2"
                    ></circle>
                  </svg>
                  <div className={`relative z-10 pointer-events-none`}>
                    <h3
                      className={`text-base font-semibold tracking-tight text-slate-900  pt-8 lg:pt-0`}
                    >
                      {title}
                    </h3>
                    <div
                      className={`mt-2 mb-4 prose prose-slate prose-a:relative prose-a:z-10 line-clamp-2`}
                    >
                      <p>{description}</p>
                    </div>
                    <dl
                      className={`absolute left-0 top-0 lg:left-auto lg:right-full lg:mr-[calc(6.5rem+1px)]`}
                    >
                      <dt className={`sr-only`}>Date</dt>
                      <dd className={`whitespace-nowrap text-sm leading-6 `}>
                        <time dateTime={date_created}>
                          {formatDate(date_created)}
                        </time>
                      </dd>
                    </dl>
                  </div>
                  <Link
                    className={`flex items-center text-sm text-teal-500 font-medium`}
                    href={`/blog/${slug}`}
                  >
                    <span
                      className={`group-hover:bg-gray-100 z-0 absolute -inset-y-2.5 -inset-x-4 md:-inset-y-4 md:-inset-x-6 sm:rounded-2xl`}
                    ></span>
                    <span className={`relative z-10`}>Read More</span>
                    <ChevronRightIcon className={`w-4 ml-2 relative z-10`} />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const blogs = await getServerBlogs();

  // Generate static pages for each product
  const staticProps = {
    props: {
      blogs: !blogs ? [] : blogs.results,
    },
    revalidate: 5,
  };
  return staticProps;
}
