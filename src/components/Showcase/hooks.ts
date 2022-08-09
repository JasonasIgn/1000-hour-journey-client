import { useEffect, useState } from "react";
import { Achievement, LogExtended } from "../../store/features/journeys/types";
import { ShiftDirection } from "../../types";
import { generateId } from "../../utils";

interface Card {
  key: string;
  data?: LogExtended | Achievement;
}

export const useAnimatedCards = (
  shiftDirection: ShiftDirection,
  item?: LogExtended | Achievement
) => {
  const [skipAnimation, setSkipAnimation] = useState(true);
  const [cards, setCards] = useState<Array<Card>>([
    { key: generateId() },
    { key: generateId() },
    { key: generateId() },
  ]);

  useEffect(() => {
    if (item) {
      let tempCards = [...cards];
      if (skipAnimation) {
        setSkipAnimation(false);
        tempCards[1] = { ...tempCards[1], data: item };
      }
      if (!skipAnimation) {
        tempCards[0] = { ...tempCards[0], data: item };
        tempCards[2] = { ...tempCards[2], data: item };
        if (shiftDirection === "left") {
          tempCards.shift();
          tempCards[2] = { key: generateId() };
        }
        if (shiftDirection === "right") {
          tempCards[2] = tempCards[1];
          tempCards[1] = tempCards[0];
          tempCards[0] = { key: generateId() };
        }
      }
      setCards(tempCards);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  return cards;
};
