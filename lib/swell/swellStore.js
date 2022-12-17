import swell from "../swell";

const swellStore = async (name, fn, opt) => {
  return await swell[name][fn](opt);
};
export default swellStore;
