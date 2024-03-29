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
  Icon,
} from "@chakra-ui/react";
import { Paper } from "components/Paper";
import { getJourney } from "store/features/journeys/selectors";
import { AddIcon } from "@chakra-ui/icons";
import { ReactComponent as ArrowUp } from "resources/arrow-up.svg";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { AddActivityDialog } from "components/JourneyActivityDialogs/AddActivityDialog";
import { EditActivityDialog } from "components/JourneyActivityDialogs/EditActivityDialog";
import { Journey, Activity } from "store/features/journeys/types";
import { getActivityHoursMap, getNewSortParamsOnClick } from "./utils";
import { ActivitiesListItem } from "components/ActivitiesListItem";
import { SortParams, useActivitiesSorting } from "./hooks";

export const JourneyActivitiesViewContent: FC = () => {
  const dispatch = useAppDispatch();
  const journey = useAppSelector(getJourney) as Journey;
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [activityToEdit, setActivityToEdit] = useState<Activity>();
  const [sortParams, setSortParams] = useState<SortParams | undefined>({
    direction: "asc",
    sortParam: "completed",
  });
  const isEmptyState = journey?.activities.length === 0;

  const activitiesSpentTimeMap = useMemo(() => {
    return getActivityHoursMap(journey?.logs || []);
  }, [journey?.logs]);

  const sortedActivities = useActivitiesSorting(
    journey.activities,
    activitiesSpentTimeMap,
    sortParams
  );

  return (
    <Container maxW="6xl" pt={5} pb={5} h="full">
      <Paper pt={10} direction="column" h="full" sx={{ borderRadius: 0 }}>
        <Flex pb={5} justifyContent="flex-end" px={10}>
          <Button
            isDisabled={journey.finished}
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
                <Th
                  userSelect="none"
                  cursor="pointer"
                  onClick={() => {
                    setSortParams(
                      getNewSortParamsOnClick("completed", sortParams)
                    );
                  }}
                >
                  <Flex alignItems="center" justifyContent="center">
                    Completed&nbsp;
                    <Icon
                      opacity={sortParams?.sortParam === "completed" ? 1 : 0}
                      as={ArrowUp}
                      transform={`rotate(${
                        sortParams?.direction === "asc" ? 0 : 180
                      }deg)`}
                    />
                  </Flex>
                </Th>
                <Th>Include in daily goal</Th>
                <Th
                  isNumeric
                  userSelect="none"
                  cursor="pointer"
                  onClick={() => {
                    setSortParams(
                      getNewSortParamsOnClick("hoursSpent", sortParams)
                    );
                  }}
                >
                  <Flex justifyContent="flex-end" alignItems="center">
                    Hours spent&nbsp;
                    <Icon
                      mr="-19px"
                      as={ArrowUp}
                      opacity={sortParams?.sortParam === "hoursSpent" ? 1 : 0}
                      transform={`rotate(${
                        sortParams?.direction === "asc" ? 0 : 180
                      }deg)`}
                    />
                  </Flex>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {sortedActivities.map((activity) => (
                <ActivitiesListItem
                  key={activity.id}
                  dispatch={dispatch}
                  activitiesSpentTimeMap={activitiesSpentTimeMap}
                  activity={activity}
                  setActivityToEdit={setActivityToEdit}
                  isJourneyFinished={journey.finished}
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
        journey={journey as Journey}
      />
    </Container>
  );
};
