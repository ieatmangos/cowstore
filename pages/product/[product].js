import ProductPage from "@components/product/ProductPage";
import getProductPageProps from "@lib/page-props/getProductPageProps";
import { getAllProducts } from "@lib/swell";
import getServerProducts from "@lib/swell/products/getServerProducts";

export async function getStaticPaths() {
  const products = await getServerProducts();
  const paths = products.results.map((product) => ({
    params: { product: product.slug },
  }));
  return {
    paths: paths,
    fallback: false, // can also be true or 'blocking'
  };
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps({ params }) {
  const { product } = params;

  const staticProps = await getProductPageProps(product);
  return staticProps;
}

export default function ProductDisplayPage(props) {
  return <ProductPage {...props} />;
}
