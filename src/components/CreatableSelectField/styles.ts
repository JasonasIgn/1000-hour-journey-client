import { ChakraStylesConfig } from "chakra-react-select";

export const chakraStyles: ChakraStylesConfig = {
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
  option: (provided, state) => {
    return {
      ...provided,
      ...((state.data as any)?.color
        ? { color: (state.data as any).color }
        : {}),
    };
  },
};
