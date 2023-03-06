import { Flex } from "@chakra-ui/react";
import { FC, useEffect } from "react";
import { JourneyNavigation } from "components";
import { getJourney } from "store/features/journeys/selectors";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { Outlet, useParams } from "react-router";
import { fetchJourneyEffect } from "store/features/journeys/effects";
import { resetJourney } from "store/features/journeys/slice";
import { setHeaderTitle } from "store/features/journey/slice";

export const JourneyView: FC = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const journey = useAppSelector(getJourney);

  useEffect(() => {
    if (params.journeyId && journey?.id.toString() !== params.journeyId) {
      dispatch(fetchJourneyEffect({ journeyId: params.journeyId }));
    }

    return () => {
      dispatch(resetJourney());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.journeyId]);

  useEffect(() => {
    dispatch(setHeaderTitle(`Journey '${journey?.title || "Loading..."}'`));
  }, [dispatch, journey?.title]);

  return (
    <>
      <JourneyNavigation journeyId={params.journeyId} />

      <Flex overflow="auto" flexGrow={1} flexDirection="column" bg="brand.900">
        <Outlet />
      </Flex>
    </>
  );
};
