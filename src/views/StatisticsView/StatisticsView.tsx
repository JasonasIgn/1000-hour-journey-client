import { Flex } from "@chakra-ui/react";
import { FC } from "react";
import { SimpleHeader, StatisticsNavigation } from "components";
import { Outlet } from "react-router";

export const StatisticsView: FC = () => {
  return (
    <>
      <SimpleHeader title="Statistics" />
      <StatisticsNavigation />

      <Flex overflow="auto" flexGrow={1} flexDirection="column" bg="brand.900">
        <Outlet />
      </Flex>
    </>
  );
};
