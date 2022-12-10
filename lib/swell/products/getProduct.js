import swell from "../swell";

export default async function getProduct(id) {
  let result = "default";

  try {
    const product = await swell.products.get(id);
    result = product.results ? product.results : product;
  } catch (error) {
    console.log("error", error);
    result = error;
  }
  return result;
}
