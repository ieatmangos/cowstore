import ButtonGroup from "@components/ui/forms/ButtonGroup";
import FormDropdown from "@components/ui/forms/FormDropdown";
import { useFormik } from "formik";
import React, { useState } from "react";

const validate = (values) => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = "Required";
  } else if (values.firstName.length > 15) {
    errors.firstName = "Must be 15 characters or less";
  }

  if (!values.lastName) {
    errors.lastName = "Required";
  } else if (values.lastName.length > 20) {
    errors.lastName = "Must be 20 characters or less";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  return errors;
};
const initialValues = {
  months: 3,
  adults: 2,
  children: 0,
  type1: 0,
  type2: 0,
  type3: 0,
};
export default function ConsumeBeef() {
  const formik = useFormik({
    initialValues,
    // validate,
    onSubmit: (values) => {
      console.log("submit", values);
      //   alert(JSON.stringify(values, null, 2));
    },
  });
  const { values } = formik;
  const getTotal = (values) => {
    const people = values.adults + values.children * 0.7;
    const lbs = values.type1 * 1.3 + values.type2 * 0.7 + values.type3 * 1;

    return Math.ceil(people * lbs * 4 * values.months);
  };

  const [total, setTotal] = useState(false);
  const _total = getTotal(values);
  //   console.log(formik);
  return (
    <div className={`relative mx-3 sm:mx-12  xl:mx-20 `}>
      <div className="overflow-hidden bg-white rounded-lg shadow-lg">
        <form
          onSubmit={formik.handleSubmit}
          className="space-y-6"
          action="#"
          method="POST"
        >
          {/* Inputs */}
          <div className={`py-4 bg-white b space-y-6`}>
            <div className={`px-4 sm:px-6 `}>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Consumption Profile
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Understand what you consume today and plan for the future.
              </p>
            </div>

            <div className={`px-4 sm:px-6  grid grid-cols-3 gap-6`}>
              <FormDropdown
                formik={formik}
                onChange={formik.setFieldValue}
                id={"adults"}
                label={"Adults"}
                defaultPosition={initialValues.adults - 1}
                list={[
                  { id: 1, name: 1 },
                  { id: 2, name: 2 },
                  { id: 3, name: 3 },
                  { id: 4, name: 4 },
                  { id: 5, name: 5 },
                  { id: 6, name: 6 },
                  { id: 7, name: 7 },
                  { id: 8, name: 8 },
                  { id: 9, name: 9 },
                  { id: 10, name: 10 },
                ]}
              />
              <FormDropdown
                formik={formik}
                onChange={formik.setFieldValue}
                id={"children"}
                label={"Children"}
                defaultPosition={initialValues.children}
              />
              <FormDropdown
                formik={formik}
                onChange={formik.setFieldValue}
                id={"months"}
                label={"Months"}
                defaultPosition={initialValues.months - 1}
                list={[
                  { id: 1, name: 1 },
                  { id: 2, name: 2 },
                  { id: 3, name: 3 },
                  { id: 4, name: 4 },
                  { id: 5, name: 5 },
                  { id: 6, name: 6 },
                ]}
              />
            </div>

            <div className={`space-y-6 border-t pt-6 border-slate-200`}>
              <div className={`px-4 sm:px-6 `}>
                <h4 className="font-medium leading-6 text-gray-900 text-md">
                  Meals per week
                </h4>
                <p className="mt-1 text-sm text-gray-500">
                  What do you normally eat each week?{" "}
                </p>
              </div>
              <div className={`px-4 sm:px-6 space-y-6 `}>
                <ButtonGroup
                  formik={formik}
                  onChange={formik.setFieldValue}
                  id={"type1"}
                  label={`Steak`}
                  msg={`T-Bone, Tenderloin, NY-Strip, Delmonico, Porterhouse, Sirloin. `}
                />
                <ButtonGroup
                  formik={formik}
                  onChange={formik.setFieldValue}
                  id={"type2"}
                  label={`Ground beef`}
                  msg={`Burgers, Tacos, Burrito, Shepards pie.`}
                />
                <ButtonGroup
                  formik={formik}
                  onChange={formik.setFieldValue}
                  id={"type3"}
                  label={`Roasts`}
                  msg={`Stir fry, Crockpot, Kabobs, Roasts`}
                />
              </div>
            </div>
          </div>
          {/* End Inputs */}

          {/* Button group */}
          <div
            className={`flex items-center bg-slate-50 px-4 sm:px-6 py-4 border-t border-slate-200`}
          >
            {total && <div>{_total} lbs</div>}
            <button
              onClick={() => {
                setTotal(getTotal(values));
              }}
              type="submit"
              className="flex justify-center px-4 py-2 ml-auto text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-slate-900 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
              Calculate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
