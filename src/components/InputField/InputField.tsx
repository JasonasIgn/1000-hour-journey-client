import { FC, forwardRef, Ref } from "react";
import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  Input,
  InputProps,
} from "@chakra-ui/react";

export interface InputFieldProps extends InputProps {
  value?: string;
  label?: string;
  errorMessage?: string;
  formControlProps?: FormControlProps;
  ref?: Ref<any>;
}

export const InputField: FC<InputFieldProps> = forwardRef(
  ({ label, errorMessage, formControlProps, ...rest }, ref) => {
    return (
      <FormControl isInvalid={Boolean(errorMessage)} {...formControlProps}>
        <FormLabel>{label}</FormLabel>
        <Input {...rest} ref={ref as any} />
        {errorMessage && (
          <FormErrorMessage color="red">{errorMessage}</FormErrorMessage>
        )}
      </FormControl>
    );
  }
);
