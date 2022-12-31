import swell from "swell-node";

export default async function getSearchProps(filters) {
  swell.init(process.env.SWELL_STORE_ID, process.env.SWELL_SECRET_KEY);
  const products = await swell.get(`/products`, {
    expand: ["category", "reviews"],
    ...filters,
  });
  const _categories = await swell.get("/categories", {
    where: {
      active: true,
    },
    limit: 25,
    page: 1,
  });
  const categories = [
    {
      name: "All Products",
      description: "See everything we have to offer",
      slug: "products",
    },
    ..._categories.results,
  ];
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
      categories: !_categories ? [] : categories,
      tags: !tags ? [] : tags,
    },
    revalidate: 500,
  };
  return staticProps;
}
