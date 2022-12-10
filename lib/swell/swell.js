import swell from "swell-js";
// import node from "swell-node";

import { SWELL_STORE_ID, SWELL_PUBLIC_KEY } from "./const";
const options = {
  useCamelCase: true, // true | false (default is false)
};
swell.init(SWELL_STORE_ID, SWELL_PUBLIC_KEY, options);

export default swell;
