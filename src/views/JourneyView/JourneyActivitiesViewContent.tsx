import { FC, useState } from "react";
import {
  Button,
  Container,
  Flex,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Paper } from "components/Paper";
import { getJourney } from "store/features/journeys/selectors";
import { useAppSelector } from "store/hooks";
import { AddActivityDialog } from "components/JourneyActivityDialogs/AddActivityDialog";
import { EditActivityDialog } from "components/JourneyActivityDialogs/EditActivityDialog";
import { Tag } from "store/features/journeys/types";

export const JourneyActivitiesViewContent: FC = () => {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [activityToEdit, setActivityToEdit] = useState<Tag>();
  const journey = useAppSelector(getJourney);
  const isEmptyState = journey?.tags.length === 0;
  return (
    <Container maxW="6xl" pt={5} pb={5} h="full">
      <Paper pt={10} px={10} pb={10} direction="column" h="full">
        <Flex pb={5} justifyContent="flex-end">
          <Button
            onClick={() => {
              setAddDialogOpen(true);
            }}
          >
            Create
          </Button>
        </Flex>
        <TableContainer w="full">
          <Table size="md">
            <Thead>
              <Tr>
                <Th>Activity</Th>
                <Th>Description</Th>
                <Th>Completed</Th>
                <Th isNumeric>Hours spent</Th>
              </Tr>
            </Thead>
            <Tbody>
              {journey?.tags.map((activity) => (
                <Tr
                  key={activity.id}
                  _hover={{ bg: "brand.700" }}
                  cursor="pointer"
                  onClick={() => {
                    setActivityToEdit(activity);
                  }}
                >
                  <Td>{activity.name}</Td>
                  <Td whiteSpace="normal">{activity.description || ""}</Td>
                  <Td>{activity.completed ? "Yes" : "No"}</Td>
                  <Td isNumeric>25.4</Td>
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
