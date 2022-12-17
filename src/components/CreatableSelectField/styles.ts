import { ChakraStylesConfig } from "chakra-react-select";

export const chakraStyles: ChakraStylesConfig = {
  dropdownIndicator: (provided) => ({
    ...provided,
    background: "brand.900",
    _hover: {
      background: "brand.700",
    },
  }),
  option: (provided) => ({
    ...provided,
    bg: "brand.900",
  }),
};
