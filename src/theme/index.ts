import { extendTheme } from "@chakra-ui/react";
import { HeadingStyle } from "./components/Heading";
import { ProgressStyle } from "./components/Progress";
import { TextStyle } from "./components/Text";

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
  },
});

export default theme;
