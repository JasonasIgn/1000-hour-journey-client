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
} from "@chakra-ui/react";
import { AchievementsDateQuery } from "./types";
import { useFetchAchievements } from "./hooks";
import { dateFormats } from "utils/constants";
import { API_BASE } from "config";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

export const DashboardAchievementsView: FC = () => {
  const [query, setQuery] = useState<AchievementsDateQuery>({
    year: new Date().getFullYear(),
  });
  const achievements = useFetchAchievements(query);
  const loading = !achievements;

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Container maxW="6xl" pt={5}>
      <Heading>Achievements</Heading>
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
              {query.year}
            </Text>
          </Flex>
          <IconButton
            icon={<ArrowForwardIcon />}
            aria-label="Forward in years"
            onClick={() => {
              setQuery({ year: query.year + 1 });
            }}
          />
        </Flex>
      </Flex>
      <Flex pt={6} direction="column">
        {achievements.length > 0 ? (
          <VerticalTimeline>
            {achievements.map((achievement) => (
              <VerticalTimelineElement
                key={achievement.id}
                className="vertical-timeline-element--work"
                contentStyle={{
                  background: "var(--chakra-colors-brand-500)",
                  color: "#fff",
                }}
                contentArrowStyle={{
                  borderRight: "7px solid var(--chakra-colors-brand-500)",
                }}
                date={format(
                  new Date(achievement.loggedOnDate),
                  dateFormats.standart
                )}
                iconStyle={{
                  background: "var(--chakra-colors-brand-300)",
                  color: "#fff",
                }}
              >
                <Flex justify="space-between">
                  <Flex direction="column">
                    <Heading color="gray.200 !important" as="h3" size="lg">
                      {achievement.journey?.title}
                    </Heading>
                    <Heading color="gray.300 !important" as="h4" size="md">
                      At journey {achievement.loggedAtHour} hour
                    </Heading>
                    <Text color="gray.300 !important">
                      {achievement.description}
                    </Text>
                  </Flex>
                  {achievement.mediaUrl && (
                    <Image
                      maxWidth="40%"
                      src={`${API_BASE}${
                        achievement.mediaUrl
                      }?${achievement.updatedAt.toString()}`}
                    />
                  )}
                </Flex>
              </VerticalTimelineElement>
            ))}
          </VerticalTimeline>
        ) : (
          <Heading textAlign="center">No achievements yet</Heading>
        )}
      </Flex>
    </Container>
  );
};
