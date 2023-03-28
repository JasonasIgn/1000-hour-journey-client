import { Flex } from "@chakra-ui/react";
import { FC, useEffect } from "react";
import { useAppDispatch } from "store/hooks";
import { setHeaderTitle } from "store/features/journey/slice";
import { MyAchievementsViewContent } from "./MyAchievementsViewContent";

export const MyAchievementsView: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setHeaderTitle("My Achievements"));
  }, [dispatch]);

  return (
    <Flex overflow="auto" flexGrow={1} flexDirection="column" bg="brand.900">
      <MyAchievementsViewContent />
    </Flex>
  );
};
