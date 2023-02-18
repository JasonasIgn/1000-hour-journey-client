import { FC, useEffect, useMemo, useRef, useState, MouseEvent } from "react";
import { Flex, Heading, IconButton, Icon } from "@chakra-ui/react";
import { Log, Tag } from "store/features/journeys/types";
import { JourneyItemsListItem } from "./JourneyItemsListItem/JourneyItemsListItem";
import {
  ChakraStylesConfig,
  GroupBase,
  MultiValue,
  Select,
} from "chakra-react-select";
import { getTagOptions } from "components/JourneyLogDialogs/utils";
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
  tags: Tag[];
  openAddLogDialog: (e: MouseEvent) => void;
  openAddAchievementDialog: (e: MouseEvent) => void;
}

export const JourneyItemsList: FC<JourneyItemsListProps> = ({
  logs,
  activeLog,
  setActiveLogId,
  tags,
  openAddLogDialog,
  openAddAchievementDialog,
}) => {
  const dispatch = useAppDispatch();
  const activeRef = useRef<HTMLDivElement>(null);
  const [filterTags, setFilterTags] = useState<MultiValue<Option>>([]);

  useEffect(() => {
    activeRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [activeLog]);

  const filteredLogs = useMemo(() => {
    return logs.filter((log) =>
      filterTags.every(
        (filterTag) =>
          log.tags.findIndex((tag) => tag.id === filterTag.value) >= 0
      )
    );
  }, [logs, filterTags]);

  const isListEmpty = filteredLogs.length === 0;

  return (
    <Paper direction="column" w="full" p={3} sx={{ borderRadius: 0 }}>
      <Flex mb={3} align="center">
        <Heading size="md" color="gray.300">
          Logs
        </Heading>
        <Flex ml="auto">
          <IconButton
            variant="sideMenuNotRiactive"
            icon={
              <Icon
                as={AchievementIcon}
                width={22}
                height={22}
                stroke="gray.300"
              />
            }
            aria-label="Add log"
            onClick={openAddAchievementDialog}
            size="sm"
          />
          <IconButton
            variant="sideMenuNotRiactive"
            icon={<Icon as={LogIcon} width={22} height={22} fill="gray.300" />}
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
          options={getTagOptions(tags)}
          placeholder="Filter by tag..."
          chakraStyles={
            chakraStyles as ChakraStylesConfig<Option, true, GroupBase<Option>>
          }
          onChange={(val) => {
            setFilterTags(val);
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
