import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ProductsList({ products }) {
  return (
    <div className={`${products.length > 0 ? "bg-white" : "bg-gray-50"}`}>
      <div className="max-w-2xl px-4 py-16 mx-auto sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product, productIdx) => (
            <Link
              // as={product}
              key={product.id}
              href={`/collections/products/${product.slug}`}
            >
              <ProductCard product={product} productIdx={productIdx} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

const ProductCard = ({ product, productIdx }) => {
  const [display, setDisplay] = useState(product.images[0]);
  return (
    <div className="group">
      <div className="w-full overflow-hidden bg-gray-200 rounded-lg aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-8">
        <Image
          priority={productIdx === 0}
          src={display.file.url}
          alt={product.name}
          fill
          sizes="
          24vw
          (max-width: 1024px) 33vw,
          (max-width: 768px) 50vw,
          (max-width: 640px) 90vw
          "
          className="object-cover object-center w-full h-full transition duration-1000 scale-105 group-hover:scale-100"
        />
      </div>
      <ol className={`h-9 space-x-2 mt-2 flex items-center justify-start`}>
        {product.images.slice(0, 4).map((image, imgIdx) => {
          const isOn = !!(display.id === image.id);
          return (
            <li
              onClick={(e) => {
                e.preventDefault();
                setDisplay(product.images[imgIdx]);
              }}
              key={image.id + imgIdx}
              role="button"
              className={`${
                isOn ? "ring-4 group-hover:ring-rose-300 ring-rose-100" : ""
              } inline-flex w-9 h-9 rounded-md overflow-hidden bg-teal-100`}
            >
              <Image
                width={36}
                height={36}
                src={image.file.url}
                alt={product.name + " " + (imgIdx + 1)}
                className="object-cover object-center w-full h-full "
              />
            </li>
          );
        })}
      </ol>
      <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">${product.price}</p>
    </div>
  );
};
