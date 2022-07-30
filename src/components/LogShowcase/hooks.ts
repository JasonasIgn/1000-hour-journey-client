import { useEffect, useState } from "react";
import { LogExtended } from "../../store/features/journeys/types";
import { generateId } from "../../utils";

interface CardLog extends LogExtended {
  key: string;
}

export const useAnimatedCards = (log?: LogExtended) => {
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

  return cards;
};
