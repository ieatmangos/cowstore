import { getSearchPageProps } from "@lib/swell";
import SearchPage from "@components/search/SearchPage";
import useSearch from "@lib/swell/products/search/useSearch";
import swell from "swell-node";

const Store = ({ defaultProducts, categories, tags, extra }) => {
  const { filter, active, filteredProducts } = useSearch(defaultProducts);
  const storeProps = {
    categories,
    tags,
    active,
    filter,
    products: filteredProducts,
  };
  return <SearchPage {...storeProps} />;
};

export default Store;

export async function getStaticProps(props) {
  const staticProps = await getSearchPageProps();
  swell.init(process.env.SWELL_STORE_ID, process.env.SWELL_SECRET_KEY);

  const products = await swell.get(`/products`, {
    where: { active: true },
    limit: 25,
    page: 1,
    expand: ["reviews", "variants"],
    include: ["categories"],
  });
  let ref = staticProps;
  ref.props.extra = products;
  return ref;
}
