import { useState } from "react";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";

import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
} from "@chakra-ui/react";
import { auth, createUserWithEmailAndPassword } from "@/libs/firebase";
import ButtonComponenet from "@/components/button";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const router = useRouter();
  const toast = useToast();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (event) => {
    setError(null);
    setIsLoading(true);

    try {
      if (passwordOne !== passwordTwo) {
        throw new Error("Passwords not match");
      }

      const createdUser = await createUserWithEmailAndPassword(
        auth,
        email,
        passwordOne
      );

      toast({
        description: "User created successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast({
        description: error?.message || "Some error occured while registering.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Welcome</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <Stack
            spacing={4}
            p="1rem"
            backgroundColor="whiteAlpha.900"
            boxShadow="md"
          >
            <FormControl>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  // children={<CFaUserAlt color="gray.300" />}
                />
                <Input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  name="email"
                  id="signUpEmail"
                  placeholder="Email"
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  // children={<CFaLock color="gray.300" />}
                />
                <Input
                  type="password"
                  name="passwordOne"
                  value={passwordOne}
                  onChange={(event) => setPasswordOne(event.target.value)}
                  id="signUpPassword"
                  placeholder="Password"
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  // children={<CFaLock color="gray.300" />}
                />
                <Input
                  type="password"
                  name="passwordTwo"
                  value={passwordTwo}
                  onChange={(event) => setPasswordTwo(event.target.value)}
                  id="signUpPassword2"
                  placeholder="Confirm Password"
                />
              </InputGroup>
            </FormControl>
            {/* <Button
              borderRadius={0}
              type="submit"
              variant="solid"
              colorScheme="teal"
              width="full"
              onClick={onSubmit}
            >
              Register
            </Button> */}
            <ButtonComponenet onSubmit={onSubmit} isLoading={isLoading} />
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default SignUp;
