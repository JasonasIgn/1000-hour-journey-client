import { FC } from "react";
import { Container, Heading, Text } from "@chakra-ui/react";
import { useStatistics } from "./hooks";

export const DashboardView: FC = () => {
  const statistics = useStatistics();
  const loading = !statistics;

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Container maxW="6xl" pt={5}>
      <Heading>Logs</Heading>
    </Container>
  );
};
