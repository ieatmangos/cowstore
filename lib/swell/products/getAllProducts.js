import toast from "react-hot-toast";
import swell from "../swell";

export default async function getAllProducts(filters) {
  let result = "default";
  let error = false;
  try {
    const products = await swell.products.list({
      limit: 100, // Max. 100
      page: 1,
      categories: [...filters],
    });
    result = products;
  } catch (error) {
    console.log("error", error);
    result = null;
    error = true;
  }
  return [result, error];
}
