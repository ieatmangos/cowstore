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
  const { product } = props;
  const img1 = product.images[0]
    ? product.images[0].file.url
    : "https://www.cow.store/assets/brand/logo_cow_only.png";
  const img2 = product.images[1]
    ? product.images[1].file.url
    : "https://www.cow.store/assets/brand/logo_cow_only.png";
  const img3 = product.images[2]
    ? product.images[2].file.url
    : "https://www.cow.store/assets/brand/logo_cow_only.png";
  const img4 = product.images[3]
    ? product.images[3].file.url
    : "https://www.cow.store/assets/brand/logo_cow_only.png";
  const productOg = `/api/og/product?productName=${props.product.slug}&img1=${img1}&img2=${img2}&img3=${img3}&img4=${img4}`;
  return (
    <>
      <Seo ogImage={productOg} title={props.product.name} />
      <ProductPage {...props} />
    </>
  );
}
