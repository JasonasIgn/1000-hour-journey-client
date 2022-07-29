import { Container } from "@chakra-ui/react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const JourneyView: React.FC = () => {
  let params = useParams();

  useEffect(() => {
    // Fetch journey {params.journeyId}
  });

  return (
    <Container maxW="6xl" pt={10}>
      journey view {params.journeyId}
    </Container>
  );
};
