import "@empoleon/core/styles.css";
import { EmpoleonProvider } from "@empoleon/core";
import { theme } from "./theme";

export default function App() {
  return <EmpoleonProvider theme={theme}>
    Playground
  </EmpoleonProvider>;
}
