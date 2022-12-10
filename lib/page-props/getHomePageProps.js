import { getAllProducts } from "@lib/swell";
import getCategoriesDetail from "@lib/swell/products/getCategoriesDetail";
import getServerProducts from "@lib/swell/products/getServerProducts";

export default async function getHomePageProps(filter) {
  const products = await getServerProducts(filter ? filter : []);

  const [categoriesDetail, catDetailsError] = await getCategoriesDetail();
  // const products = await getServerProducts();

  const tags = products
    ? Array.from(
        new Set(products.results.map((product) => [...product.tags]).flat())
      )
    : [];

  // Generate static pages for each product
  const staticProps = {
    props: {
      products: !products ? [] : products.results,

      categories: !categoriesDetail ? [] : categoriesDetail,
    },
    revalidate: 5,
  };
  return staticProps;
}
