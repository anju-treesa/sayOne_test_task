import { Box } from "@chakra-ui/react";
import React from "react";

import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <main>
      <Header />
      <Box pt="6" as="section" bg="gray.100" w="full" h="full">
        {children}
      </Box>
    </main>
  );
};

export default Layout;
