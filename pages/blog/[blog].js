import Logo from "@components/ui/Logo";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import getServerBlog from "@lib/swell/blogs/getServerBlog";
import getServerBlogs from "@lib/swell/blogs/getServerBlogs";
import { formatDate, makeSlug } from "@lib/utils";
import Link from "next/link";

export default function BlogPage({ blog }) {
  return (
    <div className={``}>
      <div className={`xl:sticky top-0 flex px-4 pt-8 pb-10 lg:px-8`}>
        <Link className={`flex`} href={`/blog`}>
          <ChevronLeftIcon
            className={`overflow-visible mr-3 text-slate-400 w-auto h-6 group-hover:text-slate-600 group-hover:text-slate-300`}
          />
          <div
            className={`group flex font-semibold text-sm leading-6 text-slate-700 hover:text-slate-900  `}
          >
            Go back
          </div>
        </Link>
      </div>
      <div className={`px-4 sm:px-6 md:px-8`}>
        <div className={`max-w-3xl mx-auto pb-28`}>
          <main>
            <article className={`relative pt-10`}>
              {/* title */}
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl ">
                {blog.title}
              </h1>
              {/* data */}
              <div className="text-sm leading-6">
                <dl>
                  <dt className="sr-only">Date</dt>
                  <dd className="absolute inset-x-0 top-0 text-slate-700 ">
                    <time datetime="2022-10-19T15:30:00.000Z">
                      {formatDate(blog.date_created)}
                    </time>
                  </dd>
                </dl>
              </div>
              {/* avatar */}
              <div className={`mt-6`}>
                <ul class="flex flex-wrap text-sm leading-6 -mt-6 -mx-5">
                  <li class="flex items-center font-medium whitespace-nowrap px-5 mt-6">
                    <Logo color={`rose`} className={`w-8 mr-3`} />
                    <div class="text-sm leading-4">
                      <div class="text-slate-900 ">Cow Store</div>
                      <div class="mt-1">
                        <a
                          href="https://twitter.com/Vermont_beef"
                          class="text-rose-500 hover:text-rose-600 dark:text-rose-400"
                        >
                          @Vermont_Beef
                        </a>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              {/* description */}
              <div className={`prose !max-w-none lg:prose-lg mt-12`}>
                {blog.description}
              </div>
              {/* content */}
              <div
                dangerouslySetInnerHTML={{ __html: blog.content }}
                className={` mt-12 prose !max-w-none  prose-slate `}
              ></div>
            </article>
          </main>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const blogId = params.blog;
  const blogs = await getServerBlog(blogId);

  // Generate static pages for each blog
  const staticProps = {
    props: {
      blog: !blogs ? [] : blogs,
    },
    // revalidate: 500,
  };
  return staticProps;
}

export async function getStaticPaths() {
  const blogs = await getServerBlogs();
  const paths = blogs.results.map((blog) => ({
    params: { blog: blog.slug },
  }));
  return {
    paths: paths,
    fallback: false, // can also be true or 'blocking'
  };
}
