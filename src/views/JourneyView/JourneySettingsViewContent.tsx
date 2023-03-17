import { FC, useState } from "react";
import {
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Tooltip,
  useToast,
  Icon,
} from "@chakra-ui/react";
import { ReactComponent as QuestIcon } from "resources/quest.svg";
import { Paper } from "components/Paper";
import { getJourney } from "store/features/journeys/selectors";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { Journey } from "store/features/journeys/types";
import { SwitchField } from "components/SwitchField";
import { updateJourneyEffect } from "store/features/journeys/effects";
import { ConfirmationDialog } from "components";
import { JOURNEY_MAX_HOURS } from "components/JourneyTimeLine/constants";

export const JourneySettingsViewContent: FC = () => {
  const dispatch = useAppDispatch();
  const journey = useAppSelector(getJourney) as Journey;
  const toast = useToast();
  const [open, setOpen] = useState(false);

  const markJourneyAsFinished = async () => {
    try {
      await dispatch(
        updateJourneyEffect({ data: { finished: true }, journeyId: journey.id })
      ).unwrap();
      setOpen(false);
      toast({
        description: "Journey has been finished!",
      });
    } catch (e) {
      toast({
        description: "Failed to mark journey as finished",
      });
    }
  };

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
              isDisabled={journey.finished}
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
        <Flex mt="auto" alignItems="center" justifyContent="center" w="full">
          <Button
            onClick={() => {
              setOpen(true);
            }}
            width="50%"
            size="lg"
            isDisabled={
              journey.finished || journey.totalHours < JOURNEY_MAX_HOURS
            }
          >
            {journey.finished ? "Journey is finished" : "Finish journey"}
          </Button>
          {!journey.finished && (
            <Tooltip
              label={`To finish a journey, you must log at least ${JOURNEY_MAX_HOURS} hours`}
              placement="top"
              offset={[0, 18]}
            >
              <Icon
                ml={4}
                border="1px solid"
                borderRadius="50%"
                p={1}
                as={QuestIcon}
                transition="color 0.1s"
                w="24px"
                h="24px"
                cursor="pointer"
                userSelect="none"
              />
            </Tooltip>
          )}
        </Flex>
      </Paper>
      <ConfirmationDialog
        actionText="Finish"
        bodyText="This will irreversably mark journey as finished and make everything read-only. It is recommended to finish all possible activities."
        isOpen={open}
        onAction={markJourneyAsFinished}
        onClose={() => {
          setOpen(false);
        }}
      />
    </Container>
  );
};
