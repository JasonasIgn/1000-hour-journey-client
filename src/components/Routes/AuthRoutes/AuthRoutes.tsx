import { FC } from "react";

import { Navigate, Route, Routes } from "react-router-dom";
import { DashboardView, JourneysView, JourneyView } from "views";

interface AuthRoutesProps {}

export const AuthRoutes: FC<AuthRoutesProps> = (props) => {
  return (
    <Routes>
      <Route path="/journeys">
        <Route path=":journeyId" element={<JourneyView />} />
        <Route index element={<JourneysView />} />
      </Route>
      <Route path="/dashboard">
        <Route index element={<DashboardView />} />
      </Route>
      <Route path="*" element={<Navigate to="/journeys" replace={true} />} />
    </Routes>
  );
};
