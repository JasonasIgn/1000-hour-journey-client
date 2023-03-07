import { FC } from "react";
import { Container, Grid, GridItem } from "@chakra-ui/react";
import { Paper } from "components/Paper";
import { getJourney } from "store/features/journeys/selectors";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { Journey } from "store/features/journeys/types";
import { SwitchField } from "components/SwitchField";
import { updateJourneyEffect } from "store/features/journeys/effects";

export const JourneySettingsViewContent: FC = () => {
  const dispatch = useAppDispatch();
  const journey = useAppSelector(getJourney) as Journey;
  console.log(journey);
  return (
    <Container maxW="6xl" pt={5} pb={5} h="full" centerContent>
      <Paper
        pt={10}
        px={10}
        pb={10}
        direction="column"
        w="full"
        m="auto"
        height="full"
        sx={{ borderRadius: 0 }}
      >
        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          <GridItem>
            <SwitchField
              label="Include in daily goal"
              onChange={(e) => {
                dispatch(
                  updateJourneyEffect({
                    journeyId: journey.id,
                    data: {
                      includeInDailyGoal: Number(e.target.checked) as 1 | 0,
                    },
                  })
                );
              }}
              defaultChecked={journey.includeInDailyGoal}
            />
          </GridItem>
        </Grid>
      </Paper>
    </Container>
  );
};
