const defaultAccount = {
  email: "",
  email_optin: false, // Optional
  password: "", // Optional
  metadata: {
    group: "buyers",
  },
};
const accountMetaDataOptions = [
  {
    name: "Customer",
    id: "buyers",
    description: "Purchase beef",
  },
  {
    name: "Vendor",
    id: "vendors",
    description: "Sell from your farm",
  },
];
export { defaultAccount, accountMetaDataOptions };
