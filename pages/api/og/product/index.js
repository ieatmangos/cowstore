import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "experimental-edge",
};
const font = fetch(
  new URL("../../../../assets/font/Inter-Regular.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

export default async function handler(req) {
  const { searchParams } = req.nextUrl;
  const img1 = searchParams.get("img1");
  const img2 = searchParams.get("img2");
  const img3 = searchParams.get("img3");
  const img4 = searchParams.get("img4");
  //   const product = await getServerProduct("delmonico");
  const fontData = await font;
  if (!img1) {
    return new ImageResponse(<>Visit with &quot;?username=vercel&quot;</>, {
      width: 1200,
      height: 630,
    });
  }

  return new ImageResponse(
    (
      <div
        style={{
          fontFamily: '"Inter-Regular"',
        }}
        tw="bg-teal-300 relative flex w-[1200px] h-[630px]"
      >
        <div tw="ml-4 relative  w-[33vw] flex flex-col h-full ">
          <img
            style={{
              objectFit: "cover",
              marginBottom: 16,
              objectPosition: "center",
            }}
            width={"100%"}
            height={"50%"}
            src={img1}
          />
          {/* <img
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
            width={"100%"}
            height={"50%"}
            src={img2}
          /> */}
        </div>
        <div tw="mx-4  flex-grow flex flex-col h-full ">
          {/* <img
            style={{
              objectFit: "cover",
              marginBottom: 16,
              objectPosition: "center",
            }}
            width={"100%"}
            height={"50%"}
            src={img3}
          />
          <img
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
            width={"100%"}
            height={"50%"}
            src={img4}
          /> */}
        </div>
        <div tw="absolute top-40 bg-teal-300 p-1 rounded-full  left-[252px] flex">
          <svg
            width="320"
            height="320"
            viewBox="0 0 640 640"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="320"
              cy="320"
              r="281.186"
              fill="#5EEAD4"
              stroke="#134E4A"
              stroke-width="4"
            />
            <path
              d="M515.324 249.758C510.574 237.184 502.375 223.68 492.443 216.696C480.786 209.245 463.086 206.918 437.615 210.643C403.942 214.835 371.996 214.369 342.209 211.575C333.145 210.643 324.077 209.711 315.441 209.248C304.649 206.922 272.271 208.316 265.364 210.181C257.16 212.508 212.265 205.057 207.083 201.331C206.219 200.865 205.787 200.399 204.926 199.933L201.472 196.208C200.608 190.617 196.723 181.772 188.091 181.772C181.184 181.772 177.298 181.306 168.234 181.306C143.628 181.306 140.174 167.798 139.742 169.663C139.309 171.062 139.309 176.182 142.331 182.238C145.352 187.828 150.102 192.016 156.144 193.415C160.03 194.347 162.619 195.279 162.619 197.14C162.619 199.005 160.462 200.866 157.437 202.264C155.28 203.663 153.119 205.057 151.394 207.388C149.237 209.715 147.941 212.512 147.941 213.907C147.509 215.771 147.077 217.632 145.784 218.564C143.627 220.891 142.33 222.29 141.466 223.688C139.309 226.481 137.148 229.278 131.105 234.398C128.948 236.263 126.788 237.192 124.63 238.124C119.881 240.451 114.702 242.782 114.702 251.631V255.357C117.724 268.397 121.177 271.19 130.677 268.397C130.677 268.397 147.08 271.657 152.694 271.19C159.601 271.19 167.804 270.724 176.868 270.724C184.208 270.724 191.115 276.777 196.297 282.832C196.297 282.832 211.839 311.708 217.882 324.279C221.335 331.264 224.357 338.248 225.221 339.647C232.128 346.166 238.17 351.29 243.785 355.481C247.239 357.808 259.76 365.259 262.349 366.658C268.392 369.917 274.006 378.766 275.731 381.559C275.731 382.025 276.163 382.025 276.163 382.491C276.163 382.491 276.596 382.958 276.596 383.424C283.935 400.657 289.545 434.185 280.049 450.02C279.185 450.952 275.731 457.005 275.731 457.005C271.846 463.523 270.549 467.249 271.414 469.58C271.846 470.046 271.846 470.512 272.278 470.512H300.77C301.635 470.046 301.635 469.114 301.635 468.185C301.635 467.253 301.202 465.858 300.77 463.993C299.906 461.667 299.474 458.87 299.474 456.543L299.906 452.351C301.202 425.807 305.949 389.015 311.563 371.786C312.427 367.594 313.72 363.868 314.584 359.677C315.016 358.745 315.449 358.279 316.741 358.279C318.038 358.279 318.898 359.677 318.898 361.072C318.034 363.865 317.17 366.662 316.741 369.921C340.055 370.854 390.561 360.144 398.764 356.414C416.464 348.497 429.413 337.32 440.206 332.663C441.502 331.731 444.956 331.731 446.249 331.731C443.659 328.472 441.067 325.212 439.342 321.487C438.477 320.088 439.342 318.693 440.638 318.693C441.502 318.693 441.502 319.16 441.934 319.626C444.092 323.351 446.252 327.077 448.841 330.336C477.334 361.072 489.422 400.657 487.694 438.844C487.694 442.57 486.83 445.829 484.672 449.089C483.808 450.021 480.355 456.074 480.355 456.074C476.469 462.592 475.173 466.318 476.037 468.648C476.469 469.115 476.469 469.581 476.901 469.581C476.901 469.581 477.333 469.581 477.333 470.047H505.393C506.257 469.581 506.69 468.648 506.69 467.72C506.69 466.788 506.257 465.393 505.825 463.528C504.961 461.664 504.097 447.228 503.668 439.311C503.668 423.943 504.533 408.575 505.825 389.948C506.69 384.824 504.961 379.703 503.668 375.046C482.083 323.352 502.372 282.838 505.825 263.278C507.122 256.759 507.122 251.635 507.122 246.045C507.986 247.443 509.279 248.838 509.711 251.169C515.754 266.07 525.686 297.273 513.596 334.064C507.986 351.759 509.279 360.609 520.936 362.008L521.8 361.075C514.461 339.188 523.957 332.2 525.253 307.054C525.682 285.152 523.089 270.25 515.321 249.758L515.324 249.758Z"
              fill="#134E4A"
            />
            <path
              d="M450.151 340.111C448.855 337.784 443.244 336.852 440.223 337.784C436.769 339.183 432.884 341.51 428.134 344.303C435.041 375.971 432.02 407.173 417.341 441.169C417.341 441.635 417.341 441.635 416.909 442.101C415.613 445.36 414.32 448.153 412.592 451.417C411.295 453.744 409.138 456.54 409.138 456.54C405.253 463.059 403.956 466.785 404.82 469.115C405.253 469.582 405.253 470.048 405.685 470.048C405.685 470.048 406.117 470.048 406.117 470.514H434.177C435.041 470.048 435.473 469.115 435.473 468.187C435.473 467.255 435.041 465.86 434.609 463.995C433.312 460.27 433.312 456.078 434.609 451.887C438.062 439.312 448.855 403.919 457.922 390.881C464.829 379.239 463.965 365.269 462.24 357.352C459.215 350.822 455.33 346.164 450.152 340.111L450.151 340.111Z"
              fill="#134E4A"
            />
          </svg>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Inter-Regular",
          data: fontData,
          style: "normal",
        },
      ],
    }
  );
}
