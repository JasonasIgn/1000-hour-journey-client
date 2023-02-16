import { FC } from "react";
import { FlexProps, Flex } from "@chakra-ui/react";
import { getPaperSx } from "./styles";

export interface PaperProps extends FlexProps {
  level: 1 | 2 | 3;
}

export const Paper: FC<PaperProps> = ({ children, level, ...rest }) => {
  const stylesSx = getPaperSx(level);
  return (
    <Flex sx={stylesSx} {...rest}>
      {children}
    </Flex>
  );
};
