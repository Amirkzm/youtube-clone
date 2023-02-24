import { ThemeProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CategoryContextProvider } from "./context/CategoryContext";
import "./index.css";
import theme from "./utils/theme";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ThemeProvider theme={theme}>
    <CategoryContextProvider>
      <App />
    </CategoryContextProvider>
  </ThemeProvider>
);
