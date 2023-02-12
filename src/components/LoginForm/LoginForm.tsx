import { useEffect, FC } from "react";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "store/hooks";
import { InputField } from "components";
import { LoginFormData } from "./types";
import { loginFormValidation } from "./validation";
import { loginEffect } from "store/features/auth/effects";
import { version } from "version";

interface LoginFormProps {}

export const LoginForm: FC<LoginFormProps> = () => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState, reset, setError } =
    useForm<LoginFormData>({
      defaultValues: {
        password: "",
      },
      resolver: yupResolver(loginFormValidation),
    });
  const { isSubmitting, errors } = formState;
  const onSubmit = async (data: LoginFormData) => {
    try {
      await dispatch(loginEffect({ data })).unwrap();
    } catch (e: any) {
      if (e?.code === "ERR_BAD_REQUEST") {
        setError("password", { message: "Invalid credentials" });
      }
    }
  };

  useEffect(() => {
    reset({ password: "" });
  }, [reset]);

  return (
    <Flex
      position="relative"
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      p={8}
      borderRadius={8}
      bg="brand.800"
      maxWidth={500}
      width="full"
      maxHeight={300}
      height="full"
      mt="140px"
      border="1px solid"
      borderColor="brand.700"
      direction="column"
      justifyContent="space-between"
    >
      <Box>
        <Heading textAlign="center">Log in</Heading>
        <Box mt={4}>
          <InputField
            type="password"
            label="Password"
            {...register("password")}
            errorMessage={errors.password?.message}
          />
        </Box>
      </Box>
      <Flex justifyContent="center" mt={5}>
        <Button
          type="submit"
          isDisabled={isSubmitting}
          width={40}
          mb={4}
          mt={2}
        >
          Login
        </Button>
      </Flex>
      <Text fontSize="12px" position="absolute" bottom="6px" left="10px">
        Version: {version}
      </Text>
    </Flex>
  );
};
