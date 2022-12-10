import swell from "../swell";

export default async function login(newAccount, callback) {
  let result = "default";
  let error = false;
  try {
    const login = await swell.account.login(
      newAccount.email,
      newAccount.password
    );
    if (login) {
      callback && callback(login);
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
