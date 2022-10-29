import { FC, useEffect, useRef } from "react";
import { Divider, Flex, Heading } from "@chakra-ui/react";
import { Log } from "store/features/journeys/types";
import { JourneyItemsListItem } from "./JourneyItemsListItem/JourneyItemsListItem";

interface JourneyItemsListProps {
  logs: Log[];
  activeLog?: Log;
  setActiveLogById: (id: number) => void;
}

export const JourneyItemsList: FC<JourneyItemsListProps> = ({
  logs,
  activeLog,
  setActiveLogById,
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
