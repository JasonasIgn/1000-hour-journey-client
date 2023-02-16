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
import { Paper } from "components/Paper";

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
    <Paper
      position="relative"
      height={180}
      padding={4}
      cursor="pointer"
      _hover={{
        boxShadow: 'inset 0px 0px 15px 3px var(--chakra-colors-paper-600)',
      }}
      transition="box-shadow 0.15s"
      {...rootBoxProps}
    >
      <Flex
        width={144}
        minWidth={144}
        maxHeight={144}
        height="full"
        alignItems="center"
        justifyContent="center"
        bg="black"
        border="1px solid"
        borderRadius="20px"
        borderColor="border"
        overflow="hidden"
      >
        <Image
          key={journey.updatedAt.toString()}
          filter="brightness(0.8)"
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
        <Heading size="md">{journey.title}</Heading>
        <Text fontSize="md">{journey.description}</Text>
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
            color="red"
            size="90px"
            trackColor="paper.700"
          >
            <CircularProgressLabel color="white" fontSize="md" mt="2px">
              {Math.round(journey.totalHours * 10) / 100}%
            </CircularProgressLabel>
          </CircularProgress>
        </Box>
        <Flex flexDirection="column">
          <Heading
            size="sm"
            as="h5"
            textAlign="center"
            fontWeight={600}
            fontSize="15px"
          >
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
          e.preventDefault();
          e.stopPropagation();
          onEditClick();
        }}
      />
    </Paper>
  </Link>
);
