import { FC } from "react";
import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  FlexProps,
  Heading,
  Text,
  Image,
} from "@chakra-ui/react";
import Logo from "resources/logo.png";
import { useNavigate } from "react-router-dom";
import { JourneyListItem } from "store/features/journeys/types";

interface JourneysListItemProps {
  journey: JourneyListItem;
  rootBoxProps?: FlexProps;
}

export const JourneysListItem: FC<JourneysListItemProps> = ({
  journey,
  rootBoxProps,
}) => {
  let navigate = useNavigate();
  return (
    <Flex
      height={180}
      bg="brand.800"
      borderRadius={28}
      border="2px solid"
      borderColor="brand.700"
      padding={4}
      cursor="pointer"
      _hover={{
        transform: "scale(1.008)",
      }}
      transition="transform 0.1s"
      {...rootBoxProps}
      onClick={() => {
        navigate(`/journeys/${journey.id}`);
      }}
    >
      <Box
        width={144}
        minWidth={144}
        height="100%"
        border="1px solid"
        borderColor="brand.300"
      >
        <Image src={Logo} />
      </Box>
      <Box ml={5}>
        <Heading size="lg">{journey.title}</Heading>
        <Text fontSize="sm">{journey.description}</Text>
      </Box>
      <Flex
        ml="auto"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        minWidth={92}
      >
        <Box height="90px">
          <CircularProgress
            thickness={6}
            value={journey.totalHours / 10}
            color="brand.300"
            size="90px"
            trackColor="gray.400"
          >
            <CircularProgressLabel color="white">
              {Math.round((journey.totalHours) * 10) / 100}%
            </CircularProgressLabel>
          </CircularProgress>
        </Box>
        <Flex flexDirection="column">
          <Heading size="sm" as="h5" textAlign="center">
            Hours spent
          </Heading>
          <Text textAlign="center" fontWeight={600}>
            {journey.totalHours}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
