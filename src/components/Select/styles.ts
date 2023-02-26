import { ChakraStylesConfig, GroupBase } from "chakra-react-select";

export const chakraStyles: ChakraStylesConfig<any, false, GroupBase<any>> = {
  dropdownIndicator: (provided) => ({
    ...provided,
    background: "brand.900",
    _hover: {
      background: "brand.700",
    },
  }),
  indicatorSeparator: (provided, state) => ({
    ...provided,
    borderColor: state.isFocused ? "brand.400" : "gray.400",
  }),
};
