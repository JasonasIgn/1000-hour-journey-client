import { Box, Flex, Heading } from "@chakra-ui/react";
import { FC } from "react";

interface JourneyTitleProps {
  title: string;
}

export const JourneyTitle: FC<JourneyTitleProps> = ({ title }) => {
  return (
    <Flex height="40px" alignItems="center" justifyContent="center">
      <Box
        width="full"
        height="4px"
        bg="transparent"
        ml={6}
        boxShadow="-15px 0px 4px var(--chakra-colors-brand-100)"
      />
      <Heading
        px={5}
        whiteSpace="nowrap"
        width="full"
        textAlign="center"
        mb={2}
        flex={0}
      >
        {title}
      </Heading>
      <Box
        width="full"
        height="4px"
        mr={6}
        bg="transparent"
        boxShadow="15px 0px 4px var(--chakra-colors-brand-100)"
      />
    </Flex>
  );
};
