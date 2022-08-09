import { FC, forwardRef } from "react";
import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputProps,
  NumberInputField as NumberInputFieldNative,
  NumberInputStepper,
} from "@chakra-ui/react";

interface NumberInputFieldaProps
  extends Omit<NumberInputProps, "onChange" | "min" | "max" | "value"> {
  label?: string;
  errorMessage?: string;
  formControlProps?: FormControlProps;
  onChange: (value: number) => void;
  value?: number;
}

export const NumberInputField: FC<NumberInputFieldaProps> = forwardRef(
  (
    { label, errorMessage, formControlProps, onChange, ...rest },
    ref
  ) => {
    return (
      <FormControl isInvalid={Boolean(errorMessage)} {...formControlProps}>
        <FormLabel>{label}</FormLabel>
        <NumberInput
          {...rest}
          ref={ref as any}
          onChange={(_, val) => {
            onChange(val);
          }}
        >
          <NumberInputFieldNative />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
      </FormControl>
    );
  }
);
