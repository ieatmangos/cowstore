import { createContext, useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import swell from "../swell";
import { CartContext } from "./cartContext";

// add fields to share in global context here
const normalizeCartItems = (cart) => {
  if (!cart) return null;
  // const addField = (field) => {
  //   return { [field]: cart[field] };
  // };
  // const res = {
  //   ...addField("itemQuantity"),
  //   ...addField("items"),
  //   ...addField("subTotal"),
  //   ...addField("taxTotal"),
  //   ...addField("grandTotal"),
  //   ...addField("id"),
  // };
  return cart;
};

export default function useCart() {
  const { cart, setCart } = useContext(CartContext);
  // const [data, setCart] = useState(null);

  async function getCart() {
    let result = null;

    try {
      const product = await swell.cart.get();
      result = product ? product : null;
    } catch (error) {
      console.log("error", error);
      result = error;
    }
    // console.log("set 1", result);
    setCart(normalizeCartItems(result));
  }
  let ref = useRef(true);
  useEffect(() => {
    // console.log(cart);
    if (ref.current && !cart) {
      getCart();
      ref.current = false;
    }
  }, []);

  const add = async ({ id, purchase_option, options }) => {
    toast.success("Added to cart!");
    try {
      const result = await swell.cart.addItem({
        product_id: id,
        quantity: 1,
        // options: [
        //   { name: 'Size', value: 'S' },
        //   { name: 'Color', value: 'Midnight blue' }
        // ],
        options: options ? options : [],
        purchase_option: purchase_option
          ? purchase_option
          : {
              type: "standard", // standard, subscription, plan_id, plan
            },
      });

      setCart(normalizeCartItems(result));
    } catch (error) {
      toast.error("Could not add to cart");
    }
  };
  const updateQuantity = async (id, qty) => {
    let result = null;
    try {
      result = await swell.cart.updateItem(id, {
        quantity: qty,
      });
      // result && toast.success("Added to cart!");
      result && setCart(normalizeCartItems(result));
    } catch (error) {
      toast.error("Could not update cart");
    }
  };
  const remove = async (id) => {
    let result = null;
    try {
      result = await swell.cart.removeItem(id);
      // result && toast.success("Added to cart!");
      result && setCart(normalizeCartItems(result));
    } catch (error) {
      toast.error("Could not update cart");
    }
  };

  const update = async (object) => {
    let result = null;
    try {
      console.log(object);
      result = await swell.cart.update(object);
      console.log(result);
      // result && toast.success("Added to cart!");
      result && setCart(normalizeCartItems(result));
    } catch (error) {
      console.log(error);
      toast.error("Could not update cart");
    }
  };

  const emptyCart = !cart || cart.itemQuantity < 1;

  return { cart, add, emptyCart, update, updateQuantity, remove, getCart };
}
