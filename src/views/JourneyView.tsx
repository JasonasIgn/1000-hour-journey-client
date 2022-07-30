import { Container, Flex, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { JourneyTimeLine } from "../components/JourneyTimeLine/JourneyTimeLine";
import { fetchJourneyEffect } from "../store/features/journeys/effects";
import { getJourney } from "../store/features/journeys/selectors";
import { useAppDispatch, useAppSelector } from "../store/hooks";

export const JourneyView: React.FC = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const journey = useAppSelector(getJourney);

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
        <Flex height="70%" width="70%" bg="red" padding={5}>
          journey log {params.journeyId}
        </Flex>
        <Flex paddingTop="10%" width="100%">
          <JourneyTimeLine journey={journey} />
        </Flex>
      </Flex>
    </Container>
  );
};
