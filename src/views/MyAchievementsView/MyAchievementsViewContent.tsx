import { FC, useCallback, useEffect, useState } from "react";
import { Container, Flex } from "@chakra-ui/react";
import { Paper } from "components/Paper";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { fetchMyAchievementsEffect } from "store/features/myAchievements/effects";
import { getMyAchievements } from "store/features/myAchievements/selectors";
import { Loader } from "components";
import { MyAchievementsListItem } from "components/MyAchievementsListItem";

export const MyAchievementsViewContent: FC = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const myAchievements = useAppSelector(getMyAchievements);
  console.log(myAchievements);

  const loadDependencies = useCallback(async () => {
    setLoading(true);
    await dispatch(fetchMyAchievementsEffect());
    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    loadDependencies();
  }, [loadDependencies]);

  if (loading || !myAchievements) {
    return <Loader />;
  }

  return (
    <Container maxW="6xl" py={5} flexGrow={1}>
      <Paper flexDirection="column" height="100%" sx={{ borderRadius: 0 }}>
        <Flex direction="column" px={5} overflow="auto" flexGrow={1} pt={5}>
          {myAchievements.map((achievementProgress) => (
            <MyAchievementsListItem
              key={achievementProgress.achievement.id}
              onClaimReward={async () => {}}
              userAchievementProgress={achievementProgress}
            />
          ))}
        </Flex>
      </Paper>
    </Container>
  );
};
