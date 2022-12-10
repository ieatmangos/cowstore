import SearchPage from "@components/search/SearchPage";
import { getCategories, getSearchPageProps, useSearch } from "@lib/swell";
import React from "react";

export async function getStaticPaths() {
  const [categories] = await getCategories();
  const paths = categories.map((post) => ({
    params: { category: post.slug },
  }));
  return {
    paths: paths,
    fallback: false, // can also be true or 'blocking'
  };
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps({ params }) {
  const { category } = params;
  const staticProps = await getSearchPageProps([category]);
  return staticProps;
}

export default function CategorySearch({ defaultProducts, categories, tags }) {
  const { filter, active, filteredProducts } = useSearch(defaultProducts);
  const storeProps = {
    categories,
    tags,
    active,
    filter,
    products: filteredProducts,
  };
  return <SearchPage {...storeProps} />;
}
