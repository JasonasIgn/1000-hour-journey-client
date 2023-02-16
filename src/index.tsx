import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "store";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import "./index.css";
import "react-vertical-timeline-component/style.min.css";
import theme from "./theme";
import Fonts from "./theme/Fonts";
import { createAxiosInterceptor } from "utils/interceptors";

const container = document.getElementById("root")!;
const root = createRoot(container);

createAxiosInterceptor(store);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <Fonts />
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </Provider>
);
