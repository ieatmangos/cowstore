import swell from "swell-node";

export default async function deleteServerBlog(arg) {
  swell.init(process.env.SWELL_STORE_ID, process.env.SWELL_SECRET_KEY);
  const blogs = await swell.delete(`/blogs/${arg}`);
  return blogs;
}
