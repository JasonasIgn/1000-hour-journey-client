import { extendTheme } from "@chakra-ui/react";
import * as components from "./components";

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
    ...components,
  },
  styles: {
    global: () => ({
      body: {
        letterSpacing: 0,
        color: "gray.300",
      },
    }),
  },
});

export default theme;
