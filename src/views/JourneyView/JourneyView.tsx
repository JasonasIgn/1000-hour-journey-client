import { Flex } from "@chakra-ui/react";
import { FC, useEffect } from "react";
import { JourneyNavigation, SimpleHeader } from "components";
import { getJourney } from "store/features/journeys/selectors";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { Outlet, useParams } from "react-router";
import { fetchJourneyEffect } from "store/features/journeys/effects";
import { resetJourney } from "store/features/journeys/slice";

export const JourneyView: FC = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const journey = useAppSelector(getJourney);
  console.log(journey);

  useEffect(() => {
    if (params.journeyId && journey?.id.toString() !== params.journeyId) {
      dispatch(fetchJourneyEffect({ journeyId: params.journeyId }));
    }

    return () => {
      dispatch(resetJourney());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <SimpleHeader title={`Journey '${journey?.title || "Loading..."}'`} />
      <JourneyNavigation journeyId={params.journeyId} />

      <Flex overflow="auto" flexGrow={1} flexDirection="column" bg="brand.900">
        <Outlet />
      </Flex>
    </>
  );
};
