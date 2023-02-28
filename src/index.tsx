import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import App from "./App";

const rootEl = document.getElementById("root");
const root = ReactDOM.createRoot(rootEl as Element);

root.render(
    <React.StrictMode>
        <RecoilRoot>
            <App />
        </RecoilRoot>
    </React.StrictMode>
);
