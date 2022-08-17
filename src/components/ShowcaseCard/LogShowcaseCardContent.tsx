import {
  Box,
  Flex,
  FlexProps,
  Heading,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";
import { FC } from "react";
import format from "date-fns/format";
import { ReactComponent as EditIcon } from "../../resources/edit.svg";
import { LogExtended } from "../../store/features/journeys/types";
import { dateFormats } from "../../utils/constants";

interface LogShowcaseCardContentProps extends FlexProps {
  log: LogExtended;
}

export const LogShowcaseCardContent: FC<LogShowcaseCardContentProps> = ({
  log,
  ...rest
}) => {
  return (
    <>
      <Flex
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        alignItems="center"
      >
        <IconButton
          icon={<EditIcon width="22px" fill="white" />}
          aria-label="edit"
          position="absolute"
          borderRadius="50%"
          right="-20px"
          color="brand.700"
          border="1px solid"
        />
      </Flex>
      <Flex flexDirection="column" {...rest}>
        <Flex justifyContent="space-between">
          <Box textAlign="center">
            <Heading>Log #{log.number}</Heading>
          </Box>
          <Box textAlign="center">
            <Heading>
              {format(new Date(log.loggedOn), dateFormats.standart)}
            </Heading>
          </Box>
          <Box textAlign="center">
            <Text> Hours spent</Text>
            <Heading>{log.hoursSpent}</Heading>
          </Box>
        </Flex>
        <Flex>
          <Text>{log.description}</Text>
        </Flex>
      </Flex>

      {log?.mediaUrl && (
        <Flex height="80%" flex="1 1 auto" justifyContent="center">
          <Image src={log.mediaUrl} alt={`${log.id} media`} />
        </Flex>
      )}
    </>
  );
};
