import { FC, useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import { HEADER_HEIGHT_PX } from "components";
import { JourneysViewContent } from "./JourneysViewContent";
import { useAppDispatch } from "store/hooks";
import { setHeaderTitle } from "store/features/journey/slice";

export const JourneysView: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setHeaderTitle("Journeys"));
  }, [dispatch]);

  return (
    <Flex bg="brand.900" height={`calc(100vh - ${HEADER_HEIGHT_PX}px)`}>
      <JourneysViewContent />
    </Flex>
  );
};
