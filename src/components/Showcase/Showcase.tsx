import { FC } from "react";
import { Flex } from "@chakra-ui/react";
import { Achievement, LogExtended } from "store/features/journeys/types";
import { ShiftDirection } from "types";
import { ShowcaseCard } from "components";
import { useAnimatedCards } from "./hooks";
import { getTransformValue } from "./utils";
import { useAppSelector } from "store/hooks";
import { getCurrentJourneyActivities } from "store/features/journeys/selectors";
import { getActivitiesDictionary } from "store/features/journeys/utils";

interface ShowcaseProps {
  item?: LogExtended | Achievement;
  shiftDirection: ShiftDirection;
  defaultJourneyImageSrc?: string;
  onEditAchievementClick: () => void;
  isJourneyFinished: boolean;
}

export const Showcase: FC<ShowcaseProps> = ({
  item,
  shiftDirection,
  defaultJourneyImageSrc,
  onEditAchievementClick,
  isJourneyFinished,
}) => {
  const cards = useAnimatedCards(shiftDirection, item);
  const activities = useAppSelector(getCurrentJourneyActivities);
  const activitiesDictionary = getActivitiesDictionary(activities);

  return (
    <Flex
      flex="1"
      width="100%"
      justifyContent="center"
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
          transform={getTransformValue(index)}
          defaultJourneyImageSrc={defaultJourneyImageSrc}
          onEditAchievementClick={onEditAchievementClick}
          activitiesDictionary={activitiesDictionary}
          isJourneyFinished={isJourneyFinished}
        />
      ))}
    </Flex>
  );
};
