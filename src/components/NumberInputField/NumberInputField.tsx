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
  onChange: (value: number | string) => void;
  value?: number;
}

export const NumberInputField: FC<NumberInputFieldaProps> = forwardRef(
  ({ label, errorMessage, formControlProps, onChange, ...rest }, ref) => {
    return (
      <FormControl isInvalid={Boolean(errorMessage)} {...formControlProps}>
        <FormLabel>{label}</FormLabel>
        <NumberInput
          step={0.1}
          precision={1}
          {...rest}
          ref={ref as any}
          onChange={onChange}
          min={0}
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
