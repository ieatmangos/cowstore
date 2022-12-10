import swell from "swell-node";

export default async function getServerProduct(productId) {
  swell.init(process.env.SWELL_STORE_ID, process.env.SWELL_SECRET_KEY);

  const products = await swell.get(`/products/${productId}`, {
    expand: ["category", "reviews"],
  });
  return products;
}
