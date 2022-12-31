import { IconFarm, IconFarm1, IconSteak1 } from "@components/icons";
import {
  BoltIcon,
  ChatBubbleBottomCenterTextIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  ScaleIcon,
  CheckBadgeIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import ConsumeBeef from "./ConsumeBeef";

const transferFeatures = [
  {
    id: 1,
    name: "Better tasting meat",
    description:
      "We produce superior products in small sustainable pastures in Vermont. Grass fed for most of their life, we introduce a small portion of grain at the right time. Our cows are healthy, happy, and tasty.",
    icon: IconSteak1,
  },
  {
    id: 2,
    name: "Delivered to your door",
    description:
      "Butchered to order. We will hand deliver whenever possible, otherwise ship Fed Ex 2 day once the product is finished USDA inspection / packaging.",
    icon: TruckIcon,
  },
  {
    id: 3,
    name: "From farms you can visit",
    description:
      "Come visit us in Westmore, VT. We offer free tours of our farms and facilitites. You can see where and how your food grows, we'd love to show you.",
    icon: IconFarm1,
  },
];
const communicationFeatures = [
  {
    id: 1,
    name: "Pasture raised",
    description:
      "Farms in Vermont are unique in the fact the climate and ecology works great together",
    icon: ChatBubbleBottomCenterTextIcon,
  },
  {
    id: 2,
    name: "USDA inspected",
    description:
      "Just like when you buy from the grocery store, all our meat is butchered and packaged at USDA facilities. We take it from the butcher and deliver it to you! ",
    icon: EnvelopeIcon,
  },
];

export default function Feature1() {
  return (
    <div className="py-16 overflow-hidden bg-gray-50 lg:py-24">
      <div className="relative max-w-xl px-6 mx-auto lg:max-w-7xl lg:px-8">
        <svg
          className="absolute hidden transform -translate-x-1/2 left-full -translate-y-1/4 lg:block"
          width={404}
          height={784}
          fill="none"
          viewBox="0 0 404 784"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="b1e6e422-73f8-40a6-b5d9-c8586e37e0e7"
              x={0}
              y={0}
              width={20}
              height={20}
              patternUnits="userSpaceOnUse"
            >
              <rect
                x={0}
                y={0}
                width={4}
                height={4}
                className="text-teal-100"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect
            width={404}
            height={784}
            fill="url(#b1e6e422-73f8-40a6-b5d9-c8586e37e0e7)"
          />
        </svg>

        <div className="relative">
          <h2 className="text-3xl font-bold leading-8 tracking-tight text-center text-gray-900 sm:text-4xl">
            Vermont Pastures USDA Prime Beef
          </h2>
          <p className="max-w-3xl mx-auto mt-4 text-xl text-center text-gray-500">
            Tradionally small VT farms sell beef cows to friends, and
            neighborhood familes. A family can buy in 1/4, 1/2, and whole cows.
            Then feasts for 6 months using a chest freezer in the basement or
            garage. Cow Store was founded off the idea, that other parts of the
            US also want to have a treasure chest in their homes.
          </p>
        </div>

        <div className="relative mt-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:items-center lg:gap-8">
          <div className="relative">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              How much beef do you eat?
            </h3>
            <p className="mt-3 text-lg text-gray-500">
              Our mission is to connect families and farms, bringing the supply
              chain back to a local scale. Where Americans can buy direct from
              Vermont farmers who love to farm.
            </p>

            <dl className="mt-10 space-y-10">
              {transferFeatures.map((item) => (
                <div key={item.id} className="relative">
                  <dt>
                    <span className="absolute flex items-center justify-center w-12 h-12 text-white bg-teal-500 rounded-xl">
                      <item.icon className="w-8 h-8" aria-hidden="true" />
                    </span>
                    <span className="ml-16 text-lg font-medium leading-6 text-gray-900">
                      {item.name}
                    </span>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    {item.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative mt-10 -mx-4 lg:mt-0" aria-hidden="true">
            <svg
              className="absolute transform -translate-x-1/2 translate-y-16 left-1/2 lg:hidden"
              width={784}
              height={404}
              fill="none"
              viewBox="0 0 784 404"
            >
              <defs>
                <pattern
                  id="ca9667ae-9f92-4be7-abcb-9e3d727f2941"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width={784}
                height={404}
                fill="url(#ca9667ae-9f92-4be7-abcb-9e3d727f2941)"
              />
            </svg>
            {/* <img
              className="relative mx-auto"
              width={490}
              src="https://tailwindui.com/img/features/feature-example-1.png"
              alt=""
            /> */}

            <ConsumeBeef />
          </div>
        </div>

        <svg
          className="absolute hidden transform translate-x-1/2 translate-y-12 right-full lg:block"
          width={404}
          height={784}
          fill="none"
          viewBox="0 0 404 784"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d"
              x={0}
              y={0}
              width={20}
              height={20}
              patternUnits="userSpaceOnUse"
            >
              <rect
                x={0}
                y={0}
                width={4}
                height={4}
                className="text-gray-200"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect
            width={404}
            height={784}
            fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)"
          />
        </svg>

        <div className="relative mt-12 sm:mt-16 lg:mt-24">
          <div className="max-w-xl mx-auto">
            <div className="">
              <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Find your farmer
              </h3>
              <p className="mt-3 text-lg text-gray-500">
                We partner with farms in Vermont that demonstrate their ability
                to responibly manage and grow cattle in Vermont, taking great
                care of the ecosystem and community. All products are USDA
                inspected.
              </p>

              <dl className="mt-10 space-y-10">
                {communicationFeatures.map((item) => (
                  <div key={item.id} className="relative">
                    <dt>
                      <span className="absolute flex items-center justify-center w-12 h-12 text-white bg-teal-500 rounded-xl">
                        <item.icon className="w-8 h-8" aria-hidden="true" />
                      </span>
                      <span className="ml-16 text-lg font-medium leading-6 text-gray-900">
                        {item.name}
                      </span>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-500">
                      {item.description}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="relative mt-10 -mx-4 lg:col-start-1 lg:mt-0">
              <svg
                className="absolute transform -translate-x-1/2 translate-y-16 left-1/2 lg:hidden"
                width={784}
                height={404}
                fill="none"
                viewBox="0 0 784 404"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="e80155a9-dfde-425a-b5ea-1f6fadd20131"
                    x={0}
                    y={0}
                    width={20}
                    height={20}
                    patternUnits="userSpaceOnUse"
                  >
                    <rect
                      x={0}
                      y={0}
                      width={4}
                      height={4}
                      className="text-gray-200"
                      fill="currentColor"
                    />
                  </pattern>
                </defs>
                <rect
                  width={784}
                  height={404}
                  fill="url(#e80155a9-dfde-425a-b5ea-1f6fadd20131)"
                />
              </svg>
              {/* <img
                className="relative mx-auto"
                width={490}
                src="https://tailwindui.com/img/features/feature-example-2.png"
                alt=""
              /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
