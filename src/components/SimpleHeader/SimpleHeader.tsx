import { FC, ReactNode } from "react";
import { Heading } from "@chakra-ui/react";
import { Paper } from "components/Paper";
import { DailyGoal } from "components/DailyGoal";
import { useAppSelector } from "store/hooks";
import { getHeaderTitle } from "store/features/journey/selectors";

export const HEADER_HEIGHT_PX = 60;

interface SimpleHeaderProps {
  children?: ReactNode;
}

export const SimpleHeader: FC<SimpleHeaderProps> = ({ children }) => {
  const title = useAppSelector(getHeaderTitle);
  return (
    <Paper
      width="100%"
      height={`${HEADER_HEIGHT_PX}px`}
      minHeight={`${HEADER_HEIGHT_PX}px`}
      px={4}
      py={2.5}
      alignItems="center"
      justifyContent="space-between"
      sx={{
        borderRadius: 0,
        borderRight: "none",
        borderLeft: "none",
        borderTop: "none",
      }}
    >
      <Heading
        whiteSpace="nowrap"
        width="full"
        textAlign="center"
        flex={0}
        size="lg"
      >
        {title}
      </Heading>
      {children}
      <DailyGoal />
    </Paper>
  );
};
