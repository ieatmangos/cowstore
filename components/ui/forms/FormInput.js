import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

export default function FormInput({
  label,
  type,
  id,
  autoComplete = "",
  formik,
  className,
  msg,
}) {
  return (
    <div className={`relative ${className}`}>
      <label
        htmlFor="email-address"
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="relative mt-1">
        <input
          type={type}
          id={id}
          name={id}
          autoComplete={autoComplete}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values[id]}
          className={`block w-full border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm 
                      ${
                        formik.touched[id] &&
                        formik.errors[id] &&
                        "!border-rose-500 focus:!ring-rose-300"
                      }
                      `}
        />
        {formik.touched[id] && formik.errors[id] && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <ExclamationCircleIcon
              className="w-5 h-5 text-rose-300"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
      {msg && <p className={`text-xs text-gray-500 max-w-sm mt-1`}>{msg}</p>}

      {formik.touched[id] && formik.errors[id] && (
        <p className="mt-2 text-sm text-rose-500" id="email-error">
          {formik.errors[id]}
        </p>
      )}
    </div>
  );
}
