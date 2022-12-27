import useSearch from "@lib/swell/products/search/useSearch";
import Seo from "@components/seo/Seo";
import getSearchProps from "@lib/page-props/getSearchProps";
import CollectionsPage from "@components/search/CollectionsPage";

const Store = ({ defaultProducts, categories, tags, extra }) => {
  const { filter, active, filteredProducts } = useSearch(defaultProducts);
  const storeProps = {
    categories,
    tags,
    active,
    filter,
    products: filteredProducts,
  };

  return (
    <>
      <Seo title={"Collections"} />
      <CollectionsPage {...storeProps} />
    </>
  );
};

export default Store;

export async function getStaticProps(props) {
  // const staticProps = await getSearchPageProps();
  const staticProps = await getSearchProps();

  return staticProps;
}
