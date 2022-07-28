import { FC, forwardRef } from "react";
import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  Input,
  InputProps,
} from "@chakra-ui/react";

interface InputFieldProps extends InputProps {
  value?: string;
  label?: string;
  errorMessage?: string;
  formControlProps?: FormControlProps;
}

export const InputField: FC<InputFieldProps> = forwardRef(
  ({ label, errorMessage, formControlProps, ...rest }, ref) => {
    return (
      <FormControl isInvalid={Boolean(errorMessage)} {...formControlProps}>
        <FormLabel>{label}</FormLabel>
        <Input {...rest} ref={ref as any} />
        {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
      </FormControl>
    );
  }
);
