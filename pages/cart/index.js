import useCart from "@lib/swell/cart/useCart";

export default function Cart() {
  const { cart } = useCart();
  console.log(cart);
  return <div>cart</div>;
}
