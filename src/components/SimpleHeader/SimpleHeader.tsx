import { FC, ReactNode } from "react";
import { Heading } from "@chakra-ui/react";
import { Paper } from "components/Paper";

export const HEADER_HEIGHT_PX = 60;

interface SimpleHeaderProps {
  title: string;
  children?: ReactNode;
}

export const SimpleHeader: FC<SimpleHeaderProps> = ({ title, children }) => {
  return (
    <Paper
      width="100%"
      height={`${HEADER_HEIGHT_PX}px`}
      minHeight={`${HEADER_HEIGHT_PX}px`}
      px={4}
      py={2.5}
      alignItems="center"
      justifyContent="space-between"
      bg="brand.700"
      sx={{
        borderRadius: 0,
        borderLeft: "none",
        borderTop: "none",
        borderRight: "none",
      }}
    >
      <Heading
        whiteSpace="nowrap"
        width="full"
        textAlign="center"
        flex={0}
        size="lg"
        color="gray.300"
      >
        {title}
      </Heading>
      {children}
    </Paper>
  );
};
