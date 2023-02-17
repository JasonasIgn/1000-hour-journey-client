import { FC } from "react";
import {
  Flex,
  IconButton as ChakraIconButton,
  IconButtonProps,
} from "@chakra-ui/react";

export const IconButton: FC<IconButtonProps> = ({ icon, ...rest }) => {
  return (
    <ChakraIconButton
      icon={
        <>
          <Flex
            borderColor={rest.borderColor}
            // _hover={{
            //   borderColor: rest.borderColor,
            // }}
          />
          {icon}
        </>
      }
      {...rest}
    />
  );
};
