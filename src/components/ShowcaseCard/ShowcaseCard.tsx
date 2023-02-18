import { Flex, FlexProps, Heading } from "@chakra-ui/react";
import { Paper } from "components/Paper";
import { FC } from "react";
import { setViewedImageSrc } from "store/features/app/slice";
import { Achievement, LogExtended } from "store/features/journeys/types";
import { useAppDispatch } from "store/hooks";
import { getImageSrc } from "utils/helpers";
import { AchievementShowcaseCardContent } from "./AchievementShowcaseCardContent";
import { SHOWCASE_CARD_WIDTH_PX } from "./constants";
import { LogShowcaseCardContent } from "./LogShowcaseCardContent";

interface ShowcaseCardProps extends FlexProps {
  item?: LogExtended | Achievement;
  defaultJourneyImageSrc?: string;
}

export const ShowcaseCard: FC<ShowcaseCardProps> = ({
  item,
  defaultJourneyImageSrc,
  ...rest
}) => {
  const dispatch = useAppDispatch();
  const itemImageSrc = item?.mediaUrl
    ? `${getImageSrc(item.mediaUrl)}?${item.updatedAt.toString()}`
    : getImageSrc(defaultJourneyImageSrc);
  const isItemLog = Boolean((item as LogExtended)?.hoursSpent);
  const isItemAchievement = Boolean((item as Achievement)?.loggedOnDate);
  return (
    <Paper
      flexDirection="column"
      position="absolute"
      height="95%"
      width="70%"
      transition="opacity 0.6s, transform 0.6s"
      maxWidth={SHOWCASE_CARD_WIDTH_PX}
      sx={{ borderRadius: 0 }}
      {...rest}
    >
      <Flex
        top={0}
        right={0}
        height="40%"
        borderTopRightRadius="2px"
        borderTopLeftRadius="2px"
        width="100%"
        justifyContent="center"
        backgroundImage={itemImageSrc}
        filter="brightness(0.8)"
        backgroundPosition="center"
        backgroundSize="cover"
        onClick={() => {
          dispatch(setViewedImageSrc(itemImageSrc));
        }}
        cursor="pointer"
      />
      <Flex
        p={5}
        direction="column"
        flexGrow={1}
        borderTop="1px solid"
        borderColor="brand.800"
      >
        {!item && (
          <Flex justifyContent="center" alignItems="center" h="full" mb="4vh">
            <Heading size="lg" textAlign="center">
              This could be your first log :)
            </Heading>
          </Flex>
        )}
        {isItemLog && <LogShowcaseCardContent log={item as LogExtended} />}
        {isItemAchievement && (
          <AchievementShowcaseCardContent achievement={item as Achievement} />
        )}
      </Flex>
    </Paper>
  );
};
