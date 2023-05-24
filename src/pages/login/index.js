import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useFirebaseAuth from "@/hooks/useFirebaseAuth";
import { useToast } from "@chakra-ui/react";
import * as Yup from "yup";
import {
  Flex,
  Heading,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Avatar,
  FormControl,
} from "@chakra-ui/react";
import ButtonComponenet from "@/components/button/Button";
import CustomInput from "@/components/input/Input";
import { auth, signInWithEmailAndPassword } from "@/libs/firebase";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const router = useRouter();
  const toast = useToast();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { authUser, loading } = useFirebaseAuth();

  useEffect(() => {
    if (!loading && !authUser) router.push("/");
  }, [authUser, loading]);

  const onSubmit = async (event) => {
    event.preventDefault();

    const schema = Yup.object().shape({
      email: Yup.string()
        .email("Email must be valid!")
        .required("Email is required!"),
      passwordOne: Yup.string()
        .min(8, "Password needs to be minimum 8 characters in length")
        .required(),
    });

    try {
      await schema.validate(
        {
          email,
          passwordOne,
        },
        {
          abortEarly: false,
        }
      );

      setError(null);
      setIsLoading(true);

      const createdUser = await signInWithEmailAndPassword(
        auth,
        email,
        passwordOne
      );

      setIsLoading(false);
      router.push("/home");
    } catch (error) {
      setIsLoading(false);

      toast({
        description: "Incorrect username or password",
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
                <CustomInput
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  name="email"
                  id="email"
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
                <CustomInput
                  type="password"
                  name="passwordOne"
                  value={passwordOne}
                  onChange={(event) => setPasswordOne(event.target.value)}
                  id="passwordOne"
                  placeholder="Password"
                />
              </InputGroup>
            </FormControl>

            <ButtonComponenet
              onSubmit={onSubmit}
              isLoading={isLoading}
              title="Login"
            />
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default LoginPage;
