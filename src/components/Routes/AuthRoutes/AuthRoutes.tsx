import { GlobalImageViewer } from "components/GlobalImageViewer";
import { FC } from "react";

import { Navigate, Route, Routes } from "react-router-dom";
import { JourneysView, JourneyView, StatisticsView } from "views";
import { DashboardAchievementsViewContent } from "views/StatisticsView/StatisticsAchievementsViewContent";
import { DashboardLogsViewContent } from "views/StatisticsView/StatisticsLogsViewContent";
import { JourneyActivitiesViewContent } from "views/JourneyView/JourneyActivitiesViewContent";
import { JourneyViewContent } from "views/JourneyView/JourneyViewContent";

interface AuthRoutesProps {}

export const AuthRoutes: FC<AuthRoutesProps> = () => {
  return (
    <>
      <GlobalImageViewer />
      <Routes>
        <Route path="/journeys">
          <Route path=":journeyId" element={<JourneyView />}>
            <Route
              path="activities"
              element={<JourneyActivitiesViewContent />}
            />
            <Route index element={<JourneyViewContent />} />
          </Route>
          <Route index element={<JourneysView />} />
        </Route>

        <Route path="/statistics" element={<StatisticsView />}>
          <Route
            path="/statistics/logs"
            element={<DashboardLogsViewContent />}
          />
          <Route
            path="/statistics/achievements"
            element={<DashboardAchievementsViewContent />}
          />
          <Route
            index
            element={<Navigate to="/statistics/logs" replace={true} />}
          />
        </Route>

        <Route path="*" element={<Navigate to="/journeys" replace={true} />} />
      </Routes>
    </>
  );
};
