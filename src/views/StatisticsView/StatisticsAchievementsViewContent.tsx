import { FC, useState } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import format from "date-fns/format";
import {
  Container,
  Flex,
  Heading,
  Text,
  Image,
  IconButton,
  Box,
} from "@chakra-ui/react";
import { AchievementsDateQuery } from "./types";
import { useFetchAchievements } from "./hooks";
import { dateFormats } from "utils/constants";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { getImageSrc } from "utils/helpers";
import { useAppDispatch } from "store/hooks";
import { setViewedImageSrc } from "store/features/app/slice";
import { Loader } from "components";

export const DashboardAchievementsViewContent: FC = () => {
  const dispatch = useAppDispatch();
  const currentYear = new Date().getFullYear();
  const [query, setQuery] = useState<AchievementsDateQuery>({
    year: currentYear,
  });
  const shouldDisplayAll = query.year > currentYear;
  const achievements = useFetchAchievements(
    shouldDisplayAll ? undefined : query
  );
  const loading = !achievements;

  if (loading) {
    return <Loader />;
  }

  return (
    <Container maxW="8xl" pt={5}>
      <Flex direction="column" align="center">
        <Text textAlign="center">Year</Text>
        <Flex height={50} alignItems="center">
          <IconButton
            icon={<ArrowBackIcon />}
            aria-label="Back in years"
            onClick={() => {
              setQuery({ year: query.year - 1 });
            }}
          />
          <Flex mx={2} width={34} justifyContent="center">
            <Text color="gray.100" textAlign="center">
              {shouldDisplayAll ? "All" : query.year}
            </Text>
          </Flex>
          <IconButton
            icon={<ArrowForwardIcon />}
            aria-label="Forward in years"
            isDisabled={shouldDisplayAll}
            onClick={() => {
              setQuery({ year: query.year + 1 });
            }}
          />
        </Flex>
      </Flex>
      <Flex pt={6} direction="column">
        {achievements.length > 0 ? (
          <VerticalTimeline>
            {achievements.map((achievement) => {
              const achievementMediaSrc = `${getImageSrc(
                achievement.mediaUrl
              )}?${achievement.updatedAt.toString()}`;
              const journeyMediaSrc = `${getImageSrc(
                achievement.journey?.mediaUrl
              )}?${achievement.updatedAt.toString()}`;
              return (
                <VerticalTimelineElement
                  key={achievement.id}
                  className="vertical-timeline-element--work"
                  contentStyle={{
                    background: "var(--chakra-colors-brand-600)",
                    color: "#fff",
                  }}
                  contentArrowStyle={{
                    borderRight: "7px solid var(--chakra-colors-brand-600)",
                  }}
                  date={format(
                    new Date(achievement.loggedOnDate),
                    dateFormats.standart
                  )}
                  iconStyle={{
                    background: "var(--chakra-colors-brand-500)",
                    color: "#fff",
                  }}
                  icon={
                    <Box
                      width="full"
                      height="full"
                      borderRadius="full"
                      backgroundSize="contain"
                      backgroundPosition="center"
                      backgroundImage={journeyMediaSrc}
                    />
                  }
                >
                  <Flex justify="space-between" alignItems="center">
                    <Flex direction="column" pr={4}>
                      <Heading color="gray.200 !important" as="h3" size="lg">
                        {achievement.journey?.title}
                      </Heading>
                      <Heading color="gray.300 !important" as="h4" size="md">
                        At journey {achievement.loggedAtHour} hour
                      </Heading>
                      <Text color="gray.300 !important" wordBreak="break-word">
                        {achievement.description}
                      </Text>
                    </Flex>
                    {achievement.mediaUrl && (
                      <Image
                        boxShadow="0px 0px 12px var(--chakra-colors-brand-100)"
                        borderRadius={12}
                        cursor="pointer"
                        maxWidth="40%"
                        height="100%"
                        src={achievementMediaSrc}
                        onClick={() => {
                          dispatch(setViewedImageSrc(achievementMediaSrc));
                        }}
                      />
                    )}
                  </Flex>
                </VerticalTimelineElement>
              );
            })}
          </VerticalTimeline>
        ) : (
          <Heading textAlign="center" mt="20%">
            No achievements yet
          </Heading>
        )}
      </Flex>
    </Container>
  );
};
