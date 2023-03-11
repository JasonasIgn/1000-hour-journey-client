import { routes } from "config";
import { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LoginView } from "views";

export const GuestRoutes: FC = () => {
  return (
    <Routes>
      <Route path={routes.login} element={<LoginView />} />
      <Route path="*" element={<Navigate to={routes.login} replace={true} />} />
    </Routes>
  );
};
