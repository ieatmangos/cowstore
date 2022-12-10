import StarRating from "@components/review/StarRating";
import PageTitle from "@components/ui/PageTitle";
import getServerProducts from "@lib/swell/products/getServerProducts";
import Link from "next/link";

export default function index({ products }) {
  return (
    <div>
      <PageTitle
        title={"Review Our Products"}
        msg={`Your satisfaction is important to us! If you have a moment, please leave a review of our pasture raised beef products to help others make informed buying decisions. Click on a product to create a new review.`}
      />

      <div className={`${products.length > 0 ? "bg-white" : "bg-gray-50"}`}>
        <div className="max-w-2xl px-4 py-16 mx-auto sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>

          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <Link key={product.id} href={`/review/${product.id}`}>
                <div href={product.href} className="group">
                  <div className="w-full overflow-hidden bg-gray-200 rounded-lg aspect-w-9 aspect-h-6 ">
                    <img
                      src={product.images[0].file.url}
                      alt={product.imageAlt}
                      className="object-cover object-center w-full h-full group-hover:opacity-75"
                    />
                  </div>
                  <h3 className="mt-4 text-sm text-center text-gray-700">
                    {product.name}
                  </h3>
                  <div
                    className={`mt-2 flex flex-col justify-center items-center`}
                  >
                    <StarRating
                      value={
                        product.reviews?.results.reduce(
                          (a, c) => a + c.rating,
                          0
                        ) || 0
                      }
                      onChange={() => {}}
                    />
                    <div className="mt-2 text-sm text-gray-700 ">
                      {product.reviews?.count || 0}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const products = await getServerProducts();

  // Generate static pages for each product
  const staticProps = {
    props: {
      products: !products ? [] : products.results,
    },
    revalidate: 5,
  };
  return staticProps;
}
