import swell from "../swell";

export default async function passwordReset(newAccount, key) {
  let result = "default";
  let error = false;
  try {
    const login = await swell.account.recover({
      password: newAccount.password,
      password_reset_key: key,
    });
    if (login) {
    } else {
      error = true;
    }

    // if (login.id) {
    //   setCookie("cowstore-customer", login.id);
    // }
    result = login;
  } catch (error) {
    console.log("error", error);
    result = null;
    error = true;
  }
  return [result, error];
}
