// import useSWR from 'swr'

const SWELL_STORE_ID = process.env.SWELL_STORE_ID;

const SWELL_SECRET_KEY = process.env.SWELL_SECRET_KEY;
// const STORE_ID = "cow-store";
// const SECRET_KEY = "SxMkMuRqEKZOzC6zcCnQxjbKnjHLziP2";
const swell = require("swell-node");

// export default function handler(req, res) {
//   const { reviewId } = req.query;
//   return res.end(`Post: ${reviewId}`);
// }

// const fetcher = (url) => fetch(url).then((res) => res.json());
// const { data, error } = useSWR('/api/user', fetcher)

export default async function handler(req, res) {
  const store = swell.init(SWELL_STORE_ID, SWELL_SECRET_KEY, {
    cache: false,
  });
  const products = await store.get("/products", { active: true });
  return res.status(200).json({ ...products.results });
}
