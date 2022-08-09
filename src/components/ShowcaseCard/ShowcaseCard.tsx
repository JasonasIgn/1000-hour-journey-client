import { Flex, FlexProps } from "@chakra-ui/react";
import { FC } from "react";
import { Achievement, LogExtended } from "../../store/features/journeys/types";
import { LogShowcaseCardContent } from "./LogShowcaseCardContent";

interface ShowcaseCardProps extends FlexProps {
  item?: LogExtended | Achievement;
}

export const ShowcaseCard: FC<ShowcaseCardProps> = ({ item, ...rest }) => {
  const isItemLog = Boolean((item as LogExtended)?.hoursSpent);
  return (
    <Flex
      flexDirection="column"
      position="absolute"
      height="100%"
      width="65%"
      bg="red"
      padding={5}
      transition="left 0.25s, opacity 0.2s"
      {...rest}
    >
      {isItemLog && <LogShowcaseCardContent log={item as LogExtended} />}
    </Flex>
  );
};