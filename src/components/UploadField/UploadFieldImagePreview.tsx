import { FC } from "react";
import { Box, CloseButton, Flex, Image } from "@chakra-ui/react";

interface UploadFieldImagePreviewProps {
  src: string;
  onCancel: () => void;
}

export const UploadFieldImagePreview: FC<UploadFieldImagePreviewProps> = ({
  src,
  onCancel,
}) => {
  return (
    <Flex
      justifyContent="center"
      border="2px dashed"
      borderColor="gray.400"
      borderRadius={4}
      height={200}
    >
      <Box position="relative" border="1px solid" borderColor="brand.300">
        <Image src={src} alt="Uploaded media" height="100%" />
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
