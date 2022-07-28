import {
  Box,
  Flex,
  FlexProps,
  Heading,
  Progress,
  Text,
} from "@chakra-ui/react";
import { Journey } from "../../store/features/journeys/types";

interface JourneysListItemProps {
  journey: Journey;
  rootBoxProps?: FlexProps;
}

export const JourneysListItem: React.FC<JourneysListItemProps> = ({
  journey,
  rootBoxProps,
}) => {
  return (
    <Flex
      flexDirection="column"
      justifyContent="space-between"
      height={180}
      bg="#B8DBD9"
      borderRadius={28}
      border="2px solid #40798C"
      padding={4}
      cursor="pointer"
      _hover={{
        transform: "scale(1.008)",
      }}
      transition="transform 0.1s"
      {...rootBoxProps}
    >
      <Box>
        <Heading size="lg">{journey.title}</Heading>
        <Text fontSize="sm">{journey.description}</Text>
      </Box>
      <Progress hasStripe value={journey.total_hours / 10} />
    </Flex>
  );
};
