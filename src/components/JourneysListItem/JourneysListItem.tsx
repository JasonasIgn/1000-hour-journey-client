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
import { IconButton } from "components/IconButton";

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
  <Flex as={Link} to={`/journeys/${journey.id}`} {...rootBoxProps}>
    <Paper
      w="full"
      level={2}
      position="relative"
      height={160}
      padding={4}
      cursor="pointer"
      _hover={{
        boxShadow: "inset 0px 0px 10px 3px var(--chakra-colors-paper-600)",
      }}
      transition="box-shadow 0.15s"
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
      <Flex ml={5} direction="column" flexGrow={1}>
        <Flex direction="column">
          <Flex>
            <Heading size="md">{journey.title}</Heading>
            <IconButton
              ml="auto"
              size="sm"
              variant="solidSm"
              borderColor="yellow"
              color="yellow"
              icon={
                <Icon as={EditIcon} width="14px" height="14px" fill="yellow" />
              }
              aria-label="edit"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onEditClick();
              }}
            />
          </Flex>
          <Text fontSize="md">{journey.description}</Text>
        </Flex>
        <Flex mt="auto" position="relative">
          <Progress
            value={journey.totalHours / 10}
            size="lg"
            width="100%"
            color="purple"
            hasStripe
          />
          <Text
            position="absolute"
            left="calc(50% - 20px)"
            lineHeight="18px"
            fontSize="11px"
            color="white"
          >
            {Math.round(journey.totalHours * 10) / 100}%
          </Text>
        </Flex>
      </Flex>
    </Paper>
  </Flex>
);
