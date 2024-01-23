"use client";

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormValues = {
  name: string;
  email: string;
  password: string;
};

const RegistrationForm = () => {
  const { register, handleSubmit, reset, watch, setValue } =
    useForm<FormValues>();

  const watchedValues = watch();

  const toast = useToast();

  useEffect(() => {
    const storedData = JSON.parse(
      localStorage.getItem("registrationFormData") || "{}"
    );
    Object.entries(storedData).forEach(([field, value]) => {
      setValue(field as keyof FormValues, value as string);
    });
  }, [setValue]);

  useEffect(() => {
    localStorage.setItem("registrationFormData", JSON.stringify(watchedValues));
  }, [watchedValues]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      // Implement your registration logic here
      console.log("Registration data:", data);

      const promise = toast.promise(registerUser(data), {
        success: {
          title: "Registration successful!",
          description: "You can now log in.",
        },
        error: {
          title: "Registration failed",
          description: "Something went wrong during registration.",
        },
        loading: {
          title: "Registering...",
          description: "Please wait",
        },
      });

      await promise;
      reset();
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const registerUser = async (data: FormValues) => {
    // Implement your registration API call or logic here
    // For example, you can use fetch or axios to send data to the server
    // and handle the registration process
    // Replace the following with your actual registration logic

    // Simulating a delay for demonstration purposes
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulating successful registration
    // Replace the following with your actual success/error handling logic
    const success = true;

    if (success) {
      // Registration successful
      console.log("User registered successfully:", data);
    } else {
      // Registration failed
      throw new Error("Registration failed");
    }
  };

  return (
    <Flex align="center" justify="center" minHeight="80vh">
      <Box>
        <Heading mb="20px">Register a new account!</Heading>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl mb="40px">
            <FormLabel mb="2px">Name:</FormLabel>
            <Input
              variant="flushed"
              type="text"
              {...register("name", { required: true })}
            />
          </FormControl>

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
            Register
          </Button>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
};

export default RegistrationForm;
