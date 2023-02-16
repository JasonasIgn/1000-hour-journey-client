import { extendTheme } from "@chakra-ui/react";
import * as components from "./components";
import colors from "./foundations/colors";
import styles from "./styles";

const theme = extendTheme({
  colors,
  components: {
    ...components,
  },
  fonts: {
    heading: `chakra_petch, sans-serif`,
    body: `chakra_petch, sans-serif`,
  },
  styles,
});

export default theme;
