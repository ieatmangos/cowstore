import getCategoriesDetail from "@lib/swell/products/getCategoriesDetail";
import swell from "swell-node";

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
export default async function getHomePageProps(filters) {
  swell.init(process.env.SWELL_STORE_ID, process.env.SWELL_SECRET_KEY);
  const products = await swell.get(`/products`, {
    expand: ["category", "reviews"],
  });
  const categories = await swell.get("/categories", {
    where: {
      active: true,
    },
    limit: 25,
    page: 1,
  });
  const reviews = getReviewsFromProducts(products.results, 3);
  const tags = products
    ? Array.from(
        new Set(products.results.map((product) => [...product.tags]).flat())
      )
    : [];

  const staticProps = {
    props: {
      products: !products ? [] : products.results,
      reviews,
      categories: !categories ? [] : categories.results,
    },
    revalidate: 5000,
  };
  return staticProps;
}
