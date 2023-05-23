import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthUserContext";

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
// import { FaUserAlt, FaLock } from "react-icons/fa";
// const CFaUserAlt = chakra(FaUserAlt);
// const CFaLock = chakra(FaLock);

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const router = useRouter();
  const [error, setError] = useState(null);

  const onSubmit = async (event) => {
    setError(null);

    //check if passwords match. If they do, create user in Firebase
    // and redirect to your logged in page.
    const createdUser = await createUserWithEmailAndPassword(
      auth,
      email,
      passwordOne
    );
    console.log("createdUser", createdUser);
    if (passwordOne === passwordTwo) {
    } else {
      setError("Password do not match");
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

                {/* <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </InputRightElement> */}
              </InputGroup>
              <FormHelperText textAlign="right">
                <Link>forgot password?</Link>
              </FormHelperText>
            </FormControl>
            <Button
              borderRadius={0}
              type="submit"
              variant="solid"
              colorScheme="teal"
              width="full"
              onClick={onSubmit}
            >
              Login
            </Button>
          </Stack>
        </Box>
      </Stack>
      <Box>
        New to us?{" "}
        <Link color="teal.500" href="#">
          Sign Up
        </Link>
      </Box>
    </Flex>
  );
};

export default SignUp;
