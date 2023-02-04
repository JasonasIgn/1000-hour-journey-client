import { Box, Flex, FlexProps, Heading, Image, Text } from "@chakra-ui/react";
import { FC, useState } from "react";
import format from "date-fns/format";
import ImageViewer from "react-simple-image-viewer";
import { Achievement } from "store/features/journeys/types";
import { dateFormats } from "utils/constants";
import { getImageSrc } from "utils/helpers";

interface AchievementShowcaseCardContentProps extends FlexProps {
  achievement: Achievement;
}

export const AchievementShowcaseCardContent: FC<
  AchievementShowcaseCardContentProps
> = ({ achievement, ...rest }) => {
  const [currentViewedImage, setCurrentViewedImage] = useState("");
  return (
    <>
      <Flex
        justifyContent="space-between"
        borderBottom="1px solid"
        borderColor="brand.300"
        pb={3}
        mb={3}
        {...rest}
      >
        <Box textAlign="left">
          <Text>Achievement</Text>
          <Heading> </Heading>
        </Box>
        <Box textAlign="left">
          <Text>Date</Text>
          <Heading>
            {format(new Date(achievement.loggedOnDate), dateFormats.standart)}
          </Heading>
        </Box>
        <Box textAlign="center">
          <Text>At journey hour</Text>
          <Heading>{achievement.loggedAtHour}</Heading>
        </Box>
      </Flex>
      <Flex height="84%" width="100%">
        <Flex flex="1 1 40%">
          <Text wordBreak="break-word" whiteSpace="pre-line">
            {achievement.description}
          </Text>
        </Flex>
        {achievement?.mediaUrl && (
          <Flex height="100%" width="60%" justifyContent="center" pl={3} ml={3}>
            <Image
              cursor="pointer"
              src={`${getImageSrc(
                achievement.mediaUrl
              )}?${achievement.updatedAt.toString()}`} // prevent caching
              alt={`${achievement.id} media`}
              margin="auto"
              maxHeight="100%"
              boxShadow="0px 0px 15px var(--chakra-colors-brand-100)"
              borderRadius={12}
              onClick={() => {
                setCurrentViewedImage(
                  `${getImageSrc(
                    achievement.mediaUrl
                  )}?${achievement.updatedAt.toString()}`
                );
              }}
            />
          </Flex>
        )}
      </Flex>
      {Boolean(currentViewedImage) && (
        <ImageViewer
          src={[currentViewedImage]}
          currentIndex={0}
          disableScroll={false}
          closeOnClickOutside={true}
          onClose={() => setCurrentViewedImage("")}
        />
      )}
    </>
  );
};
