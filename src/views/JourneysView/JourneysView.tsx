import { FC } from "react";
import { Flex } from "@chakra-ui/react";
import { SimpleHeader } from "components";
import { JourneysViewContent } from "./JourneysViewContent";

export const JourneysView: FC = () => {
  return (
    <>
      <SimpleHeader title="Journeys" />
      <Flex overflow="auto" bg="brand.800">
        <JourneysViewContent />
      </Flex>
    </>
  );
};
