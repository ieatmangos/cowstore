import swell from "swell-node";

swell.init(process.env.SWELL_STORE_ID, process.env.SWELL_SECRET_KEY);
export default async function getServerProduct(productId) {
  const products = await swell.get(`/products/${productId}`, {
    expand: ["category", "reviews", "stock", "variants"],
  });

  return products;
}
