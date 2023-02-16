import { FC } from "react";
import { Flex } from "@chakra-ui/react";
import { SimpleHeader } from "components";
import { JourneysViewContent } from "./JourneysViewContent";

export const JourneysView: FC = () => {
  return (
    <>
      <SimpleHeader title="Journeys" />
      <Flex bg="paper.900" position="relative" overflow="hidden">
        {/* <Box
          position="absolute"
          left="10%"
          top="10%"
          boxShadow="0px 0px 250px 50px var(--chakra-colors-red)"
        />
        <Box
          left="50%"
          top="50%"
          boxShadow="0px 0px 250px 50px var(--chakra-colors-purple)"
          position="absolute"
        />
        <Box
          left="80%"
          top="80%"
          boxShadow="0px 0px 250px 50px var(--chakra-colors-blue)"
          position="absolute"
        />
        <Box
          left="80%"
          top="30%"
          boxShadow="0px 0px 250px 50px var(--chakra-colors-yellow)"
          position="absolute"
        />
        <Box
          left="50%"
          top="70%"
          boxShadow="0px 0px 250px 50px var(--chakra-colors-green)"
          position="absolute"
        /> */}
        <JourneysViewContent />
      </Flex>
    </>
  );
};
