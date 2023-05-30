// pages/_app.js
import Layout from "@/components/Layout";
import { ChakraProvider } from "@chakra-ui/react";

import "react-datepicker/dist/react-datepicker.css";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
