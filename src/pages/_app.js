// pages/_app.js
import { ChakraProvider } from "@chakra-ui/react";

import { AuthUserProvider } from "../contexts/AuthUserContext";
function MyApp({ Component, pageProps }) {
  return (
    <AuthUserProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthUserProvider>
  );
}

export default MyApp;
