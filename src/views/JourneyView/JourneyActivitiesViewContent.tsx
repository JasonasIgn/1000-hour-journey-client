import { FC, useState, useMemo } from "react";
import {
  Button,
  Container,
  Flex,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Paper } from "components/Paper";
import { getJourney } from "store/features/journeys/selectors";
import { AddIcon } from "@chakra-ui/icons";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { AddActivityDialog } from "components/JourneyActivityDialogs/AddActivityDialog";
import { EditActivityDialog } from "components/JourneyActivityDialogs/EditActivityDialog";
import { Journey, Activity } from "store/features/journeys/types";
import { getActivityHoursMap } from "./utils";
import { ActivitiesListItem } from "components/ActivitiesListItem";

export const JourneyActivitiesViewContent: FC = () => {
  const dispatch = useAppDispatch();
  const journey = useAppSelector(getJourney) as Journey;
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [activityToEdit, setActivityToEdit] = useState<Activity>();
  const isEmptyState = journey?.activities.length === 0;

  const activitiesSpentTimeMap = useMemo(() => {
    return getActivityHoursMap(journey?.logs || []);
  }, [journey?.logs]);

  return (
    <Container maxW="6xl" pt={5} pb={5} h="full">
      <Paper pt={10} direction="column" h="full" sx={{ borderRadius: 0 }}>
        <Flex pb={5} justifyContent="flex-end" px={10}>
          <Button
            onClick={() => {
              setAddDialogOpen(true);
            }}
            leftIcon={<AddIcon />}
          >
            Add activity
          </Button>
        </Flex>
        <TableContainer w="full" sx={{ overflow: "overlay", px: 10, pb: 10 }}>
          <Table size="lg">
            <Thead position="sticky" top={0} bg="brand.800" zIndex={1}>
              <Tr>
                <Th width="50px" p={0} />
                <Th pl={5}>Activity</Th>
                <Th>Completed</Th>
                <Th>Include in daily goal</Th>
                <Th isNumeric>Hours spent</Th>
              </Tr>
            </Thead>
            <Tbody>
              {journey?.activities.map((activity) => (
                <ActivitiesListItem
                  key={activity.id}
                  dispatch={dispatch}
                  activitiesSpentTimeMap={activitiesSpentTimeMap}
                  activity={activity}
                  setActivityToEdit={setActivityToEdit}
                />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        {isEmptyState && (
          <Flex
            w="full"
            justifyContent="center"
            flexGrow={1}
            alignItems="center"
          >
            <Heading>No activities</Heading>
          </Flex>
        )}
      </Paper>
      <AddActivityDialog
        setOpen={setAddDialogOpen}
        open={addDialogOpen}
        journeyId={journey?.id as number}
      />
      <EditActivityDialog
        activity={activityToEdit}
        handleClose={() => setActivityToEdit(undefined)}
        journeyId={journey?.id as number}
      />
    </Container>
  );
};
