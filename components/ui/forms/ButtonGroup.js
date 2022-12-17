import React from "react";
const demo = [
  {
    id: 1,
    label: "1",
  },

  {
    id: 2,
    label: "2",
  },
  {
    id: 3,
    label: "3",
  },
  {
    id: 4,
    label: "4+",
  },
];
export default function ButtonGroup({
  list,
  label,
  msg,
  formik,
  onChange,
  id,
}) {
  let _list = list ? list : demo;

  return (
    <div className={`flex items-start justify-between space-x-6`}>
      <div className={``}>
        <div className="block text-sm font-medium text-gray-700">{label}</div>
        <p className="mt-1 text-sm text-gray-500">{msg} </p>
      </div>
      <div className="inline-flex mt-1 rounded-md shadow-sm isolate">
        {_list.map((item, itemIdx) => {
          return (
            <button
              key={itemIdx}
              type="button"
              onClick={() => {
                onChange(id, item.id);
              }}
              className={`
              ${itemIdx === 0 ? "rounded-l-md" : "-ml-px"}
              ${itemIdx === _list.length - 1 ? "rounded-r-md" : ""}
              ${formik.values[id] === item.id ? "bg-teal-100 " : ""}
              relative inline-flex items-center px-4 py-2  text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:z-10 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
