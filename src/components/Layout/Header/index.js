import React from "react";
import { Box, Button, Container } from "@chakra-ui/react";

const Header = () => {
  return (
    <Box as="header" w="full" h="20" p="4" boxShadow="md" mb="4">
      <Container maxW="container.lg">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box
            as="h2"
            fontSize="2xl"
            fontWeight="black"
            letterSpacing="wider"
            textTransform="uppercase"
          >
            Re-Events
          </Box>
          <Box>
            <Button mr="4" colorScheme="blue">
              Register
            </Button>
            <Button colorScheme="green">Login</Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
