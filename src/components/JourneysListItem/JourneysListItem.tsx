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
  IconButton,
  Icon,
} from "@chakra-ui/react";
import { ReactComponent as EditIcon } from "resources/edit.svg";
import Logo from "resources/logo.png";
import { Link } from "react-router-dom";
import { JourneyListItem } from "store/features/journeys/types";
import { getImageSrc } from "utils/helpers";

interface JourneysListItemProps {
  journey: JourneyListItem;
  rootBoxProps?: FlexProps;
  onEditClick: () => void;
}

export const JourneysListItem: FC<JourneysListItemProps> = ({
  journey,
  rootBoxProps,
  onEditClick,
}) => (
  <Link to={`/journeys/${journey.id}`}>
    <Flex
      position="relative"
      height={180}
      bg="brand.800"
      borderRadius={20}
      border="2px solid"
      borderColor="brand.700"
      padding={4}
      cursor="pointer"
      _hover={{
        transform: "scale(1.005)",
      }}
      transition="transform 0.1s"
      {...rootBoxProps}
    >
      <Flex
        width={144}
        minWidth={144}
        height="full"
        border="1px solid"
        borderColor="brand.300"
        alignItems="center"
        justifyContent="center"
      >
        <Image
          key={journey.updatedAt.toString()}
          src={
            journey?.mediaUrl
              ? `${getImageSrc(
                  journey.mediaUrl
                )}?${journey.updatedAt.toString()}` // Prevent caching
              : Logo
          }
          maxHeight="full"
        />
      </Flex>
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
            <CircularProgressLabel color="white" fontSize="xl">
              {Math.round(journey.totalHours * 10) / 100}%
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
      <IconButton
        icon={<Icon as={EditIcon} width="22px" height="22px" fill="gray.300" />}
        aria-label="edit"
        position="absolute"
        borderRadius="50%"
        right="-20px"
        color="brand.700"
        border="1px solid"
        top="-10px"
        onClick={(e) => {
          e.stopPropagation();
          onEditClick();
        }}
      />
    </Flex>
  </Link>
);
