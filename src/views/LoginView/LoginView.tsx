import { Container, Flex } from "@chakra-ui/react";
import { LoginForm } from "components/LoginForm";
import { FC } from "react";

export const LoginView: FC = () => {
  return (
    <Container maxW="6xl">
      <Flex
        flexDirection="column"
        alignItems="center"
        height="calc(100vh - 60px)"
        pt={5}
      >
        <LoginForm />
      </Flex>
    </Container>
  );
};
