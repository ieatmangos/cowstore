import toast from "react-hot-toast";
import swell from "../swell";

const getOrder = async (id) => {
  try {
    // const res = await swell.cart.getOrder();
    const res = await swell.account.getOrder(id);
    return res;
  } catch (e) {
    toast.error(e.message);
    return { items: [] };
  }
};
export default getOrder;
