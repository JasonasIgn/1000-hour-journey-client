import { FC, useEffect, useMemo, useRef, useState, MouseEvent } from "react";
import { Flex, Heading, IconButton, Icon } from "@chakra-ui/react";
import { Log, Activity } from "store/features/journeys/types";
import { JourneyItemsListItem } from "./JourneyItemsListItem/JourneyItemsListItem";
import {
  ChakraStylesConfig,
  GroupBase,
  MultiValue,
  Select,
} from "chakra-react-select";
import { getActivityOptions } from "components/JourneyLogDialogs/utils";
import { chakraStyles } from "components/CreatableSelectField/styles";
import { ReactComponent as AchievementIcon } from "resources/achievement.svg";
import { ReactComponent as LogIcon } from "resources/page.svg";
import { Option } from "types";
import { useAppDispatch } from "store/hooks";
import { Paper } from "components/Paper";

interface JourneyItemsListProps {
  logs: Log[];
  activeLog?: Log;
  setActiveLogId: (id: number) => void;
  activities: Activity[];
  openAddLogDialog: (e: MouseEvent) => void;
  openAddAchievementDialog: (e: MouseEvent) => void;
}

export const JourneyItemsList: FC<JourneyItemsListProps> = ({
  logs,
  activeLog,
  setActiveLogId,
  activities,
  openAddLogDialog,
  openAddAchievementDialog,
}) => {
  const dispatch = useAppDispatch();
  const activeRef = useRef<HTMLDivElement>(null);
  const [filterActivities, setFilterActivities] = useState<MultiValue<Option>>(
    []
  );

  useEffect(() => {
    activeRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [activeLog]);

  const filteredLogs = useMemo(() => {
    return logs.filter((log) =>
      filterActivities.every(
        (filterActivity) =>
          log.tags.findIndex(
            (activity) => activity.id === filterActivity.value
          ) >= 0
      )
    );
  }, [logs, filterActivities]);

  const isListEmpty = filteredLogs.length === 0;

  return (
    <Paper direction="column" w="full" p={3} sx={{ borderRadius: 0 }}>
      <Flex mb={3} align="center">
        <Heading size="md" color="gray.300">
          Logs
        </Heading>
        <Flex ml="auto">
          <IconButton
            variant="sideMenu"
            icon={<Icon as={AchievementIcon} width={22} height={22} />}
            aria-label="Add log"
            onClick={openAddAchievementDialog}
            size="sm"
          />
          <IconButton
            variant="sideMenu"
            icon={<Icon as={LogIcon} width={22} height={22} />}
            aria-label="Add log"
            onClick={openAddLogDialog}
            size="sm"
          />
        </Flex>
      </Flex>
      <Flex direction="column" px={2} mb={3}>
        <Select<Option, true, GroupBase<Option>>
          isMulti
          name="tags"
          options={getActivityOptions(activities)}
          placeholder="Filter by activity..."
          chakraStyles={
            chakraStyles as ChakraStylesConfig<Option, true, GroupBase<Option>>
          }
          onChange={(val) => {
            setFilterActivities(val);
          }}
        />
      </Flex>
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
            <Heading size="md">No logs available</Heading>
          </Flex>
        )}
        {filteredLogs.map((log, idx) => (
          <JourneyItemsListItem
            log={log}
            index={idx + 1}
            key={log.id}
            active={activeLog?.id === log.id}
            onClick={() => {
              setActiveLogId(log.id);
            }}
            dispatch={dispatch}
            ref={activeLog?.id === log.id ? activeRef : undefined}
          />
        ))}
      </Flex>
    </Paper>
  );
};
