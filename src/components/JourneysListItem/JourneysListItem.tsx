import { FC } from "react";
import {
  Flex,
  FlexProps,
  Heading,
  Text,
  Image,
  Progress,
  IconButton,
} from "@chakra-ui/react";
import { ReactComponent as EditIcon } from "resources/edit.svg";
import format from "date-fns/format";
import Logo from "resources/logo.png";
import { Link } from "react-router-dom";
import { JourneyListItem } from "store/features/journeys/types";
import { getImageSrc } from "utils/helpers";
import { Paper } from "components/Paper";
import { routes } from "config";
import { dateFormats } from "utils/constants";

interface JourneysListItemProps {
  journey: JourneyListItem;
  rootBoxProps?: FlexProps;
  onEditClick: () => void;
  isGoalHighlight?: boolean;
}

export const JourneysListItem: FC<JourneysListItemProps> = ({
  journey,
  rootBoxProps,
  onEditClick,
  isGoalHighlight,
}) => (
  <Link to={routes.journey.replace(":journeyId", journey.id.toString())}>
    <Paper
      variant={isGoalHighlight ? "dailyGoal" : "brand"}
      level={1}
      position="relative"
      height={160}
      padding={4}
      cursor="pointer"
      _hover={{
        boxShadow: `inset 0px 0px 20px 0px var(--chakra-colors-${
          isGoalHighlight ? "yellow" : "brand"
        }-600)`,
        button: {
          display: journey.finished ? "none" : "inline-block",
        },
      }}
      transition="box-shadow 0.1s"
      {...rootBoxProps}
    >
      <Flex
        width={126}
        minWidth={126}
        maxHeight={126}
        height="full"
        alignItems="center"
        justifyContent="center"
        bg="black"
        border="1px solid"
        borderRadius="20px"
        borderColor="brand.500"
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
      <Flex direction="column" ml={5} w="full" justifyContent="space-between">
        <Flex direction="column">
          <Heading size="md">{journey.title}</Heading>
          <Text fontSize="md">{journey.description}</Text>
          <Text fontSize="sm" color="gray.500" mt={1}>
            {format(new Date(journey.createdAt), dateFormats.standart)}
          </Text>
        </Flex>
        <Flex direction="column">
          <Text textAlign="center" fontSize="14px">
            {Math.round(journey.totalHours * 10) / 100}%
          </Text>
          <Progress value={journey.totalHours / 10} size="lg" width="100%" />
        </Flex>
      </Flex>
      <IconButton
        isDisabled={journey.finished}
        aria-label="edit journey"
        icon={<EditIcon width="22px" height="22px" />}
        position="absolute"
        right="16px"
        top="16px"
        width="22px"
        height="22px"
        minWidth="22px"
        display="none"
        variant="sideMenu"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onEditClick();
        }}
      />
    </Paper>
  </Link>
);
