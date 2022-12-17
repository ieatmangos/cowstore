import getServerCart from "@lib/swell/cart/getServerCart";

export default async function sharePageProps({ cartId = "" }) {
  const cart = await getServerCart(cartId);
  return {
    cart: cart ? cart : null,
  };
}
