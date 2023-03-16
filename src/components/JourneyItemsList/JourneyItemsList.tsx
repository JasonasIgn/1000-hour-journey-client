import { FC, useEffect, useMemo, useRef, useState, MouseEvent } from "react";
import {
  Flex,
  Heading,
  IconButton,
  Icon,
  Tabs,
  TabList,
  Tab,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { Log, Activity, Achievement } from "store/features/journeys/types";
import { JourneyItemsListItem } from "./JourneyItemsListItem/JourneyItemsListItem";
import {
  ChakraStylesConfig,
  GroupBase,
  MultiValue,
  Select,
} from "chakra-react-select";
import { getActivityOptions } from "components/JourneyLogDialogs/utils";
import { chakraStyles } from "components/CreatableSelectField/styles";
import { Option } from "types";
import { Paper } from "components/Paper";

interface JourneyItemsListProps {
  logs: Log[];
  achievements: Achievement[];
  activeLog?: Log;
  activeAchievement?: Achievement;
  setActiveLogId: (id: number) => void;
  setActiveAchievementId: (id: number) => void;
  activities: Activity[];
  openAddLogDialog: (e: MouseEvent) => void;
  openAddAchievementDialog: (e: MouseEvent) => void;
  isJourneyFinished: boolean;
}

export const JourneyItemsList: FC<JourneyItemsListProps> = ({
  logs,
  activeLog,
  setActiveLogId,
  activities,
  openAddLogDialog,
  openAddAchievementDialog,
  achievements,
  setActiveAchievementId,
  activeAchievement,
  isJourneyFinished,
}) => {
  const [listType, setListType] = useState<"logs" | "achievements">("logs");
  const activeRef = useRef<HTMLDivElement>(null);
  const [filterActivities, setFilterActivities] = useState<MultiValue<Option>>(
    []
  );

  useEffect(() => {
    if (listType === "logs") {
      activeRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [activeLog, listType]);

  const filteredLogs = useMemo(() => {
    return logs.filter((log) =>
      filterActivities.every(
        (filterActivity) =>
          log.activities.findIndex(
            (activity) => activity.id === filterActivity.value
          ) >= 0
      )
    );
  }, [logs, filterActivities]);

  const sortedAchievements = useMemo(() => {
    return [...achievements].sort((a1, a2) =>
      a1.loggedAtHour > a2.loggedAtHour ? 1 : -1
    );
  }, [achievements]);

  const isListEmpty =
    listType === "logs" ? filteredLogs.length === 0 : achievements.length === 0;

  return (
    <Paper direction="column" w="full" sx={{ borderRadius: 0 }}>
      <Tabs
        variant="linePaper"
        height="40px"
        width="full"
        defaultIndex={0}
        bg="brand.900"
      >
        <TabList alignItems="center">
          <Tab
            onClick={() => {
              setListType("logs");
              setFilterActivities([]);
            }}
          >
            Logs
          </Tab>
          <Tab
            onClick={() => {
              setListType("achievements");
            }}
          >
            Achievements
          </Tab>
          <IconButton
            isDisabled={isJourneyFinished}
            ml="auto"
            mr={2}
            variant="sideMenu"
            icon={<Icon as={AddIcon} width="16px" height="16px" />}
            aria-label="Add item"
            onClick={
              listType === "logs" ? openAddLogDialog : openAddAchievementDialog
            }
            size="sm"
          />
        </TabList>
      </Tabs>
      <Flex p={3} direction="column" overflow="auto" flexGrow={1}>
        {listType === "logs" && (
          <Flex direction="column" px={2} mb={3}>
            <Select<Option, true, GroupBase<Option>>
              isMulti
              name="activities"
              options={getActivityOptions(activities)}
              placeholder="Filter by activity..."
              chakraStyles={
                chakraStyles as ChakraStylesConfig<
                  Option,
                  true,
                  GroupBase<Option>
                >
              }
              onChange={(val) => {
                setFilterActivities(val);
              }}
            />
          </Flex>
        )}
        <Flex
          direction="column"
          overflow="auto"
          px={1}
          height="full"
          borderTop="1px solid"
          borderColor="brand.600"
          pt={2}
        >
          {isListEmpty && (
            <Flex justifyContent="center" my="auto">
              <Heading size="md">
                No {listType === "logs" ? "logs" : "achievements"} available
              </Heading>
            </Flex>
          )}
          {(listType === "logs" ? filteredLogs : sortedAchievements).map(
            (item, idx) => (
              <JourneyItemsListItem
                item={item}
                index={idx + 1}
                key={item.id}
                active={
                  listType === "logs"
                    ? activeLog?.id === item.id
                    : activeAchievement?.id === item.id
                }
                onClick={() => {
                  if (listType === "logs") {
                    setActiveLogId(item.id);
                    return;
                  }
                  setActiveAchievementId(item.id);
                }}
                ref={
                  listType === "logs"
                    ? activeLog?.id === item.id
                      ? activeRef
                      : undefined
                    : activeAchievement?.id === item.id
                    ? activeRef
                    : undefined
                }
              />
            )
          )}
        </Flex>
      </Flex>
    </Paper>
  );
};
