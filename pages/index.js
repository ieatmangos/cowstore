import Homepage from "@components/home/Homepage";
import getHomePageProps from "@lib/page-props/getHomePageProps";
import { getSearchPageProps } from "@lib/swell";

export default function index({ products, categories }) {
  return (
    <>
      <Homepage products={products} categories={categories} />
    </>
  );
}

export async function getStaticProps(props) {
  const staticProps = await getHomePageProps();

  return staticProps;
}
