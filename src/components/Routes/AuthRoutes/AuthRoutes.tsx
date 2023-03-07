import { GlobalImageViewer } from "components/GlobalImageViewer";
import { FC } from "react";

import { Navigate, Route, Routes } from "react-router-dom";
import { JourneysView, JourneyView, StatisticsView } from "views";
import { StatisticsAchievementsViewContent } from "views/StatisticsView/StatisticsAchievementsViewContent";
import { StatisticsLogsViewContent } from "views/StatisticsView/StatisticsLogsViewContent";
import { JourneyActivitiesViewContent } from "views/JourneyView/JourneyActivitiesViewContent";
import { JourneyViewContent } from "views/JourneyView/JourneyViewContent";
import { JourneySettingsViewContent } from "views/JourneyView/JourneySettingsViewContent";

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
            <Route path="settings" element={<JourneySettingsViewContent />} />
            <Route index element={<JourneyViewContent />} />
          </Route>
          <Route index element={<JourneysView />} />
        </Route>

        <Route path="/statistics" element={<StatisticsView />}>
          <Route
            path="/statistics/logs"
            element={<StatisticsLogsViewContent />}
          />
          <Route
            path="/statistics/achievements"
            element={<StatisticsAchievementsViewContent />}
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
