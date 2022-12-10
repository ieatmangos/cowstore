import toast from "react-hot-toast";
import swell from "../swell";

export default async function logout(callback) {
  let result = "default";
  let error = false;
  try {
    const login = await swell.account.logout();

    if (login.success) {
      toast.success("Log out successful");
    }
    result = login;
  } catch (error) {
    console.log("error", error);
    result = null;
    error = true;
  }
  return [result, error];
}
