import swell from "../swell";

const getUser = async () => {
  return await swell.account.get();
};
export default getUser;
