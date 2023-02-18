import { FC } from "react";
import { Container, Flex } from "@chakra-ui/react";
import { LoginForm } from "components";

export const LoginView: FC = () => {
  return (
    <Container maxW="6xl">
      <Flex flexDirection="column" alignItems="center" pt="10vh">
        <LoginForm />
      </Flex>
    </Container>
  );
};
