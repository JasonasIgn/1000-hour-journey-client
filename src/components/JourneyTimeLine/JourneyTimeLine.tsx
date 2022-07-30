import { Box, Slider, SliderThumb, SliderTrack } from "@chakra-ui/react";
import { FC, useState } from "react";
import { Journey } from "../../store/features/journeys/types";

interface JourneyTimeLineProps {
  journey: Journey;
}

export const JourneyTimeLine: FC<JourneyTimeLineProps> = ({ journey }) => {
  const [value, setValue] = useState(journey.totalHours);
  return (
    <Slider
      defaultValue={value}
      min={0}
      max={1000}
      colorScheme="teal"
      onChange={(v) => setValue(v)}
    >
      <SliderTrack display="flex">
        {journey.logs.map((log) => {
          const widthPercentage = log.hoursSpent / 10;
          return (
            <Box
              bg="red"
              width={`${widthPercentage}%`}
              boxShadow="-1px 0px 0 black"
              _hover={{ bg: "blue" }}
            />
          );
        })}
        {/* <SliderFilledTrack /> */}
      </SliderTrack>

      <SliderThumb />
    </Slider>
  );
};
