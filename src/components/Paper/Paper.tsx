import { FC } from "react";
import { FlexProps, Flex } from "@chakra-ui/react";
import { getPaperSx } from "./styles";

export interface PaperProps extends FlexProps {
  level?: 1 | 2 | 3;
}

export const Paper: FC<PaperProps> = ({ children, level = 1, sx, ...rest }) => {
  const stylesSx = getPaperSx(level);
  return (
    <Flex sx={{ ...stylesSx, ...sx }} {...rest}>
      {children}
    </Flex>
  );
};
