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
      // Implement your authentication logic here
      console.log("Authentication data:", data);

      const promise = toast.promise(authenticateUser(data), {
        success: {
          title: "Authentication successful!",
          description: "You are now logged in.",
        },
        error: {
          title: "Authentication failed",
          description: "Invalid email or password.",
        },
        loading: {
          title: "Authenticating...",
          description: "Please wait",
        },
      });

      await promise;
      reset();
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  };

  const authenticateUser = async (data: FormValues) => {
    // Implement your authentication API call or logic here
    // For example, you can use fetch or axios to send data to the server
    // and handle the authentication process
    // Replace the following with your actual authentication logic

    // Simulating a delay for demonstration purposes
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulating successful authentication
    // Replace the following with your actual success/error handling logic
    const success = true;

    if (success) {
      // Authentication successful
      console.log("User authenticated successfully:", data);
    } else {
      // Authentication failed
      throw new Error("Authentication failed");
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
