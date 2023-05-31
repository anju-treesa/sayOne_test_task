import React, { useState, useEffect } from "react";
import { Box, Button, Container, HStack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import useFirebaseAuth from "@/hooks/useFirebaseAuth";
import { signOut, auth } from "@/libs/firebase";
import Link from "next/link";

const Header = () => {
  const router = useRouter();
  const { authUser, loading } = useFirebaseAuth();

  const registerPageClickHandler = () => {
    router.push("/signup");
  };

  const loginPageClickHandler = () => {
    router.push("/login");
  };

  const SiginOutPageClickHandler = async () => {
    await signOut(auth);
  };

  return (
    <Box bg="white" as="header" w="full" h="20" p="4" boxShadow="md">
      <Container maxW="container.lg">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box
            cursor="pointer"
            as="h2"
            fontSize="2xl"
            fontWeight="black"
            letterSpacing="wider"
            textTransform="uppercase"
            onClick={() => router.push("/")}
          >
            Re-Events
          </Box>

          {!authUser && !loading ? (
            <Box>
              <Button
                mr="4"
                colorScheme="blue"
                onClick={registerPageClickHandler}
              >
                Register
              </Button>
              <Button colorScheme="green" onClick={loginPageClickHandler}>
                Login
              </Button>
            </Box>
          ) : (
            <HStack spacing="6">
              <Link href="/events">
                <Text fontSize="lg">My Events</Text>
              </Link>
              <Button
                mr="4"
                colorScheme="blue"
                onClick={SiginOutPageClickHandler}
              >
                Sign Out
              </Button>
            </HStack>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
