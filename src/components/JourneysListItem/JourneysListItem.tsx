import { FC } from "react";
import {
  Flex,
  FlexProps,
  Heading,
  Text,
  Image,
  Icon,
  Progress,
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
      level={1}
      position="relative"
      height={160}
      padding={4}
      cursor="pointer"
      _hover={{
        boxShadow: "inset 0px 0px 20px 0px var(--chakra-colors-brand-600)",
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
        </Flex>
        <Flex direction="column">
          <Text textAlign="center" fontSize="14px">
            {Math.round(journey.totalHours * 10) / 100}%
          </Text>
          <Progress value={journey.totalHours / 10} size="lg" width="100%" />
        </Flex>
      </Flex>
      <Icon
        as={EditIcon}
        position="absolute"
        right="16px"
        top="16px"
        width="22px"
        height="22px"
        fill="gray.400"
        _hover={{
          color: "gray.100",
          fill: "gray.100",
        }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onEditClick();
        }}
      />
    </Paper>
  </Link>
);
