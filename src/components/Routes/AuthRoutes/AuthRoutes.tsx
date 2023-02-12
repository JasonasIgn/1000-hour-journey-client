import { Flex } from "@chakra-ui/layout";
import { GlobalImageViewer } from "components/GlobalImageViewer";
import { FC } from "react";

import { Navigate, Route, Routes } from "react-router-dom";
import { DashboardLogsView, JourneysView, JourneyView } from "views";
import { DashboardAchievementsView } from "views/DashboardAchievementsView";
import { JourneyViewContent } from "views/JourneyView/JourneyViewContent";

interface AuthRoutesProps {}

export const AuthRoutes: FC<AuthRoutesProps> = () => {
  return (
    <>
      <GlobalImageViewer />
      <Routes>
        <Route path="/journeys">
          <Route path=":journeyId" element={<JourneyView />}>
            <Route path="activities" element={<Flex>as </Flex>} />
            <Route index element={<JourneyViewContent />} />
          </Route>
          <Route index element={<JourneysView />} />
        </Route>
        <Route path="/dashboard">
          <Route path="/dashboard/logs" element={<DashboardLogsView />} />
          <Route
            path="/dashboard/achievements"
            element={<DashboardAchievementsView />}
          />
          <Route
            index
            element={<Navigate to="/dashboard/logs" replace={true} />}
          />
        </Route>
        <Route path="*" element={<Navigate to="/journeys" replace={true} />} />
      </Routes>
    </>
  );
};
