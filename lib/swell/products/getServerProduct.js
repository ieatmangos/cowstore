import swellNode from "swell-node";

export default async function getServerProduct(productId) {
  swellNode.init(process.env.SWELL_STORE_ID, process.env.SWELL_SECRET_KEY);
  const products = await swellNode.get(`/products/${productId}`, {
    expand: ["category", "reviews", "stock", "variants"],
  });

  return products;
}
