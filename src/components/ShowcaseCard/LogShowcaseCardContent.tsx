import {
  Box,
  chakra,
  Flex,
  FlexProps,
  Heading,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";
import { FC } from "react";
import format from "date-fns/format";
import { ReactComponent as EditIconComponent } from "resources/edit.svg";
import { LogExtended } from "store/features/journeys/types";
import { dateFormats } from "utils/constants";
import { useAppDispatch } from "store/hooks";
import { setEditLogDialogOpen } from "store/features/journeyView/slice";

interface LogShowcaseCardContentProps extends FlexProps {
  log: LogExtended;
}

const EditIcon = chakra(EditIconComponent);

export const LogShowcaseCardContent: FC<LogShowcaseCardContentProps> = ({
  log,
  ...rest
}) => {
  const dispatch = useAppDispatch();
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
          icon={<EditIcon width="22px" fill="gray.300" />}
          aria-label="edit"
          position="absolute"
          borderRadius="50%"
          right="-20px"
          color="brand.700"
          border="1px solid"
          onClick={() => {
            dispatch(setEditLogDialogOpen(true));
          }}
        />
      </Flex>
      <Flex
        justifyContent="space-between"
        borderBottom="1px solid"
        borderColor="brand.300"
        pb={3}
        mb={3}
        {...rest}
      >
        <Box textAlign="left">
          <Text>Log</Text>
          <Heading>#{log.number}</Heading>
        </Box>
        <Box textAlign="left">
          <Text>Date</Text>
          <Heading>
            {format(new Date(log.loggedOn), dateFormats.standart)}
          </Heading>
        </Box>
        <Box textAlign="center">
          <Text> Hours spent</Text>
          <Heading>{log.hoursSpent}</Heading>
        </Box>
      </Flex>
      <Flex height="84%" width="100%">
        <Flex flex="1 1 40%">
          <Text>{log.description}</Text>
        </Flex>
        {log?.mediaUrl && (
          <Flex
            height="100%"
            width="60%"
            justifyContent="center"
            pl={3}
            ml={3}
            borderLeft="1px solid"
            borderColor="brand.300"
          >
            <Image
              src={`${log.mediaUrl}?${log.updatedAt.toString()}`} // prevent caching
              alt={`${log.id} media`}
              margin="auto"
              maxHeight="100%"
            />
          </Flex>
        )}
      </Flex>
    </>
  );
};
