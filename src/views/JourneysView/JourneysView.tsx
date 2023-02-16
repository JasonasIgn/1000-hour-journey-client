import { FC } from "react";
import { Flex } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { SimpleHeader } from "components";
import { JourneysViewContent } from "./JourneysViewContent";
import { Button } from "components/Button";

export const JourneysView: FC = () => {
  return (
    <>
      <SimpleHeader title="Journeys">
        <Button leftIcon={<AddIcon />}>
          ADD JOURNEY
        </Button>
      </SimpleHeader>
      <Flex overflow="auto" bg="paper.900">
        <JourneysViewContent />
      </Flex>
    </>
  );
};
