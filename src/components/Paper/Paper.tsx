import { FC } from "react";
import { FlexProps, Flex, forwardRef } from "@chakra-ui/react";
import { getPaperSx } from "./styles";
import { PaperVariant } from "./types";

export interface PaperProps extends FlexProps {
  level?: 1 | 2 | 3;
  ref?: any;
  variant?: PaperVariant;
}

export const Paper: FC<PaperProps> = forwardRef(
  ({ children, sx, level = 1, variant = "brand", ...rest }, ref) => {
    const stylesSx = getPaperSx(level, variant);
    return (
      <Flex sx={{ ...stylesSx, ...sx }} {...rest} ref={ref}>
        {children}
      </Flex>
    );
  }
);
