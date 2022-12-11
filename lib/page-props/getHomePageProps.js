import { getAllProducts } from "@lib/swell";
import getCategoriesDetail from "@lib/swell/products/getCategoriesDetail";
import getServerProducts from "@lib/swell/products/getServerProducts";

function getReviewsFromProducts(products, limit) {
  const allreviews = products
    .sort((a, b) =>
      new Date(a.date_updated) < new Date(b.date_created) ? -1 : 1
    )
    .map((p) => p.reviews.results)
    .flat();
  const res = [];
  for (let p = 0; p < limit; p++) {
    res.push(allreviews[p]);
  }
  return res;
}
export default async function getHomePageProps(filter) {
  const products = await getServerProducts(filter ? filter : []);
  const reviews = getReviewsFromProducts(products.results, 3);
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
      reviews,
      categories: !categoriesDetail ? [] : categoriesDetail,
    },
    revalidate: 5000,
  };
  return staticProps;
}
