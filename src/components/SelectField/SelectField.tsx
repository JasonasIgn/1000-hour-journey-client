import { SingleValue } from "chakra-react-select";
import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";
import { Control, Controller } from "react-hook-form";
import { Select, SelectProps } from "components";

export interface SelectFieldProps<Option extends {}>
  extends SelectProps<Option> {
  label?: string;
  formControlProps?: FormControlProps;
  control: Control;
  name: string;
}

export const SelectField = <Option extends {}>({
  label,
  formControlProps,
  control,
  options,
  name,
  ...rest
}: SelectFieldProps<Option>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
        <FormControl isInvalid={Boolean(error?.message)} {...formControlProps}>
          <FormLabel>{label}</FormLabel>
          <Select<Option>
            ref={ref as any}
            options={options}
            value={value}
            onChange={(newValue: SingleValue<Option>) => {
              onChange(newValue);
            }}
            {...rest}
            isMulti={false}
          />
          {error?.message && (
            <FormErrorMessage>{error.message}</FormErrorMessage>
          )}
        </FormControl>
      )}
    />
  );
};
