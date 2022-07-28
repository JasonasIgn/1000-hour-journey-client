import { FC, forwardRef } from "react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea,
  TextareaProps,
} from "@chakra-ui/react";

interface TextAreaFieldProps extends TextareaProps {
  value?: string;
  label?: string;
  errorMessage?: string;
}

export const TextAreaField: FC<TextAreaFieldProps> = forwardRef(
  ({ label, errorMessage, ...rest }, ref) => {
    return (
      <FormControl isInvalid={Boolean(errorMessage)}>
        <FormLabel>{label}</FormLabel>
        <Textarea {...rest} ref={ref as any} />
        {!errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
      </FormControl>
    );
  }
);
