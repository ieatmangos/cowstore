import swell from "../swell";

const getCart = async (id) => {
  return await swell.cart.getOrder(id);
};
export default getCart;
