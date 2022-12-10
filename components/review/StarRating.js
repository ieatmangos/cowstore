import { HeartIcon as HeartFull } from "@heroicons/react/20/solid";
import { HeartIcon as HeartEmpty } from "@heroicons/react/24/outline";

export default function StarRating({ size, onChange, value }) {
  const _size = size ? size : "w-3.5";
  const list = [1, 2, 3, 4, 5];
  return (
    <div className={` flex justify-between items-center`}>
      <ul className="flex justify-center group">
        {list.map((i) => {
          const turnOn = i <= value;
          const prefex = turnOn ? "fas" : "far";
          return (
            <li
              key={`${i}-start`}
              onClick={() => {
                // onChange && alert(i);
                onChange && onChange(i);
              }}
              role="button"
              aria-label="Heart rating"
            >
              {turnOn ? (
                <HeartFull
                  className={` text-rose-400 group-hover:text-rose-500 mr-1 ${_size}`}
                />
              ) : (
                <HeartEmpty
                  className={` text-rose-400 group-hover:text-rose-500 mr-1 ${_size}`}
                />
              )}
              {/* <svg
                onClick={() => {
                  onChange && onChange(i);
                }}
                aria-hidden="true"
                focusable="false"
                data-icon="heart"
                class={` text-rose-400 group-hover:text-rose-500 mr-1 ${_size}`}
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                {turnOn ? (
                  <path
                    fill="currentColor"
                    d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"
                  ></path>
                ) : (
                  <path
                    fill="currentColor"
                    d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z"
                  ></path>
                )}
              </svg> */}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
