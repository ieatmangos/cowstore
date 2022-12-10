import swell from "../swell";

export default async function recover(newAccount, callback) {
  let result = "default";
  let error = false;
  try {
    const login = await swell.account.recover({
      email: newAccount.email,
      reset_url: `${process.env.NEXT_PUBLIC_STORE_URL}user/recover`,
    });
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
