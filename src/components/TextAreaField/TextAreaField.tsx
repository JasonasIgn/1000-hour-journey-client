import { FC, forwardRef } from "react";
import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  Textarea,
  TextareaProps,
} from "@chakra-ui/react";

interface TextAreaFieldProps extends TextareaProps {
  value?: string;
  label?: string;
  errorMessage?: string;
  formControlProps?: FormControlProps;
}

export const TextAreaField: FC<TextAreaFieldProps> = forwardRef(
  ({ label, errorMessage, formControlProps, ...rest }, ref) => {
    return (
      <FormControl isInvalid={Boolean(errorMessage)} {...formControlProps}>
        <FormLabel>{label}</FormLabel>
        <Textarea {...rest} ref={ref as any} />
        {errorMessage && (
          <FormErrorMessage color="red">{errorMessage}</FormErrorMessage>
        )}
      </FormControl>
    );
  }
);
