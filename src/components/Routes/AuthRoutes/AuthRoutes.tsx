import { FC } from "react";

import { Navigate, Route, Routes } from "react-router-dom";
import { DashboardLogsView, JourneysView, JourneyView } from "views";
import { DashboardAchievementsView } from "views/DashboardAchievementsView";

interface AuthRoutesProps {}

export const AuthRoutes: FC<AuthRoutesProps> = () => {
  return (
    <Routes>
      <Route path="/journeys">
        <Route path=":journeyId" element={<JourneyView />} />
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
  );
};
