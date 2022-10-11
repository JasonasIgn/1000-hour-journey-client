import { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LoginView } from "views";

interface GuestRoutesProps {}

export const GuestRoutes: FC<GuestRoutesProps> = (props) => {
  return (
    <Routes>
      <Route path="/login" element={<LoginView />} />
      <Route path="*" element={<Navigate to="/login" replace={true} />} />
    </Routes>
  );
};
