import { FC, forwardRef, Ref } from "react";
import { ReactComponent as UploadIcon } from "../../resources/upload.svg";
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
import { InputFieldProps } from "../InputField/InputField";

interface UploadFieldProps extends InputFieldProps {
  value?: string;
  label?: string;
  errorMessage?: string;
  formControlProps?: FormControlProps;
  rootBoxProps?: BoxProps;
  ref?: Ref<HTMLInputElement>;
}

export const UploadField: FC<UploadFieldProps> = forwardRef(
  ({ label, errorMessage, formControlProps, ...rest }, ref) => {
    return (
      <FormControl isInvalid={Boolean(errorMessage)} {...formControlProps}>
        <FormLabel>{label}</FormLabel>
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
            onClick={(e) => {
              if (e.detail === 1) {
                e.preventDefault();
              }
            }}
          />
          <Box position="absolute" width="40px" height="40px" fill="gray.400">
            <UploadIcon fill="inherit" />
          </Box>
          <Text fontSize="20px" mt="44px" position="absolute">
            Drag&Drop files here
          </Text>
          <Text mt="80px" position="absolute">
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
        {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
      </FormControl>
    );
  }
);
