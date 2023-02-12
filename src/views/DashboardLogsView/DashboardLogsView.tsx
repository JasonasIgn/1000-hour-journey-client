import { FC } from "react";
import { SimpleHeader } from "components";
import { DashboardLogsViewContent } from "./DashboardLogsViewContent";
import { Flex } from "@chakra-ui/layout";

export const DashboardLogsView: FC = () => {
  return (
    <>
      <SimpleHeader title="Logs" />
      <Flex bg="brand.800" height="full">
        <DashboardLogsViewContent />
      </Flex>
    </>
  );
};
