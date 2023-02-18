import { FC } from "react";
import { FlexProps, Flex, forwardRef } from "@chakra-ui/react";
import { getPaperSx } from "./styles";

export interface PaperProps extends FlexProps {
  level?: 1 | 2 | 3;
  ref?: any;
}

export const Paper: FC<PaperProps> = forwardRef(
  ({ children, sx, level = 1, ...rest }, ref) => {
    const stylesSx = getPaperSx(level);
    return (
      <Flex sx={{ ...stylesSx, ...sx }} {...rest} ref={ref}>
        {children}
      </Flex>
    );
  }
);
