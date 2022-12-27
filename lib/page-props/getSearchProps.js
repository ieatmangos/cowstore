import swell from "swell-node";

export default async function getSearchProps(filters) {
  swell.init(process.env.SWELL_STORE_ID, process.env.SWELL_SECRET_KEY);
  const products = await swell.get(`/products`, {
    expand: ["category", "reviews"],
    ...filters,
  });
  const categories = await swell.get("/categories", {
    where: {
      active: true,
    },
    limit: 25,
    page: 1,
  });
  // const products = await getServerProducts();

  const tags = products
    ? Array.from(
        new Set(products.results.map((product) => [...product.tags]).flat())
      )
    : [];

  // Generate static pages for each product
  const staticProps = {
    props: {
      defaultProducts: !products ? [] : products.results,
      categories: !categories ? [] : categories.results,
      tags: !tags ? [] : tags,
    },
    revalidate: 500,
  };
  return staticProps;
}
