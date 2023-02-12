import { FC } from "react";
import { DashboardAchievementsViewContent } from "./DashboardAchievementsViewContent";
import { SimpleHeader } from "components";
import { Flex } from "@chakra-ui/layout";

export const DashboardAchievementsView: FC = () => {
  return (
    <>
      <SimpleHeader title="Achievements" />
      <Flex overflow="auto">
        <DashboardAchievementsViewContent />
      </Flex>
    </>
  );
};
