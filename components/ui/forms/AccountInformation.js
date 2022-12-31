import FormInput from "./FormInput";

export default function AccountInformation({ formik }) {
  return (
    <div className={`space-y-6 mt-6`}>
      <>
        <FormInput
          formik={formik}
          label={`Email`}
          type={`email`}
          id={`email`}
          autoComplete={`email`}
          className={`mt-4`}
        />
        <FormInput
          formik={formik}
          label={`Password`}
          type={`password`}
          id={`password`}
          autoComplete={`password`}
          className={`mt-4`}
          //   msg={
          //     "Create an account by adding a password, or leave it blank to checkout as guest."
          //   }
        />
      </>
    </div>
  );
}
