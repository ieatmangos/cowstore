import getServerBlog from "@lib/swell/blogs/getServerBlog";
import { makeSlug } from "@lib/utils";

export default async function handler(req, res) {
  let result = null;

  // const body = {
  //   parent_id: "637549de6066500013fcec0b",
  //   title: "Review Title",
  //   rating: 5,
  //   comments: "Really awesome stuff",
  // };
  const body = req.body;

  try {
    const _result = await getServerBlog(body.edit);
    result = _result;
  } catch (er) {
    result = "error";
    // console.log("error", er);
  }
  return res.status(200).json(result);
}
