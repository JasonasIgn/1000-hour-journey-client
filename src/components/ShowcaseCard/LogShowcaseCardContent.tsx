import {
  Box,
  chakra,
  Flex,
  FlexProps,
  Heading,
  IconButton,
  Image,
  Tag,
  TagLabel,
  Text,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import format from "date-fns/format";
import ImageViewer from "react-simple-image-viewer";
import { ReactComponent as EditIconComponent } from "resources/edit.svg";
import { LogExtended } from "store/features/journeys/types";
import { dateFormats } from "utils/constants";
import { useAppDispatch } from "store/hooks";
import { setEditLogDialogOpen } from "store/features/journey/slice";
import { getImageSrc } from "utils/helpers";

interface LogShowcaseCardContentProps extends FlexProps {
  log: LogExtended;
}

const EditIcon = chakra(EditIconComponent);

export const LogShowcaseCardContent: FC<LogShowcaseCardContentProps> = ({
  log,
  ...rest
}) => {
  const dispatch = useAppDispatch();
  const [currentViewedImage, setCurrentViewedImage] = useState("");

  return (
    <>
      <Flex
        position="absolute"
        top={0}
        right={0}
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
          <Text>Hours spent</Text>
          <Heading>{log.hoursSpent}</Heading>
        </Box>
      </Flex>
      <Flex minHeight={0} width="full" height="full">
        <Flex flex="1 1 40%" direction="column">
          <Flex direction="column">
            <Heading color="brand.100" size="sm">
              Description
            </Heading>
            <Text>{log.description}</Text>
          </Flex>
          {log.tags.length > 0 && (
            <Flex direction="column" mt={5}>
              <Heading color="brand.100" size="sm" mb={2}>
                Tags
              </Heading>
              <Flex>
                {log.tags.map((tag) => (
                  <Tag key={tag.id} variant="subtle" mr={2}>
                    <TagLabel>{tag.name}</TagLabel>
                  </Tag>
                ))}
              </Flex>
            </Flex>
          )}
        </Flex>

        {log?.mediaUrl && (
          <Flex height="100%" width="60%" justifyContent="center" ml={3}>
            <Image
              cursor="pointer"
              src={`${getImageSrc(log.mediaUrl)}?${log.updatedAt.toString()}`} // prevent caching
              alt={`${log.id} media`}
              margin="auto"
              maxHeight="100%"
              boxShadow="0px 0px 15px var(--chakra-colors-brand-100)"
              borderRadius={12}
              onClick={() => {
                setCurrentViewedImage(
                  `${getImageSrc(log.mediaUrl)}?${log.updatedAt.toString()}`
                );
              }}
            />
          </Flex>
        )}
      </Flex>
      {Boolean(currentViewedImage) && (
        <ImageViewer
          src={[currentViewedImage]}
          currentIndex={0}
          disableScroll={false}
          closeOnClickOutside={true}
          onClose={() => setCurrentViewedImage("")}
        />
      )}
    </>
  );
};
