import { useEffect, useState } from "react";
import swell from "../swell";

export default function useTrendingProducts() {
  const [data, setData] = useState(null);
  async function getTrendingProducts() {
    let result = "default";
    const sortMap = new Map([
      ["latest-desc", ""],
      ["price-asc", "price_asc"],
      ["price-desc", "price_desc"],
      ["trending-desc", "popularity"],
    ]);
    const mappedSort = sortMap.get("price-desc");

    try {
      const product = await swell.products.list({
        sort: mappedSort,
      });
      result = product.results ? product.results : product;
      setData(result);
    } catch (error) {
      console.log("error", error);
      result = error;
    }
  }
  useEffect(() => {
    getTrendingProducts();
  }, []);
  return data;
}
