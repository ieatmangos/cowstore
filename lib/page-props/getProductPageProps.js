import getServerProduct from "@lib/swell/products/getServerProduct";

export default async function getProductPageProps(filter) {
  const product = await getServerProduct(filter);

  const staticProps = {
    props: {
      product: !product ? [] : product,
    },
    revalidate: 5,
  };
  return staticProps;
}
