import getAllProducts from "../getAllProducts";
import getCategories from "../getCategories";
import getCategoriesDetail from "../getCategoriesDetail";
// import getServerCategories from "../getServerCategories";

export default async function getSearchPageProps(filter) {
  const [products, productError] = await getAllProducts(filter ? filter : []);
  const [categories, catError] = await getCategories();
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
      defaultProducts: productError || !products ? [] : products.results,
      categories: catError || !categories ? [] : categories,
      tags: !tags ? [] : tags,
      categoriesDetail: !categoriesDetail ? [] : categoriesDetail,
    },
    revalidate: 5,
  };
  return staticProps;
}
