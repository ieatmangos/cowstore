import getServerProduct from "@lib/swell/products/getServerProduct";
import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "experimental-edge",
};
// Make sure the font exists in the specified path:
const font = fetch(
  new URL("../../../assets/font/Inter-Regular.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

export default async function handler(req) {
  const { searchParams } = req.nextUrl;
  const productName = searchParams.get("productName");
  if (!productName) {
    return new ImageResponse(<>Cow Store</>, {
      width: 1200,
      height: 630,
    });
  }
  const product = await getServerProduct(productName);
  const fontData = await font;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          position: "relative",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          //   fontSize: 60,
          //   color: "black",
          //   background: "#f6f6f6",

          fontFamily: '"Inter"',
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",

            display: "flex",
          }}
          tw="justify-start bg-teal-300 items-center px-6 py-0 text-lg"
        >
          <svg
            class="h-8"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_39_9811)">
              <circle class="fill-teal-200" cx="16" cy="16" r="16"></circle>
              <path
                d="M25.5142 12.5785C25.2828 11.966 24.8834 11.3082 24.3996 10.968C23.8318 10.6051 22.9697 10.4917 21.729 10.6732C20.0888 10.8774 18.5327 10.8547 17.0818 10.7186C16.6403 10.6732 16.1986 10.6278 15.7779 10.6053C15.2522 10.4919 13.6751 10.5598 13.3387 10.6507C12.9391 10.764 10.7523 10.4011 10.4998 10.2196C10.4577 10.1969 10.4367 10.1742 10.3948 10.1515L10.2266 9.97004C10.1845 9.69775 9.99519 9.26688 9.57472 9.26688C9.23829 9.26688 9.04902 9.24417 8.60752 9.24417C7.40896 9.24417 7.24073 8.58623 7.21966 8.67707C7.19861 8.74518 7.19861 8.99459 7.34578 9.28958C7.49295 9.56188 7.72431 9.76586 8.01864 9.834C8.2079 9.87942 8.33402 9.92483 8.33402 10.0155C8.33402 10.1063 8.22895 10.1969 8.08161 10.2651C7.97654 10.3332 7.87129 10.4011 7.78727 10.5146C7.6822 10.628 7.61905 10.7642 7.61905 10.8322C7.598 10.923 7.57696 11.0136 7.51398 11.059C7.40891 11.1724 7.34577 11.2405 7.30367 11.3086C7.19859 11.4447 7.09335 11.5809 6.79899 11.8303C6.69392 11.9211 6.58867 11.9664 6.4836 12.0118C6.25224 12.1251 6 12.2386 6 12.6697V12.8512C6.14717 13.4864 6.31539 13.6224 6.77813 13.4864C6.77813 13.4864 7.57711 13.6451 7.85056 13.6224C8.187 13.6224 8.58659 13.5997 9.0281 13.5997C9.38558 13.5997 9.72202 13.8945 9.97445 14.1895C9.97445 14.1895 10.7315 15.596 11.0259 16.2084C11.1941 16.5486 11.3412 16.8888 11.3833 16.9569C11.7198 17.2745 12.0141 17.524 12.2876 17.7282C12.4558 17.8415 13.0657 18.2045 13.1919 18.2726C13.4862 18.4314 13.7597 18.8624 13.8437 18.9985C13.8437 19.0212 13.8647 19.0212 13.8647 19.0439C13.8647 19.0439 13.8858 19.0666 13.8858 19.0893C14.2433 19.9287 14.5165 21.5619 14.054 22.3332C14.0119 22.3786 13.8437 22.6734 13.8437 22.6734C13.6544 22.9909 13.5913 23.1724 13.6334 23.2859C13.6544 23.3086 13.6544 23.3313 13.6755 23.3313H15.0633C15.1054 23.3086 15.1054 23.2632 15.1054 23.218C15.1054 23.1726 15.0844 23.1046 15.0633 23.0138C15.0212 22.9005 15.0002 22.7642 15.0002 22.6509L15.0212 22.4467C15.0844 21.1538 15.3156 19.3616 15.589 18.5224C15.6311 18.3182 15.6941 18.1367 15.7362 17.9326C15.7572 17.8872 15.7783 17.8645 15.8413 17.8645C15.9044 17.8645 15.9463 17.9326 15.9463 18.0005C15.9042 18.1366 15.8621 18.2728 15.8413 18.4316C16.9769 18.477 19.437 17.9553 19.8366 17.7736C20.6987 17.388 21.3295 16.8436 21.8552 16.6168C21.9183 16.5713 22.0865 16.5713 22.1495 16.5713C22.0234 16.4126 21.8971 16.2538 21.8131 16.0723C21.771 16.0042 21.8131 15.9363 21.8762 15.9363C21.9183 15.9363 21.9183 15.959 21.9394 15.9817C22.0444 16.1632 22.1497 16.3446 22.2758 16.5034C23.6637 18.0005 24.2525 19.9287 24.1683 21.7888C24.1683 21.9703 24.1262 22.129 24.0211 22.2878C23.979 22.3332 23.8108 22.628 23.8108 22.628C23.6216 22.9456 23.5584 23.127 23.6005 23.2405C23.6215 23.2633 23.6215 23.286 23.6426 23.286C23.6426 23.286 23.6636 23.286 23.6636 23.3087H25.0304C25.0725 23.286 25.0936 23.2405 25.0936 23.1953C25.0936 23.1499 25.0725 23.082 25.0515 22.9912C25.0094 22.9003 24.9673 22.1972 24.9464 21.8115C24.9464 21.0629 24.9885 20.3144 25.0515 19.4071C25.0936 19.1575 25.0094 18.908 24.9464 18.6812C23.895 16.1632 24.8833 14.1898 25.0515 13.237C25.1146 12.9195 25.1146 12.6699 25.1146 12.3976C25.1567 12.4657 25.2197 12.5336 25.2407 12.6472C25.5351 13.373 26.0189 14.8929 25.43 16.685C25.1567 17.5469 25.2197 17.978 25.7875 18.0461L25.8296 18.0007C25.4721 16.9346 25.9347 16.5942 25.9978 15.3693C26.0187 14.3025 25.8924 13.5766 25.514 12.5785L25.5142 12.5785Z"
                fill="black"
              ></path>
              <path
                d="M22.3396 16.9799C22.2765 16.8665 22.0032 16.8211 21.856 16.8665C21.6878 16.9346 21.4986 17.048 21.2672 17.1841C21.6036 18.7266 21.4565 20.2465 20.7415 21.9024C20.7415 21.9251 20.7415 21.9251 20.7205 21.9478C20.6573 22.1065 20.5943 22.2426 20.5101 22.4015C20.447 22.5149 20.3419 22.6511 20.3419 22.6511C20.1527 22.9686 20.0895 23.1501 20.1316 23.2636C20.1527 23.2863 20.1527 23.309 20.1737 23.309C20.1737 23.309 20.1948 23.309 20.1948 23.3317H21.5615C21.6036 23.309 21.6247 23.2636 21.6247 23.2184C21.6247 23.173 21.6036 23.1051 21.5826 23.0142C21.5194 22.8328 21.5194 22.6286 21.5826 22.4244C21.7508 21.8119 22.2765 20.0879 22.7182 19.4529C23.0546 18.8858 23.0125 18.2053 22.9285 17.8197C22.7812 17.5016 22.5919 17.2747 22.3397 16.9799L22.3396 16.9799Z"
                fill="black"
              ></path>
            </g>
            <defs>
              <clipPath id="clip0_39_9811">
                <rect width="32" height="32" fill="white"></rect>
              </clipPath>
            </defs>
          </svg>
          <h1 tw="ml-2 flex justify-between flex-grow">
            Cow Store
            <span tx="ml-auto text-sm">Vermont, USA</span>
          </h1>
        </div>
        <div
          style={{
            display: "flex",
            position: "relative",
            width: "100%",
          }}
        >
          <img
            style={{
              height: "100%",
              width: "66.6%",
              objectFit: "cover",
              objectPosition: "center",
            }}
            src={`${product.images[0].file.url}`}
          />

          <div
            style={{
              height: "100%",
              width: "33.4%",
              backgroundColor: "cadetblue",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <img
              style={{
                height: "50%",
                width: "100%",
                objectFit: "cover",
                objectPosition: "center",
              }}
              src={`${product.images[1].file.url}`}
            />
            <img
              style={{
                height: "50%",
                width: "100%",
                objectFit: "cover",
                objectPosition: "center",
              }}
              src={`${product.images[2].file.url}`}
            />
          </div>
        </div>

        {/* <div tw="  bg-rose-400 rounded-lg relative">

          <img src={product.images[0].file.url} tw="flex-1  absolute inset-0" />
        
        
        </div> */}
        {/*         
        <div tw="max-w-2xl mx-auto mt-6 sm:px-6 grid max-w-7xl grid-cols-3 gap-x-8 px-8">
          <div className="overflow-hidden rounded-lg aspect-w-3 aspect-h-4">
            <img
              src={product.images[0].file.url}
              className="object-cover object-center w-full h-full"
            />
          </div>
          <div className="grid hidden grid-cols-1 gap-y-8">
            <div className="overflow-hidden rounded-lg aspect-w-3 aspect-h-2">
              <img
                src={product.images[1].file.url}
                className="object-cover object-center w-full h-full"
              />
            </div>
            <div className="overflow-hidden rounded-lg aspect-w-3 aspect-h-2">
              <img
                src={product.images[2].file.url}
                className="object-cover object-center w-full h-full"
              />
            </div>
          </div>
          <div className="aspect-w-4 aspect-h-5 sm:overflow-hidden sm:rounded-lg aspect-w-3 aspect-h-4">
            <img
              src={product.images[3].file.url}
              className="object-cover object-center w-full h-full"
            />
          </div>
        </div> */}
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Inter",
          data: fontData,
          style: "normal",
        },
      ],
    }
  );
}
