import {
  CreatableSelect,
  OnChangeValue,
  ActionMeta,
} from "chakra-react-select";
import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";
import { Control, Controller } from "react-hook-form";

export interface CreatebleSelectFieldProps<Option extends {}> {
  label?: string;
  formControlProps?: FormControlProps;
  options: Option[];
  control: Control;
  name: string;
}

export const CreatebleSelectField = <Option extends {}>({
  label,
  formControlProps,
  control,
  options,
  name,
}: CreatebleSelectFieldProps<Option>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value, ref },
        fieldState: { error },
      }) => (
        <FormControl isInvalid={Boolean(error?.message)} {...formControlProps}>
          <FormLabel>{label}</FormLabel>
          <CreatableSelect
            isMulti
            ref={ref as any}
            options={options}
            onChange={(
              newValue: OnChangeValue<Option, true>,
              actionMeta: ActionMeta<Option>
            ) => {
              console.log(actionMeta);
              onChange(newValue);
            }}
          />
          {error?.message && (
            <FormErrorMessage>{error.message}</FormErrorMessage>
          )}
        </FormControl>
      )}
    />
  );
};
