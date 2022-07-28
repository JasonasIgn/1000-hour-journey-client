import { Box, BoxProps } from "@chakra-ui/react";
import { Journey } from "../../store/features/journeys/types";

interface JourneysListItemProps {
  journey: Journey;
  rootBoxProps?: BoxProps;
}

export const JourneysListItem: React.FC<JourneysListItemProps> = ({
  journey,
  rootBoxProps,
}) => {
  return (
    <Box
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
      {journey.id}
    </Box>
  );
};
