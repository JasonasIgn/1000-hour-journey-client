import { Flex } from "@chakra-ui/react";
import { FC } from "react";
import { Achievement, LogExtended } from "../../store/features/journeys/types";
import { ShowcaseCard } from "../ShowcaseCard/ShowcaseCard";
import { useAnimatedCards } from "./hooks";
import { getLeftCssValue } from "./utils";

interface ShowcaseProps {
  item?: LogExtended | Achievement;
}

export const Showcase: FC<ShowcaseProps> = ({ item }) => {
  const cards = useAnimatedCards(item);

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
