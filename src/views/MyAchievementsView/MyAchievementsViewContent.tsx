import { FC, useEffect } from "react";
import { Container, Flex } from "@chakra-ui/react";
import { Paper } from "components/Paper";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { fetchMyAchievementsEffect } from "store/features/myAchievements/effects";
import { getMyAchievements } from "store/features/myAchievements/selectors";

export const MyAchievementsViewContent: FC = () => {
  const dispatch = useAppDispatch();
  const myAchievements = useAppSelector(getMyAchievements);
  console.log(myAchievements);

  useEffect(() => {
    dispatch(fetchMyAchievementsEffect());
  }, [dispatch]);

  return (
    <Container maxW="6xl" py={5} flexGrow={1}>
      <Paper flexDirection="column" height="100%" sx={{ borderRadius: 0 }}>
        <Flex borderBottom="1px solid" borderColor="brand.600" py={5} px={5} />

        <Flex direction="column" px={5} overflow="auto" flexGrow={1}></Flex>
      </Paper>
    </Container>
  );
};
