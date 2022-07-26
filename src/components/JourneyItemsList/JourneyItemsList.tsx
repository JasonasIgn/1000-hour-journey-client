import { FC, useEffect, useMemo, useRef, useState } from "react";
import { Divider, Flex, Heading } from "@chakra-ui/react";
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
import { Option } from "types";

interface JourneyItemsListProps {
  logs: Log[];
  activeLog?: Log;
  setActiveLogById: (id: number) => void;
  tags: Tag[];
}

export const JourneyItemsList: FC<JourneyItemsListProps> = ({
  logs,
  activeLog,
  setActiveLogById,
  tags,
}) => {
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

  return (
    <Flex direction="column" w="full" mb={2}>
      <Flex mb={4} justify="center" align="center">
        <Divider mr={2} borderColor="brand.100" />
        <Heading size="md" color="brand.100">
          Logs
        </Heading>
        <Divider ml={2} borderColor="brand.100" />
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
      <Flex direction="column" overflow="auto" px={1}>
        {filteredLogs.map((log, idx) => (
          <JourneyItemsListItem
            log={log}
            index={idx + 1}
            key={log.id}
            active={activeLog?.id === log.id}
            onClick={() => {
              setActiveLogById(log.id);
            }}
            ref={activeLog?.id === log.id ? activeRef : undefined}
          />
        ))}
      </Flex>
    </Flex>
  );
};
