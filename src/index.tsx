import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "store";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import "./index.css";
import theme from "./theme";
import { createAxiosInterceptor } from "utils/interceptors";

const container = document.getElementById("root")!;
const root = createRoot(container);

createAxiosInterceptor(store);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </Provider>
);
