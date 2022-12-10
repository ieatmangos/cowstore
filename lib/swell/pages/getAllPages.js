import toast from "react-hot-toast";
import swell from "../swell";

export default async function getAllPages(filters) {
  let result = "default";
  let error = false;
  try {
    const data = await swell["content"]["list"](...["pages"]);
    // const data = await fetch('content', 'list', ['pages'])
    const pages =
      data?.results?.map(({ slug, body, ...rest }) => ({
        ...rest,
        url: `/${locale}/${slug}`,
        body: body ?? "",
      })) ?? [];
    result = pages;
  } catch (error) {
    console.log("error", error);
    result = null;
    error = true;
  }
  return [result, error];
}
