import { extendTheme } from "@chakra-ui/react";
import { ButtonStyle } from "./components/Button";
import { FormLabelStyle } from "./components/FormLabel";
import { HeadingStyle } from "./components/Heading";
import { InputStyle } from "./components/Input";
import { ModalStyle } from "./components/Modal";
import { NumberInputStyle } from "./components/NumberInput";
import { ProgressStyle } from "./components/Progress";
import { TextStyle } from "./components/Text";
import { TextareaStyle } from "./components/Textarea";

const theme = extendTheme({
  colors: {
    brand: {
      50: "#008FCC",
      100: "#0081B8",
      200: "#0072A3",
      300: "#00648F",
      400: "#00567A",
      500: "#004766",
      600: "#003952",
      700: "#002B3D",
      800: "#001D29",
      900: "#000E14",
    },
  },
  components: {
    Heading: HeadingStyle,
    Text: TextStyle,
    Progress: ProgressStyle,
    Modal: ModalStyle,
    FormLabel: FormLabelStyle,
    Input: InputStyle,
    Textarea: TextareaStyle,
    NumberInput: NumberInputStyle,
    Button: ButtonStyle,
  },
});

export default theme;
