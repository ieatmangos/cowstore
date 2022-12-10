import PageTitle from "@components/ui/PageTitle";
import getUser from "@lib/swell/auth/getUser";
import isAdmin from "@lib/utils/isAdmin";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function CreateBlog() {
  return (
    <div>
      <PageTitle title={"Create and Edit Blogs"} />
      <BlogForms />
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
function BlogForms() {
  const router = useRouter();
  const edit = router.query.edit || null;
  const editBlog = async (edit) => {
    const bodyEditString = JSON.stringify(
      edit ? { edit } : { edit: "false", name: "error" }
    );
    const thisBlog = await fetch(
      `${process.env.NEXT_PUBLIC_STORE_URL}/api/blog/getBlog`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: bodyEditString,
      }
    );

    if (thisBlog) {
      const blogVals = await thisBlog.json();
      setValues(blogVals);
    }
  };
  const deleteBlog = async (edit) => {
    const bodyEditString = JSON.stringify(
      edit ? { edit } : { edit: "false", name: "error" }
    );
    const thisBlog = await fetch(
      `${process.env.NEXT_PUBLIC_STORE_URL}/api/blog/delete`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: bodyEditString,
      }
    );

    if (thisBlog) {
      toast.success("Deleted");
      router.push("/blog");
    }
  };
  useEffect(() => {
    edit && editBlog(edit);
  }, [edit]);
  const grabData = async (vals) => {
    // const user = await getUser();
    const bodyString = JSON.stringify(vals);

    try {
      const user = await getUser();
      const adminOnly = isAdmin(user ? user.email : "void");
      if (adminOnly) {
        const backend = await fetch(
          `${process.env.NEXT_PUBLIC_STORE_URL}/api/blog/create`,
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
          toast.success("Success!");
          router.push("/blog");
        } else {
          toast.error("Opps, something went wrong");
        }
      } else {
        toast.error("Not allowed");
      }
    } catch (err) {
      console.log("errors", err);
    }
  };

  const {
    handleSubmit,
    values,
    isSubmitting,
    getFieldProps,
    setFieldValue,
    setValues,
  } = useFormik({
    initialValues: {
      name: "",
      description: "",
      content: "",
    },
    onSubmit: (values, actions) => {
      grabData(values);
      // submit the form to your backend here
    },
  });

  return (
    <div className={`container-1 `}>
      <div className={``}>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                New Blog
              </h3>
              {/* <p className="mt-1 text-sm text-gray-600">Post blogs</p> */}
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <form onSubmit={handleSubmit} method="POST">
              <div className="shadow sm:overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 space-y-6 bg-white sm:p-6">
                  <div className="col-span-6 sm:col-span-4">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Title
                    </label>
                    <input
                      {...getFieldProps("name")}
                      type="text"
                      name="name"
                      id="name"
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Description
                    </label>
                    <div className="mt-1">
                      <textarea
                        {...getFieldProps("description")}
                        id="description"
                        name="description"
                        rows={3}
                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                        defaultValue={""}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">160 characters</p>
                  </div>
                  <div>
                    <label
                      htmlFor="content"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Content
                    </label>
                    <div className="mt-1">
                      <textarea
                        {...getFieldProps("content")}
                        id="content"
                        name="content"
                        rows={12}
                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                        defaultValue={""}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Markdown content
                    </p>
                  </div>
                </div>
                <div className={`flex justify-between bg-gray-50`}>
                  <div className="px-4 py-3 text-right sm:px-6">
                    <button
                      type="button"
                      onClick={() => deleteBlog(edit)}
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
                    >
                      Delete
                    </button>
                  </div>
                  <div className="px-4 py-3 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-teal-600 border border-transparent rounded-md shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
