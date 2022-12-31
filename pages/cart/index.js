import useCart from "@lib/swell/cart/useCart";

export default function Cart() {
  const { cart } = useCart();
  return <div>cart</div>;
}
