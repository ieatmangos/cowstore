import React from "react";

export default function ProductImagesGrid({ product }) {
  const defaultImg = "/assets/brand/logo_text_vertical.png";
  const img1 = product.images[0] ? product.images[0].file.url : defaultImg;
  const img2 = product.images[1] ? product.images[1].file.url : defaultImg;
  const img3 = product.images[2] ? product.images[2].file.url : defaultImg;
  const img4 = product.images[3] ? product.images[3].file.url : defaultImg;
  return (
    <div className="max-w-2xl mx-auto mt-6 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
      <div className="hidden overflow-hidden rounded-lg aspect-w-3 aspect-h-4 lg:block">
        <img
          src={img1}
          alt={product.images[0].alt}
          className="object-cover object-center w-full h-full"
        />
      </div>
      <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
        <div className="overflow-hidden rounded-lg aspect-w-3 aspect-h-2">
          <img
            src={img2}
            // alt={product.images[1].alt}
            className="object-cover object-center w-full h-full"
          />
        </div>
        <div className="overflow-hidden rounded-lg aspect-w-3 aspect-h-2">
          <img
            src={img3}
            // alt={product.images[2].alt}
            className="object-cover object-center w-full h-full"
          />
        </div>
      </div>
      <div className="aspect-w-4 aspect-h-5 sm:overflow-hidden sm:rounded-lg lg:aspect-w-3 lg:aspect-h-4">
        <img
          src={img4}
          // alt={product.images[3].alt}
          className="object-cover object-center w-full h-full"
        />
      </div>
    </div>
  );
}
