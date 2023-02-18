import { FC } from "react";
import {
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

export const JourneyActivitiesViewContent: FC = () => {
  const journey = useAppSelector(getJourney);
  const isEmptyState = journey?.tags.length === 0;
  return (
    <Container maxW="8xl" pt={5} pb={5} h="full">
      <Paper pt={14} px={10} pb={10} direction="column" h="full">
        <TableContainer w="full">
          <Table size="md">
            <Thead>
              <Tr>
                <Th>Activity</Th>
                <Th>Description</Th>
                <Th>Completed</Th>
              </Tr>
            </Thead>
            <Tbody>
              {journey?.tags.map((activity) => (
                <Tr>
                  <Td>{activity.name}</Td>
                  <Td>millimetres (mm)</Td>
                  <Td>25.4</Td>
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
    </Container>
  );
};
