import { Flex } from "@chakra-ui/react";
import { FC, useEffect } from "react";
import { StatisticsNavigation } from "components";
import { Outlet } from "react-router";
import { useAppDispatch } from "store/hooks";
import { setHeaderTitle } from "store/features/journey/slice";

export const StatisticsView: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setHeaderTitle("Statistics"));
  }, [dispatch]);

  return (
    <>
      <StatisticsNavigation />

      <Flex overflow="auto" flexGrow={1} flexDirection="column" bg="brand.900">
        <Outlet />
      </Flex>
    </>
  );
};
