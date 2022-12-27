import decodeHtml from "@lib/utils/decodeHtml";
import toast from "react-hot-toast";
import swell from "../swell";
import parse from "html-react-parser";

export default async function getCategoriesDetail() {
  let result = "default";
  let error = false;
  try {
    let data = await swell.categories.get("beef");
    let data2 = await swell.categories.get("lamb");

    if (data && data2) {
      let ref1 = data;
      let ref2 = data2;
      ref1.description = parse(ref1.description);
      ref2.description = parse(ref2.description);

      result = [ref1, ref2];
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
