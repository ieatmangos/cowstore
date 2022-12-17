import swell from "../swell";

const submitOrder = async () => {
  return await swell.cart.submitOrder();
};
export default submitOrder;
