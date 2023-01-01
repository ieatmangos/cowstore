import Image from "next/image";
import React from "react";

export default function ProductImagesGrid({ product }) {
  const defaultImg = "/assets/brand/logo_text_vertical.png";
  const img1 = product.images[0] ? product.images[0].file.url : defaultImg;
  const img2 = product.images[1] ? product.images[1].file.url : defaultImg;
  const img3 = product.images[2] ? product.images[2].file.url : defaultImg;
  const img4 = product.images[3] ? product.images[3].file.url : defaultImg;
  return (
    <div className="relative">
      <div
        className={`hidden sm:block max-w-2xl mx-auto sm:px-6 sm:grid lg:max-w-7xl sm:grid-cols-2 lg:grid-cols-3 gap-x-4 lg:gap-x-8 lg:px-8`}
      >
        <div className="hidden overflow-hidden rounded-lg aspect-w-3 aspect-h-4 lg:block">
          <Image
            src={img4}
            fill
            sizes={`(max-width: 1024px) 50vw, 25vw`}
            alt={product.name}
            className="object-cover object-center w-full h-full"
          />
        </div>
        <div className="hidden sm:grid sm:grid-cols-1 gap-y-4 lg:gap-y-8">
          <div className="overflow-hidden rounded-lg aspect-w-3 aspect-h-2">
            <Image
              src={img3}
              fill
              sizes={`(max-width: 1024px) 50vw, 25vw`}
              priority={true}
              // alt={product.images[1].alt}
              alt={product.name}
              className="object-cover object-center w-full h-full"
            />
          </div>
          <div className="overflow-hidden rounded-lg aspect-w-3 aspect-h-2">
            <Image
              src={img2}
              fill
              sizes={`(max-width: 1024px) 50vw, 25vw`}
              alt={product.name}
              // alt={product.images[2].alt}
              className="object-cover object-center w-full h-full"
            />
          </div>
        </div>
        <div className="aspect-w-4 aspect-h-5 sm:overflow-hidden sm:rounded-lg lg:aspect-w-3 lg:aspect-h-4">
          <Image
            src={img1}
            fill
            sizes={`(max-width: 1024px) 50vw, 25vw`}
            priority={true}
            alt={product.name}
            // alt={product.images[3].alt}
            className="object-cover object-center w-full h-full"
          />
        </div>
      </div>

      {/* Mobile */}
      <div
        className={`sm:hidden z-10 absolute  flex items-center justify-center inset-x-0 top-[364px]  space-x-5`}
      >
        <div
          className={`w-2 h-2 rounded-full ring-2 ring-white/75 bg-white/50`}
        ></div>
        <div
          className={`w-2 h-2 rounded-full ring-2 ring-white/75 bg-white/50`}
        ></div>
        <div
          className={`w-2 h-2 rounded-full ring-2 ring-white/75 bg-white/50`}
        ></div>
        <div
          className={`w-2 h-2 rounded-full ring-2 ring-white/75 bg-white/50`}
        ></div>
      </div>
      <div class="sm:hidden flex snap-x snap-mandatory  h-96 w-full  overflow-scroll">
        <div class="snap-center relative     shrink-0  grid w-full   ">
          <Image
            src={img1}
            fill
            sizes={`
          100vw`}
            priority={true}
            alt={product.name}
            className="object-cover object-center w-full h-full"
          />
        </div>
        <div class="snap-center relative     shrink-0  grid w-full   ">
          <Image
            src={img2}
            fill
            sizes={`
          100vw`}
            alt={product.name}
            className="object-cover object-center w-full h-full"
          />
        </div>
        <div class="snap-center relative     shrink-0  grid w-full   ">
          <Image
            src={img3}
            fill
            sizes={`
          100vw`}
            alt={product.name}
            className="object-cover object-center w-full h-full"
          />
        </div>
        <div class="snap-center relative     shrink-0  grid w-full   ">
          <Image
            src={img4}
            fill
            sizes={`
          100vw`}
            alt={product.name}
            className="object-cover object-center w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
