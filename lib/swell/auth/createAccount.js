import swell from "../swell";

export default async function createAccount(newAccount, callback) {
  let result = "default";
  let error = false;
  try {
    const res = await swell.account.create(newAccount);

    const login = await swell.account.login(
      newAccount.email,
      newAccount.password
    );
    callback && login && callback(login);

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
