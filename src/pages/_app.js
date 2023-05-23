// pages/_app.js
import { ChakraProvider } from "@chakra-ui/react";

import { AuthUserProvider } from "../firebase_context";
function MyApp({ Component, pageProps }) {
  return (
    <div>
      <AuthUserProvider>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </AuthUserProvider>
    </div>
  );
}

export default MyApp;
