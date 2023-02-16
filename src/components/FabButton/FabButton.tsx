import { FC } from "react";
import { Button, ButtonProps } from "@chakra-ui/react";

export const FabButton: FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <Button
      variant="rounded"
      position="fixed"
      bottom={10}
      right={10}
      height={50}
      width={50}
      {...rest}
    >
      {children}
    </Button>
  );
};
