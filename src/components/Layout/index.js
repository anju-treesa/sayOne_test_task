import { Box } from "@chakra-ui/react";
import React from "react";

import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <Box as="main" w="100%" h="100%" overflowX="hidden">
      <Header />
      <Box as="section" w="full" h="full">
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
