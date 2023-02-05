import { FC } from "react";
import { Flex } from "@chakra-ui/react";
import { Achievement, LogExtended } from "store/features/journeys/types";
import { ShiftDirection } from "types";
import { ShowcaseCard } from "components";
import { useAnimatedCards } from "./hooks";
import { getTransformValue } from "./utils";

interface ShowcaseProps {
  item?: LogExtended | Achievement;
  shiftDirection: ShiftDirection;
  defaultJourneyImageSrc?: string;
}

export const Showcase: FC<ShowcaseProps> = ({
  item,
  shiftDirection,
  defaultJourneyImageSrc,
}) => {
  const cards = useAnimatedCards(shiftDirection, item);

  return (
    <Flex
      flex="1"
      width="100%"
      justifyContent="center"
      alignItems="center"
      position="relative"
      overflow="hidden"
    >
      {cards.map((card, index) => (
        <ShowcaseCard
          key={card.key}
          item={card.data}
          opacity={index === 1 ? 1 : 0.1}
          zIndex={index === 1 ? 10 : 1}
          transition="opacity 0.6s, transform 0.6s"
          border="1px solid"
          borderColor="brand.600"
          transform={getTransformValue(index)}
          defaultJourneyImageSrc={defaultJourneyImageSrc}
        />
      ))}
    </Flex>
  );
};
