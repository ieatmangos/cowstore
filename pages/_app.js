import Layout from "@components/layout";
import { StoreProvider } from "@lib/context/StoreContext";
import { Toaster } from "react-hot-toast";
import "../styles/globals.css";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <StoreProvider>
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
      </StoreProvider>
    </>
  );
}

export default MyApp;
