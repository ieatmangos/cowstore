import SearchPage from "@components/search/SearchPage";
import useSearch from "@lib/swell/products/search/useSearch";
import Seo from "@components/seo/Seo";
import getSearchProps from "@lib/page-props/getSearchProps";

// Duplicate of Collections Page for now
const AllProducts = ({ defaultProducts, categories, tags, extra }) => {
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
      <Seo title={"All Products"} />
      <SearchPage {...storeProps} />
    </>
  );
};

export default AllProducts;

export async function getStaticProps(props) {
  // const staticProps = await getSearchPageProps();
  const staticProps = await getSearchProps();

  return staticProps;
}
