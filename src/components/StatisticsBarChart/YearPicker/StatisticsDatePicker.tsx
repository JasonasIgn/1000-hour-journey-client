import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { Flex, IconButton, Text } from "@chakra-ui/react";
import { FC, SetStateAction, Dispatch } from "react";
import { DateQuery } from "views/DashboardLogsView/types";

interface StatisticsDatePickerProps {
  query: DateQuery;
  setQuery: Dispatch<SetStateAction<DateQuery>>;
}

export const StatisticsDatePicker: FC<StatisticsDatePickerProps> = ({
  query,
  setQuery,
}) => {
  return (
    <Flex mb={2}>
      <Flex direction="column">
        <Text textAlign="center">Year</Text>
        <Flex height={50} alignItems="center">
          <IconButton
            icon={<ArrowBackIcon />}
            aria-label="Back in years"
            onClick={() => {
              setQuery({ ...query, year: query.year - 1 });
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
              setQuery({ ...query, year: query.year + 1 });
            }}
          />
        </Flex>
      </Flex>
      <Flex direction="column" ml={3}>
        <Text textAlign="center">Month</Text>
        <Flex height={50} alignItems="center">
          <IconButton
            icon={<ArrowBackIcon />}
            aria-label="Back in months"
            onClick={() => {
              if (query.month === 1) {
                setQuery({ month: 12, year: query.year - 1 });
                return;
              }
              setQuery({ ...query, month: query.month - 1 });
            }}
          />
          <Flex mx={2} width={34} justifyContent="center">
            <Text color="gray.100">{query.month}</Text>
          </Flex>
          <IconButton
            icon={<ArrowForwardIcon />}
            aria-label="Forward in months"
            onClick={() => {
              if (query.month === 12) {
                setQuery({ month: 1, year: query.year + 1 });
                return;
              }
              setQuery({ ...query, month: query.month + 1 });
            }}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};
