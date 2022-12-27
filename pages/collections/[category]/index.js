import SearchPage from "@components/search/SearchPage";
import Seo from "@components/seo/Seo";
import getSearchProps from "@lib/page-props/getSearchProps";
import { getCategories, getSearchPageProps, useSearch } from "@lib/swell";

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

export default function CategorySearch({
  defaultProducts,
  categories,
  tags,
  title,
  category,
}) {
  const { filter, active, filteredProducts } = useSearch(
    defaultProducts,
    category
  );
  const storeProps = {
    categories,
    tags,
    active,
    filter,
    products: filteredProducts,
    category,
  };
  return (
    <>
      <Seo title={title} />
      <SearchPage {...storeProps} />
    </>
  );
}

export async function getStaticProps({ params }) {
  const { category } = params || null;
  const staticProps = await getSearchProps({
    categories: [category],
  });
  if (staticProps) {
    staticProps.props.category = category;
    const title = category
      .replace(/-/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    staticProps.props.title = title;
  }
  return staticProps;
}
