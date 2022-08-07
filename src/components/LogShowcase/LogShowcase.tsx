import { Flex } from "@chakra-ui/react";
import { FC } from "react";
import { Log, LogExtended } from "../../store/features/journeys/types";
import { LogShowcaseCard } from "../LogShowcaseCard/LogShowcaseCard";
import { useAnimatedCards } from "./hooks";

interface LogShowcaseProps {
  log?: LogExtended;
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

export const LogShowcase: FC<LogShowcaseProps> = ({ log }) => {
  const cards = useAnimatedCards(log);
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
          <LogShowcaseCard
            logNumber={card.number || 0}
            key={card?.key || index}
            log={card as Log}
            left={left}
            transition="left 0.25s, opacity 0.2s"
            bg="red"
            opacity={index === 1 ? 1 : 0.1}
          />
        );
      })}
    </Flex>
  );
};
