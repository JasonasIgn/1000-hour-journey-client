import {
  Select as ChakraSelect,
  Props,
  GroupBase,
  SelectInstance,
} from "chakra-react-select";
import { RefAttributes } from "react";
import { chakraStyles } from "./styles";

export interface SelectProps<Option extends {}>
  extends Props<Option, false, GroupBase<Option>>,
    RefAttributes<SelectInstance<Option, false, GroupBase<Option>>> {}

export const Select = <Option extends {}>(props: SelectProps<Option>) => {
  return (
    <ChakraSelect<Option>
      chakraStyles={chakraStyles}
      {...props}
      isMulti={false}
    />
  );
};
