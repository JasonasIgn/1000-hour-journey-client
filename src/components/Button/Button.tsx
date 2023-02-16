import { FC } from "react";
import { Box, Button as ChakraButton, ButtonProps } from "@chakra-ui/react";

export const Button: FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <ChakraButton {...rest}>
      <Box mt="2px">{children}</Box>
    </ChakraButton>
  );
};
