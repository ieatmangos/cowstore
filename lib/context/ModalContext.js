import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [isOpen, setModalIsOpen] = useState(false);
  const [redirect, setRedirect] = useState(null);
  const open = () => {
    setModalIsOpen(true);
  };
  const close = () => {
    setModalIsOpen(false);
  };
  const [type, setType] = useState("sign_in"); // sign_in,
  // const getUser = async () => {
  //   return await swell.account.get();
  // };
  // const [user, updateUser] = useState(null);
  // const setUser = (act) => {
  //   setCookie("cowstore-customer", act.id);
  //   updateUser(act);
  // };

  // useEffect(() => {
  //   const customerCookie = getCookie(
  //     "b1857699dab00a8111a294b509de7157%3A13eaa3a6b51f6156e6d06e6336a21025087ededb5e96c048eadb040c8e1a9f48d591ea0800c5993fa524f4fb855b1e6c155c6b8405e765cf3850e8b5d428d8026f48122211b7f409f3ca54bf2d1ffb5e46fb5abb27bdfa84a7bf71d33f83127bed979d34855973cfb92baf"
  //   );
  //   if (!user && customerCookie) {
  //     console.log("customer cookie", customerCookie);
  //   }
  // }, []);

  const values = {
    isOpen,
    open,
    close,
    type,
    setType,
    setRedirect,
    redirect,
  };

  return (
    <>
      <ModalContext.Provider value={values}>{children}</ModalContext.Provider>
    </>
    //   <>{children}</>
  );
}

export function useModal() {
  const values = useContext(ModalContext);
  return values;
}
