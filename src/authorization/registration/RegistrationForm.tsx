"use client";

import { registerUser } from "@/db/authorization/registerUser";
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
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormValues = {
  username: string;
  email: string;
  password: string;
};

const RegistrationForm = () => {
  const { register, handleSubmit, reset, watch, setValue } =
    useForm<FormValues>();

  const watchedValues = watch();
  const router = useRouter();
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
      router.push("/authentication");
      reset();
    } catch (error) {
      console.error("Error during registration:", error);
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
              {...register("username", { required: true })}
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

