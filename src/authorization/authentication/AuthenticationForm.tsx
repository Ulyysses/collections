"use client";

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormValues = {
  email: string;
  password: string;
};

const AuthenticationForm = () => {
  const { register, handleSubmit, reset, watch, setValue } =
    useForm<FormValues>();

  const watchedValues = watch();

  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    const storedData = JSON.parse(
      localStorage.getItem("authenticationFormData") || "{}"
    );
    Object.entries(storedData).forEach(([field, value]) => {
      setValue(field as keyof FormValues, value as string);
    });
  }, [setValue]);

  useEffect(() => {
    localStorage.setItem(
      "authenticationFormData",
      JSON.stringify(watchedValues)
    );
  }, [watchedValues]);


  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      console.log(data);
      reset();
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  };

  return (
    <Flex align="center" justify="center" minHeight="80vh">
      <Box>
        <Heading mb="20px">Login to your account!</Heading>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl mb="40px">
            <FormLabel mb="2px">Email:</FormLabel>
            <Input
              variant="flushed"
              type="email"
              {...register("email", { required: true })}
            />
          </FormControl>

          <FormControl mb="40px">
            <FormLabel mb="2px">Password:</FormLabel>
            <Input
              variant="flushed"
              type="password"
              {...register("password", { required: true })}
            />
          </FormControl>
          <Flex justify="center">
            <Button colorScheme="teal" size="lg" mb="40px" type="submit">
              Login
            </Button>
          </Flex>
        </form>
        <Flex justify="center">
          <Link href="/registration">Do not have an account yet? Register</Link>
        </Flex>
      </Box>
    </Flex>
  );
};

export default AuthenticationForm;
