import { Flex, FlexProps, Heading } from "@chakra-ui/react";
import { FC } from "react";
import { setViewedImageSrc } from "store/features/app/slice";
import { Achievement, LogExtended } from "store/features/journeys/types";
import { useAppDispatch } from "store/hooks";
import { getImageSrc } from "utils/helpers";
import { AchievementShowcaseCardContent } from "./AchievementShowcaseCardContent";
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
    <Flex
      flexDirection="column"
      position="absolute"
      height="80%"
      width="70%"
      bg="brand.800"
      border="1px solid"
      borderColor="brand.700"
      borderRadius="20px"
      transition="opacity 0.6s, transform 0.6s"
      {...rest}
    >
      {itemImageSrc && (
        <Flex
          top={0}
          right={0}
          height="40%"
          borderTopRightRadius="20px"
          borderTopLeftRadius="20px"
          width="100%"
          justifyContent="center"
          backgroundImage={itemImageSrc}
          backgroundPosition="center"
          backgroundSize="cover"
          onClick={() => {
            console.log("??");
            dispatch(setViewedImageSrc(itemImageSrc));
          }}
          cursor="pointer"
        />
      )}
      <Flex p={5} direction="column" flexGrow={1}>
        {!item && (
          <Flex justifyContent="center" alignItems="center" h="full" mb="4vh">
            <Heading size="lg">This could be your first log :)</Heading>
          </Flex>
        )}
        {isItemLog && <LogShowcaseCardContent log={item as LogExtended} />}
        {isItemAchievement && (
          <AchievementShowcaseCardContent achievement={item as Achievement} />
        )}
      </Flex>
    </Flex>
  );
};
