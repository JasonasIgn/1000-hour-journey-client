import { FC } from "react";
import { SimpleHeader } from "components";
import { DashboardLogsViewContent } from "./DashboardLogsViewContent";

export const DashboardLogsView: FC = () => {
  return (
    <>
      <SimpleHeader title="Logs" />
      <DashboardLogsViewContent />
    </>
  );
};
