import { Box } from "@chakra-ui/react";
import { FC } from "react";
import { Journey } from "../../store/features/journeys/types";

interface JourneyTimeLineProps {
  journey: Journey;
}

export const JourneyTimeLine: FC<JourneyTimeLineProps> = () => {
  return <Box width="100%" height={1} bg="red" />;
};
