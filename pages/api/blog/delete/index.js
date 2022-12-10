import deleteServerBlog from "@lib/swell/blogs/deleteServerBlog";

export default async function handler(req, res) {
  let result = null;

  const body = req.body;

  try {
    const _result = await deleteServerBlog(body.edit);
    result = _result;
  } catch (er) {
    result = "error";
  }
  return res.status(200).json(result);
}
