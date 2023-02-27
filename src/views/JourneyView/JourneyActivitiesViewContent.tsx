import { FC, useState, useMemo } from "react";
import {
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Logo from "resources/logo.png";
import { Paper } from "components/Paper";
import { getJourney } from "store/features/journeys/selectors";
import { AddIcon } from "@chakra-ui/icons";
import { useAppSelector } from "store/hooks";
import { AddActivityDialog } from "components/JourneyActivityDialogs/AddActivityDialog";
import { EditActivityDialog } from "components/JourneyActivityDialogs/EditActivityDialog";
import { Journey, Activity } from "store/features/journeys/types";
import { getActivityHoursMap } from "./utils";
import { getImageSrc } from "utils/helpers";

export const JourneyActivitiesViewContent: FC = () => {
  const journey = useAppSelector(getJourney) as Journey;
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [activityToEdit, setActivityToEdit] = useState<Activity>();
  const isEmptyState = journey?.activities.length === 0;

  const activitiesSpentTimeMap = useMemo(() => {
    return getActivityHoursMap(journey?.logs || []);
  }, [journey?.logs]);

  return (
    <Container maxW="6xl" pt={5} pb={5} h="full">
      <Paper
        pt={10}
        px={10}
        pb={10}
        direction="column"
        h="full"
        sx={{ borderRadius: 0 }}
      >
        <Flex pb={5} justifyContent="flex-end">
          <Button
            onClick={() => {
              setAddDialogOpen(true);
            }}
            leftIcon={<AddIcon />}
          >
            Add activity
          </Button>
        </Flex>
        <TableContainer w="full">
          <Table size="lg">
            <Thead>
              <Tr>
                <Th width="50px" p={0} />
                <Th pl={5}>Activity</Th>
                <Th>Description</Th>
                <Th>Completed</Th>
                <Th isNumeric>Hours spent</Th>
              </Tr>
            </Thead>
            <Tbody>
              {journey?.activities.map((activity) => (
                <Tr
                  key={activity.id}
                  _hover={{ bg: "brand.700" }}
                  cursor="pointer"
                  onClick={() => {
                    setActivityToEdit(activity);
                  }}
                >
                  <Td width="50px" p={0}>
                    <Image
                      width="50px"
                      filter="brightness(0.8)"
                      src={
                        activity?.mediaUrl
                          ? `${getImageSrc(
                              activity.mediaUrl
                            )}?${activity.updatedAt.toString()}` // Prevent caching
                          : Logo
                      }
                    />
                  </Td>
                  <Td pl={5}>{activity.name}</Td>
                  <Td whiteSpace="normal">{activity.description || ""}</Td>
                  <Td>{activity.completed ? "Yes" : "No"}</Td>
                  <Td isNumeric>
                    {`${activitiesSpentTimeMap[activity.id.toString()] || 0}`}
                  </Td>
                </Tr>
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
