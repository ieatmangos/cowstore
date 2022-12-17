import swell from "swell-node";

export default async function getServerCart(productId) {
  swell.init(process.env.SWELL_STORE_ID, process.env.SWELL_SECRET_KEY);

  const cart = await swell.get(`/cart/{id}`, {
    id: productId,
  });
  return cart;
}
