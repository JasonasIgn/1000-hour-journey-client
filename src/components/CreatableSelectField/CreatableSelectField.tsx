import {
  CreatableSelect,
  CreatableProps,
  OnChangeValue,
  GroupBase,
  ChakraStylesConfig,
} from "chakra-react-select";
import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";
import { Control, Controller } from "react-hook-form";
import { chakraStyles } from "./styles";

export interface CreatableSelectFieldProps<Option extends {}>
  extends CreatableProps<Option, true, GroupBase<Option>> {
  label?: string;
  formControlProps?: FormControlProps;
  control: Control;
  name: string;
}

export const CreatableSelectField = <Option extends {}>({
  label,
  formControlProps,
  control,
  options,
  name,
  ...rest
}: CreatableSelectFieldProps<Option>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
        <FormControl isInvalid={Boolean(error?.message)} {...formControlProps}>
          <FormLabel>{label}</FormLabel>
          <CreatableSelect
            chakraStyles={
              chakraStyles as ChakraStylesConfig<
                Option,
                true,
                GroupBase<Option>
              >
            }
            isMulti
            ref={ref as any}
            options={options}
            value={value}
            onChange={(newValue: OnChangeValue<Option, true>) => {
              onChange(newValue);
            }}
            {...rest}
          />
          {error?.message && (
            <FormErrorMessage>{error.message}</FormErrorMessage>
          )}
        </FormControl>
      )}
    />
  );
};
