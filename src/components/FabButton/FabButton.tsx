import { Button, ButtonProps } from "@chakra-ui/react";

export const FabButton: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <Button
      position="fixed"
      bottom={10}
      right={10}
      height={50}
      width={50}
      borderRadius="50%"
      {...rest}
    >
      {children}
    </Button>
  );
};
