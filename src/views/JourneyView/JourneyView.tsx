import { Container, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { JourneyTimeLine } from "../../components/JourneyTimeLine/JourneyTimeLine";
import { LogShowcase } from "../../components/LogShowcase/LogShowcase";
import { fetchJourneyEffect } from "../../store/features/journeys/effects";
import { getJourney } from "../../store/features/journeys/selectors";
import { Log } from "../../store/features/journeys/types";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

export const JourneyView: React.FC = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const journey = useAppSelector(getJourney);
  const [activeLog, setActiveLog] = useState<Log>();

  useEffect(() => {
    if (params.journeyId && journey?.id.toString() !== params.journeyId) {
      dispatch(fetchJourneyEffect({ id: params.journeyId }));
    }
  });

  if (!journey) {
    return <Text>Loading...</Text>;
  }

  console.log(journey);
  return (
    <Container maxW="6xl">
      <Flex flexDirection="column" alignItems="center" height="100vh" pt={10}>
        <LogShowcase log={activeLog} />
        <Flex paddingTop="5%" width="100%">
          <JourneyTimeLine journey={journey} setActiveLog={setActiveLog} />
        </Flex>
      </Flex>
    </Container>
  );
};
