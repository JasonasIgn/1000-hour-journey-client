import { FC, forwardRef, Ref, useState } from "react";
import { ReactComponent as UploadIcon } from "resources/upload.svg";
import {
  Box,
  BoxProps,
  Button,
  Flex,
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { InputFieldProps } from "components";
import { UploadFieldImagePreview } from "./UploadFieldImagePreview";
import { getImageSrc } from "utils/helpers";

interface UploadFieldProps extends InputFieldProps {
  value?: string;
  label?: string;
  errorMessage?: string;
  formControlProps?: FormControlProps;
  rootBoxProps?: BoxProps;
  ref?: Ref<HTMLInputElement>;
  onClear: () => void;
  initialPreviewSrc?: string;
}

export const UploadField: FC<UploadFieldProps> = forwardRef(
  (
    {
      label,
      errorMessage,
      formControlProps,
      onChange,
      onClear,
      initialPreviewSrc,
      ...rest
    },
    ref
  ) => {
    const [previewSrc, setPreviewSrc] = useState<string | null>(
      getImageSrc(initialPreviewSrc) || null
    );

    return (
      <FormControl isInvalid={Boolean(errorMessage)} {...formControlProps}>
        <FormLabel>{label}</FormLabel>
        {previewSrc ? (
          <UploadFieldImagePreview
            src={previewSrc}
            onCancel={() => {
              setPreviewSrc(null);
              onClear();
            }}
          />
        ) : (
          <Flex
            position="relative"
            width="100%"
            height="100%"
            border="2px dashed"
            borderColor="gray.400"
            borderRadius={4}
            minHeight="200px"
            justifyContent="center"
            padding={4}
          >
            <Input
              {...rest}
              ref={ref}
              opacity={0}
              type="file"
              position="absolute"
              width="100%"
              height="100%"
              id="upload-input"
              top={0}
              onChange={(e) => {
                if (onChange) {
                  onChange(e);
                  if (e.target.files?.[0]) {
                    setPreviewSrc(URL.createObjectURL(e.target.files[0]));
                  }
                }
              }}
              onClick={(e) => {
                if (e.detail === 1) {
                  e.preventDefault();
                }
              }}
            />
            <Box
              position="absolute"
              width="40px"
              height="40px"
              fill="gray.400"
              zIndex={-1}
            >
              <UploadIcon fill="inherit" />
            </Box>
            <Text fontSize="20px" mt="44px" position="absolute" zIndex={-1}>
              Drag&Drop files here
            </Text>
            <Text mt="80px" position="absolute" zIndex={-1}>
              or
            </Text>
            <Button
              mt="120px"
              position="absolute"
              onClick={() => {
                const uploadInput = document.getElementById("upload-input");
                if (uploadInput) {
                  uploadInput.click();
                }
              }}
            >
              Browse files
            </Button>
          </Flex>
        )}
        {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
      </FormControl>
    );
  }
);
