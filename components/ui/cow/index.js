import React, { useEffect } from "react";
import styles from "./cow.module.css";
export default function Cow() {
  useEffect(() => {
    const moveEyes = (evt) => {
      const eye1 = document.getElementById("eye-left-detail1");
      const eye2 = document.getElementById("eye-right-detail1");
      const wrapper = document.getElementById("cow-wrapper");
      const x = -(wrapper.offsetWidth / 2 - evt.pageX) / 160;
      const y = -(wrapper.offsetHeight / 2 - evt.pageY) / 160;
      //   console.log(eye1, eye2, x, y);
      if (eye1) {
        eye1.style.transform = `translateY(${y}px) translateX(${x}px)`;
      }
      if (eye2) {
        eye2.style.transform = `translateY(${y}px) translateX(${x}px)`;
      }
    };
    window.addEventListener("mousemove", moveEyes);
    return () => {
      window.removeEventListener("mousemove", moveEyes);
    };
  }, []);
  return (
    <div id="cow-wrapper" className={`${styles["cow"]}`}>
      <div className={`${styles["head"]}`}>
        <div className={`${styles["face"]}`}>
          <div className={`${styles["horns"]}`}>
            <div className={`${styles["horn-left"]}`}></div>
            <div className={`${styles["horn-right"]}`}></div>
          </div>
          <div className={`${styles["ears"]}`}>
            <div className={`${styles["ear-left"]}`}>
              <div className={`${styles["ear-left-detail"]}`}></div>
            </div>
            <div className={`${styles["ear-right"]}`}>
              <div className={`${styles["ear-right-detail"]}`}></div>
            </div>
          </div>
          <div className={`${styles["eyes"]}`}>
            <div className={`${styles["eye-left"]}`}>
              <div
                id="eye-left-detail1"
                className={`${styles["eye-left-detail1"]}`}
              >
                <div className={`${styles["eye-left-detail2"]}`}></div>
              </div>
            </div>
            <div className={`${styles["eye-right"]}`}>
              <div
                id="eye-right-detail1"
                className={`${styles["eye-right-detail1"]}`}
              >
                <div className={`${styles["eye-right-detail2"]}`}></div>
              </div>
            </div>
          </div>
          <div className={`${styles["mouth"]}`}>
            <div className={`${styles["nostril-left"]}`}></div>
            <div className={`${styles["nostril-right"]}`}></div>
          </div>
        </div>
      </div>
      {/* <Grass /> */}
    </div>
  );
}

export const Grass = () => {
  return (
    <svg
      width="122"
      height="84"
      viewBox="0 0 122 126"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M67.9158 76.4866C67.9578 76.6928 72.3069 97.1871 72.1124 117.834C72.0882 119.974 72.047 122.275 71.9845 124.675L71.9574 125.676H78.3412L78.4078 124.772C78.527 123.133 78.592 121.625 78.6036 120.288C78.7303 105.52 67.9159 76.486 67.9159 76.486"
        fill="#4ADE80"
      />
      <path
        d="M58.182 125.678H60.9629L60.5021 124.377C59.436 121.37 56.6731 113.308 53.7934 102.739C55.5261 105.667 56.8626 107.928 57.5013 109.006C60.426 113.955 62.2162 123.77 62.4095 124.871L62.5504 125.677H71.586L71.636 124.98C71.6589 124.647 72.1709 116.763 69.4179 107.893C66.7019 99.1462 57.2785 76.835 57.1826 76.6121L55.3548 72.2926L55.3073 76.9808C55.3061 77.2866 55.2969 84.5474 60.7583 98.3393C61.9999 101.472 63.1414 104.577 64.1679 107.512C63.935 107.091 63.7009 106.671 63.4488 106.243C60.7088 101.547 55.2719 93.8985 49.8462 86.5522C47.1228 73.8113 45.0542 59.6604 45.3772 46.8705C45.7509 32.0435 49.0659 21.2725 51.7789 14.8476C54.7197 7.88762 60.5253 0.895172 60.5253 0.895172C60.5253 0.895172 38.5973 8.95842 40.6216 61.7988C40.7828 65.9879 41.2411 70.974 42.1393 76.2793C37.834 70.6187 32.9425 67.5149 32.9425 67.5149C32.9425 67.5149 38.3548 76.6554 44.139 86.4267C45.2614 91.5103 46.5479 96.6234 47.8415 101.415C40.115 89.2296 28.198 79.1337 28.198 79.1337C28.2801 79.2641 36.6091 92.3311 46.2076 112.415C48.1595 116.495 49.9829 120.748 51.6277 125.047L51.8656 125.675H55.1011L58.1816 125.674L58.182 125.678Z"
        fill="#86EFAC"
      />
      <path
        d="M28.6272 113.06C22.4188 93.3254 0.608154 68.0495 0.608154 68.0495C0.690228 68.2044 8.85304 83.8108 18.1805 107.804C20.3769 113.46 22.3129 119.234 23.9306 124.965L24.1302 125.674H31.4305L31.2668 124.556C30.691 120.664 29.804 116.794 28.6275 113.06"
        fill="#22C55E"
      />
      <path
        d="M121.685 35.219C121.685 35.219 106.981 52.5258 102.618 76.0696C101.259 83.4213 100.691 88.6495 100.42 93.7667C100.393 94.3362 100.363 94.9045 100.333 95.469C99.6651 89.0802 98.3148 82.8444 95.8834 77.6802C86.2055 57.1237 71.2016 42.6294 63.4788 37.9025C62.7555 37.4622 62.1952 37.4801 61.8136 37.9513C61.1928 38.7179 61.417 38.9599 64.2083 41.92C69.5056 47.541 82.4482 60.4671 88.9424 75.5875C97.3139 95.0827 90.7293 123.555 90.2506 123.955L90.1036 124.079C90.8214 120.113 90.0077 111.306 85.8953 96.3929C78.6107 69.979 57.3782 47.9901 57.3782 47.9901C57.5702 48.378 76.7615 86.9135 80.2629 95.9652C83.1284 103.395 82.591 119.802 82.3593 124.654L82.3118 125.675H99.7103L99.8074 124.811C99.9927 123.192 104.433 102.168 105.606 91.3826C108.874 61.4224 120.246 38.0865 121.53 35.5204L121.685 35.219Z"
        fill="#22C55E"
      />
      <path
        d="M25.0932 78.6689C20.9825 61.0774 26.9092 48.681 26.968 48.5584C26.968 48.5584 11.6706 68.6093 26.6018 104.28C32.5211 118.416 37.2143 123.769 38.9576 125.411L39.2393 125.677H43.5871L42.9114 124.276C40.5938 119.48 28.848 94.7433 25.0938 78.6695"
        fill="#4ADE80"
      />
    </svg>
  );
};
