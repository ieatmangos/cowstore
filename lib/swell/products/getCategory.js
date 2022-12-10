import toast from "react-hot-toast";
import swell from "../swell";

export default async function getCategories(category) {
  let result = "default";
  let error = false;
  try {
    const data = await swell.categories.get(category);

    if (data) {
      result = data;
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
