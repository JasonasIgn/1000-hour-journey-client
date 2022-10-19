import {
  CreatableSelect,
  CreatableProps,
  OnChangeValue,
  ActionMeta,
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
import { chakraStyles } from "./style";

export interface CreatebleSelectFieldProps<Option extends {}>
  extends CreatableProps<Option, true, GroupBase<Option>> {
  label?: string;
  formControlProps?: FormControlProps;
  control: Control;
  name: string;
}

export const CreatebleSelectField = <Option extends {}>({
  label,
  formControlProps,
  control,
  options,
  name,
  ...rest
}: CreatebleSelectFieldProps<Option>) => {
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
            onChange={(
              newValue: OnChangeValue<Option, true>,
              actionMeta: ActionMeta<Option>
            ) => {
              console.log(actionMeta);
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
