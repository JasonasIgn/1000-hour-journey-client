import { Flex } from "@chakra-ui/react";
import { FC } from "react";
import { SimpleHeader } from "components";
import { getJourney } from "store/features/journeys/selectors";
import { useAppSelector } from "store/hooks";
import { JourneyViewContent } from "./JourneyViewContent";

export const JourneyView: FC = () => {
  const journey = useAppSelector(getJourney);

  return (
    <>
      <SimpleHeader title={`Journey '${journey?.title || "Loading..."}'`} />
      <Flex overflow="auto" flexGrow={1} flexDirection="column">
        <JourneyViewContent />
      </Flex>
    </>
  );
};
