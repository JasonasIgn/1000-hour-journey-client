import { FC } from "react";
import { Flex, Heading } from "@chakra-ui/react";

export const HEADER_HEIGHT_PX = 60;

interface SimpleHeaderProps {
  title: string;
}

export const SimpleHeader: FC<SimpleHeaderProps> = ({ title }) => {
  return (
    <Flex
      width="100%"
      height={`${HEADER_HEIGHT_PX}px`}
      padding={2.5}
      alignItems="center"
      justifyContent="space-between"
      border="1px solid white"
      borderLeft="none"
    >
      <Heading
        whiteSpace="nowrap"
        width="full"
        textAlign="center"
        flex={0}
        size="lg"
        color="gray.200"
      >
        {title}
      </Heading>
    </Flex>
  );
};
