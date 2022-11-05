import { FC, useEffect, useRef } from "react";
import { Divider, Flex, Heading } from "@chakra-ui/react";
import { Log, Tag } from "store/features/journeys/types";
import { JourneyItemsListItem } from "./JourneyItemsListItem/JourneyItemsListItem";
import { Select } from "chakra-react-select";
import { getTagOptions } from "components/JourneyLogDialogs/utils";

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

  useEffect(() => {
    activeRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [activeLog]);

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
        <Select
          isMulti
          name="colors"
          options={getTagOptions(tags)}
          placeholder="Filter by tag..."
        />
      </Flex>
      <Flex direction="column" overflow="auto" px={1}>
        {logs.map((log, idx) => (
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
