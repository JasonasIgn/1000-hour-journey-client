import { GlobalImageViewer } from "components/GlobalImageViewer";
import { FC } from "react";

import { Navigate, Route, Routes } from "react-router-dom";
import { JourneysView, JourneyView, StatisticsView } from "views";
import { StatisticsAchievementsViewContent } from "views/StatisticsView/StatisticsAchievementsViewContent";
import { StatisticsLogsViewContent } from "views/StatisticsView/StatisticsLogsViewContent";
import { JourneyActivitiesViewContent } from "views/JourneyView/JourneyActivitiesViewContent";
import { JourneyViewContent } from "views/JourneyView/JourneyViewContent";
import { JourneySettingsViewContent } from "views/JourneyView/JourneySettingsViewContent";
import { routes } from "config";
import { ShopView } from "views/ShopView";
import { MyAchievementsView } from "views/MyAchievementsView";
import { JourneyVisualizerViewContent } from "views/JourneyView/JourneyVisualizerViewContent";

interface AuthRoutesProps {}

export const AuthRoutes: FC<AuthRoutesProps> = () => {
  return (
    <>
      <GlobalImageViewer />
      <Routes>
        <Route path={routes.journeys}>
          <Route path={routes.journey} element={<JourneyView />}>
            <Route
              path={routes.journeyActivities}
              element={<JourneyActivitiesViewContent />}
            />
            <Route
              path={routes.journeyVisualizer}
              element={<JourneyVisualizerViewContent />}
            />
            <Route
              path={routes.journeySettings}
              element={<JourneySettingsViewContent />}
            />
            <Route index element={<JourneyViewContent />} />
          </Route>
          <Route index element={<JourneysView />} />
        </Route>

        <Route path={routes.statistics} element={<StatisticsView />}>
          <Route
            path={routes.statisticsLogs}
            element={<StatisticsLogsViewContent />}
          />
          <Route
            path={routes.statisticsAchievements}
            element={<StatisticsAchievementsViewContent />}
          />
          <Route
            index
            element={<Navigate to={routes.statisticsLogs} replace={true} />}
          />
        </Route>

        <Route path={routes.shop} index element={<ShopView />} />

        <Route
          path={routes.myAchievements}
          index
          element={<MyAchievementsView />}
        />

        <Route
          path="*"
          element={<Navigate to={routes.journeys} replace={true} />}
        />
      </Routes>
    </>
  );
};
