import swell from "../swell";

const submitOrder = async () => {
  const order = await swell.cart.submitOrder();
  if (order && order.id) {
    await swell.cart.setItems([]);
  }
};
export default submitOrder;
