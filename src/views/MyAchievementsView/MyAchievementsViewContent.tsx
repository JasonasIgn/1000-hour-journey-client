import { FC, useCallback, useEffect, useState } from "react";
import { Container, Flex } from "@chakra-ui/react";
import { Paper } from "components/Paper";
import { useAppDispatch, useAppSelector } from "store/hooks";
import {
  claimMyAchievementLevelReward,
  fetchMyAchievementsEffect,
} from "store/features/myAchievements/effects";
import { getMyAchievements } from "store/features/myAchievements/selectors";
import { Loader } from "components";
import { MyAchievementsListItem } from "components/MyAchievementsListItem";
import { fetchPointsEffect } from "store/features/user/effects";
import delay from "delay";

export const MyAchievementsViewContent: FC = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const myAchievements = useAppSelector(getMyAchievements);

  const loadDependencies = useCallback(async () => {
    setLoading(true);
    await dispatch(fetchMyAchievementsEffect());
    setLoading(false);
  }, [dispatch]);

  const onAwardClaim = useCallback(
    async (levelId: number) => {
      await dispatch(claimMyAchievementLevelReward({ levelId }));
      await delay(1000);
      await dispatch(fetchPointsEffect());
      await dispatch(fetchMyAchievementsEffect());
    },
    [dispatch]
  );

  useEffect(() => {
    loadDependencies();
  }, [loadDependencies]);

  if (loading || !myAchievements) {
    return <Loader />;
  }

  return (
    <Container maxW="5xl" py={5} flexGrow={1}>
      <Paper flexDirection="column" height="100%" sx={{ borderRadius: 0 }}>
        <Flex
          direction="row"
          px={5}
          overflow="auto"
          flexGrow={1}
          pt={5}
          flexWrap="wrap"
          alignItems="flex-start"
          alignContent="baseline"
          justifyContent="flex-start"
        >
          {myAchievements.map((achievementProgress) => (
            <MyAchievementsListItem
              key={achievementProgress.achievement.id}
              onClaimReward={onAwardClaim}
              userAchievementProgress={achievementProgress}
            />
          ))}
        </Flex>
      </Paper>
    </Container>
  );
};
