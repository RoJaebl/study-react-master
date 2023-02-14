import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import App from "./App";

const rootEl = document.getElementById("root");
const root = ReactDOM.createRoot(rootEl as Element);

const darkTheme = {
    textColor: "whitesmoke",
    backgroundColer: "#111",
};
const lightTheme = {
    textColor: "#111",
    backgroundColer: "whitesmoke",
};
root.render(
    <React.StrictMode>
        <ThemeProvider theme={darkTheme}>
            <App />
        </ThemeProvider>
    </React.StrictMode>
);
