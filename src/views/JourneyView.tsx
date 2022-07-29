import { Container } from "@chakra-ui/react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
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

  return (
    <Container maxW="6xl" pt={10}>
      journey view {params.journeyId}
    </Container>
  );
};
