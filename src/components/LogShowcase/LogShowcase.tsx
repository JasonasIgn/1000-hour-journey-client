import { Flex } from "@chakra-ui/react";
import { FC } from "react";
import { Achievement, LogExtended } from "../../store/features/journeys/types";
import { ShowcaseCard } from "../ShowcaseCard/ShowcaseCard";
import { useAnimatedCards } from "./hooks";

interface LogShowcaseProps {
  item?: LogExtended | Achievement;
}

const getLeft = (position: number) => {
  if (position === 0) {
    return "-70%";
  }
  if (position === 1) {
    return "17.5%";
  }
  return "100%";
};

export const LogShowcase: FC<LogShowcaseProps> = ({ item }) => {
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
        const left = getLeft(index);
        return (
          <ShowcaseCard
            key={card?.key || index}
            item={card.data}
            left={left}
            opacity={index === 1 ? 1 : 0.1}
          />
        );
      })}
    </Flex>
  );
};
