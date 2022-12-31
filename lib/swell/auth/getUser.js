import { useEffect, useState } from "react";
import swell from "../swell";

const getUser = async () => {
  return await swell.account.get();
};
export default getUser;

export const useAccount = () => {
  const [data, setData] = useState(null);
  // const getUserInside = async () => {
  //   const res = await swell.account.get();
  //   setData(res);
  // };
  // useEffect(() => {
  //   if (!data) {
  //     getUserInside();
  //   }
  // }, []);
  return data;
};
