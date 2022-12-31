import Homepage from "@components/home/Homepage";
import getHomePageProps from "@lib/page-props/getHomePageProps";

export default function index({ products, categories, reviews }) {
  return (
    <>
      <Homepage reviews={reviews} products={products} categories={categories} />
    </>
  );
}

export async function getStaticProps(props) {
  const staticProps = await getHomePageProps();

  return staticProps;
}
