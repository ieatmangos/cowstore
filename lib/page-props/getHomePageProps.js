import getCategoriesDetail from "@lib/swell/products/getCategoriesDetail";
import swellNode from "swell-node";

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
swellNode.init(process.env.SWELL_STORE_ID, process.env.SWELL_SECRET_KEY);
export default async function getHomePageProps(filters) {
  const products = await swellNode.get(`/products`, {
    expand: ["category", "reviews"],
  });
  const categories = await swellNode.get("/categories", {
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
