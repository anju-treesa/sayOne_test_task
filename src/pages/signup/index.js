import { useState } from "react";
import { useRouter } from "next/router";
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
import { auth, createUserWithEmailAndPassword } from "@/libs/firebase";
import ButtonComponenet from "@/components/button/Button";
import CustomInput from "@/components/input/Input";
import Head from "next/head";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const router = useRouter();
  const toast = useToast();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();

    const schema = Yup.object().shape({
      email: Yup.string()
        .email("Email must be valid!")
        .required("Email is required!"),
      passwordOne: Yup.string()
        .min(8, "Password needs to be minimum 8 characters in length")
        .required(),
      passwordTwo: Yup.string()
        .min(8, "Confirm password needs to be minimum 8 characters in length")
        .required()
        .oneOf([Yup.ref("passwordOne"), null], "Passwords must match"),
    });

    try {
      await schema.validate(
        {
          email,
          passwordOne,
          passwordTwo,
        },
        {
          abortEarly: false,
        }
      );

      setError(null);
      setIsLoading(true);

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
      router.push("/events");
    } catch (error) {
      setIsLoading(false);

      toast({
        // description: Array.isArray(error?.inner)
        //   ? error?.inner[0]?.message
        //   : error?.message || "Some error occured while registering.",
        description: "User Already exist!",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  return (
    <>
      <Head>
        <title>Register - Re-Events | Favourite events near you!</title>
      </Head>

      <Flex
        h="calc(100vh - 6rem)"
        w="100vw"
        flexDirection="column"
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
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    // children={<CFaLock color="gray.300" />}
                  />
                  <CustomInput
                    type="password"
                    name="passwordTwo"
                    value={passwordTwo}
                    onChange={(event) => setPasswordTwo(event.target.value)}
                    id="passwordTwo"
                    placeholder="Confirm Password"
                  />
                </InputGroup>
              </FormControl>

              <ButtonComponenet
                onSubmit={onSubmit}
                isLoading={isLoading}
                title="Sigin Up"
              />
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};

export default SignUp;
