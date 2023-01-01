import ProductPage from "@components/product/ProductPage";
import Seo from "@components/seo/Seo";
import getProductPageProps from "@lib/page-props/getProductPageProps";
import getServerProducts from "@lib/swell/products/getServerProducts";

export async function getStaticPaths() {
  const products = await getServerProducts();
  const paths = products.results.map((product) => ({
    params: { product: product.slug },
  }));
  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { product } = params;

  const staticProps = await getProductPageProps(product);
  return staticProps;
}

export default function ProductDisplayPage(props) {
  // console.log(props);
  return (
    <>
      <Seo
        ogImage={`/api/og/product?productName=${props.product.slug}`}
        title={props.product.name}
      />
      <ProductPage {...props} />
    </>
  );
}
