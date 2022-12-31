import { HeartIcon as HeartFull } from "@heroicons/react/20/solid";
import { HeartIcon as HeartEmpty } from "@heroicons/react/24/outline";

export default function StarRating({ size, onChange, value }) {
  const _size = size ? size : "w-3.5";
  const list = [1, 2, 3, 4, 5];
  return (
    <div className={` flex justify-between items-center`}>
      <ul aria-hidden="true" className="flex justify-center group">
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
              // aria-label="Heart rating"
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
            </li>
          );
        })}
      </ul>
    </div>
  );
}
