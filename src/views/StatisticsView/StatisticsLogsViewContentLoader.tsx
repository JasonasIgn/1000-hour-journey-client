import React, { FC } from "react";
import { Container, Flex, Skeleton } from "@chakra-ui/react";
import { LogStatCardLoader } from "components";

export const StatisticsLogsViewContentLoader: FC = () => {
  return (
    <Container maxW="8xl" pt={5}>
      <Flex direction="column">
        <Flex>
          <LogStatCardLoader heading="All Time" />
          <LogStatCardLoader heading="This Year" />
          <LogStatCardLoader heading="This Month" />
          <LogStatCardLoader heading="Past 7 days" />
          <LogStatCardLoader heading="Today" mr={0} />
        </Flex>
        <Flex pt={14} alignItems="center" direction="column">
          <Skeleton width={272} height={74} mb={2} />
          <Flex>
            <Skeleton width={1010} height={300} />
            <Skeleton width={100} height={300} ml="10px" />
          </Flex>
        </Flex>
      </Flex>
    </Container>
  );
};
