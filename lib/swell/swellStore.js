import swell from "../swell";

const swellStore = async (name, fn, opt) => {
  return await swell[name][fn](opt);
};
export const swellStoreId = async (name, fn, id, opt) => {
  return await swell[name][fn](id, opt);
};
export default swellStore;
