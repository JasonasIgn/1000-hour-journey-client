import { FC } from "react";
import { Box, CloseButton, Flex, Image } from "@chakra-ui/react";

interface UploadFieldImagePreviewProps {
  file: File;
  onCancel: () => void;
}

export const UploadFieldImagePreview: FC<UploadFieldImagePreviewProps> = ({
  file,
  onCancel,
}) => {
  return (
    <Flex justifyContent="center">
      <Box
        height={200}
        position="relative"
        border="1px solid"
        borderColor="brand.300"
      >
        <Image
          src={URL.createObjectURL(file)}
          alt="Uploaded media"
          height="100%"
        />
        <Box
          position="absolute"
          width="100%"
          height="100%"
          top={0}
          left={0}
          bgColor="black"
          opacity={0}
          transition="opacity 100ms"
          _hover={{
            opacity: 0.4,
          }}
        />
        <Box
          position="absolute"
          width="100%"
          height="100%"
          top={0}
          left={0}
          opacity={0}
          transition="opacity 100ms"
          _hover={{
            opacity: 1,
          }}
        >
          <CloseButton
            ml="auto"
            onClick={onCancel}
            color="brand.200"
            bgColor="brand.800"
            borderRadius={0}
            _hover={{
              bgColor: "brand.800",
              color: "brand.50",
            }}
            _active={{
              bgColor: "brand.700",
            }}
          />
        </Box>
      </Box>
    </Flex>
  );
};
