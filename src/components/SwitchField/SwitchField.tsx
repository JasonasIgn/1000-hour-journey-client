import { FC, forwardRef } from "react";
import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  SwitchProps,
  Switch,
} from "@chakra-ui/react";

interface SwitchFieldProps extends SwitchProps {
  value?: string;
  label?: string;
  errorMessage?: string;
  formControlProps?: FormControlProps;
}

export const SwitchField: FC<SwitchFieldProps> = forwardRef(
  ({ label, errorMessage, formControlProps, ...rest }, ref) => {
    return (
      <FormControl
        p={2}
        display="flex"
        isInvalid={Boolean(errorMessage)}
        {...formControlProps}
        border="1px solid"
        borderColor="gray.400"
        justifyContent="space-between"
        alignItems="center"
        borderRadius="6px"
      >
        <FormLabel m={0}>{label}</FormLabel>
        <Switch size="lg" {...rest} ref={ref as any} />
        {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
      </FormControl>
    );
  }
);
