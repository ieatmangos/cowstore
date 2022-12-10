import toast from "react-hot-toast";
import swell from "../swell";

export default async function getCategories() {
  let result = "default";
  let error = false;
  try {
    const data = await swell.categories.list({
      limit: 25,
      page: 1,
    });

    // const test = await fetch("http://localhost:3001/getProducts").then((res) =>
    //   res.json()
    // );
    if (data) {
      const categories =
        data.results.map(({ id, name, slug }) => ({
          id,
          name,
          slug,
          path: `/${slug}`,
        })) ?? [];
      result = categories;
    }
  } catch (error) {
    console.log("error", error);
    result = null;
    error = true;
  }
  return [result, error];
}

// const getCategories = async () => {
//   const data = await config.fetch("categories", "get");
//   return (
//     data.results.map(({ id, name, slug }) => ({
//       id,
//       name,
//       slug,
//       path: `/${slug}`,
//     })) ?? []
//   );
// };
