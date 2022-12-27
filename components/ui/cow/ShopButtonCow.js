import Link from "next/link";
import React, { useState } from "react";
import Cow from "./cow";

export default function ShopButtonCow() {
  const [hov, setHov] = useState(false);
  return (
    <>
      <div className={`relative `}>
        <div className={`absolute inset-0 -top-16`}>
          <Cow hov={hov} />
        </div>
        <div className={`relative`}>
          <Link href="/collections/products">
            <div
              onMouseOver={() => setHov(true)}
              onMouseLeave={() => setHov(false)}
              className="inline-block px-8 py-3 font-medium text-center text-teal-900 bg-teal-300 border border-transparent rounded-md hover:bg-teal-200"
            >
              Shop
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
