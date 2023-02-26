import { FC } from "react";
import { Flex } from "@chakra-ui/react";
import { HEADER_HEIGHT_PX, SimpleHeader } from "components";
import { JourneysViewContent } from "./JourneysViewContent";

export const JourneysView: FC = () => {
  return (
    <>
      <SimpleHeader title="Journeys" />
      <Flex bg="brand.900" height={`calc(100vh - ${HEADER_HEIGHT_PX}px)`}>
        <JourneysViewContent />
      </Flex>
    </>
  );
};
