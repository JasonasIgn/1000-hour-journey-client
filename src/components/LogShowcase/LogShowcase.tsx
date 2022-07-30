import { Flex } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { Log, LogExtended } from "../../store/features/journeys/types";
import { generateId } from "../../utils";
import { LogShowcaseCard } from "../LogShowcaseCard/LogShowcaseCard";

interface LogShowcaseProps {
  log?: LogExtended;
}

const getLeft = (position: number) => {
  if (position === 0) {
    return "-70%";
  }
  if (position === 1) {
    return "15%";
  }
  return "100%";
};

interface CardLog extends LogExtended {
  key: string;
}

export const LogShowcase: FC<LogShowcaseProps> = ({ log }) => {
  const [newLog, setNewLog] = useState<LogExtended>();
  const [cards, setCards] = useState<Array<Partial<CardLog>>>([
    { key: generateId(7) },
    { key: generateId(7) },
    { key: generateId(7) },
  ]);

  useEffect(() => {
    if (log) {
      let tempCards = [...cards];
      const shouldShiftLeft = log.id >= (newLog?.id || 0);
      setNewLog(log);
      tempCards[0] = { ...tempCards[0], ...log };
      tempCards[2] = { ...tempCards[2], ...log };
      if (shouldShiftLeft) {
        tempCards.shift();
        tempCards[2] = { key: generateId(7) };
      } else {
        tempCards[2] = tempCards[1];
        tempCards[1] = tempCards[0];
        tempCards[0] = { key: generateId(7) };
      }
      console.log(tempCards);
      setCards(tempCards);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [log]);
  return (
    <Flex
      height="70%"
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
            transition="left 0.25s"
            bg="red"
          />
        );
      })}
    </Flex>
  );
};
