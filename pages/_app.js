import Layout from "@components/layout";
import { StoreProvider } from "@lib/context/StoreContext";
import { CartProvider } from "@lib/swell/cart/cartContext";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import "../styles/globals.css";
function MyApp({ Component, pageProps }) {
  return (
    <>
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
    </>
  );
}

export default MyApp;
