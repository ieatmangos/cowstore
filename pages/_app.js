import Layout from "@components/layout";
import Seo from "@components/seo/Seo";
import { Modal } from "@components/ui/modal/";
import { ModalProvider } from "@lib/context/ModalContext";
import { StoreProvider } from "@lib/context/StoreContext";
import { CartProvider } from "@lib/swell/cart/cartContext";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import "../styles/globals.css";
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    document.body.classList?.remove("loading");
  }, []);
  return (
    <>
      <Seo title={"Home"} />

      <ModalProvider>
        <Modal />
        <CartProvider>
          <>
            <Toaster
              toastOptions={{
                success: {
                  iconTheme: {
                    primary: "#2DD4BF",
                    secondary: "#CCFBF1",
                  },
                },
                error: {
                  style: {
                    background: "#FCA5A5",
                  },
                },
              }}
            />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </>
        </CartProvider>
      </ModalProvider>
    </>
  );
}

export default MyApp;
