import { Flex } from "@chakra-ui/react";
import { FC } from "react";
import { Achievement, LogExtended } from "store/features/journeys/types";
import { ShiftDirection } from "types";
import { ShowcaseCard } from "components";
import { useAnimatedCards } from "./hooks";
import { getLeftCssValue } from "./utils";

interface ShowcaseProps {
  item?: LogExtended | Achievement;
  shiftDirection: ShiftDirection;
}

export const Showcase: FC<ShowcaseProps> = ({ item, shiftDirection }) => {
  const cards = useAnimatedCards(shiftDirection, item);

  return (
    <Flex
      height="65%"
      width="100%"
      justifyContent="center"
      position="relative"
      overflow="hidden"
    >
      {cards.map((card, index) => {
        const left = getLeftCssValue(index);
        return (
          <ShowcaseCard
            key={card.key}
            item={card.data}
            left={left}
            opacity={index === 1 ? 1 : 0.1}
          />
        );
      })}
    </Flex>
  );
};
