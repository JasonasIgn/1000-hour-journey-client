import { FC, forwardRef } from "react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputProps,
} from "@chakra-ui/react";

interface InputFieldProps extends InputProps {
  value?: string;
  label?: string;
  errorMessage?: string;
}

export const InputField: FC<InputFieldProps> = forwardRef(
  ({ label, errorMessage, ...rest }, ref) => {
    return (
      <FormControl isInvalid={Boolean(errorMessage)}>
        <FormLabel>{label}</FormLabel>
        <Input {...rest} ref={ref as any} />
        {!errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
      </FormControl>
    );
  }
);
