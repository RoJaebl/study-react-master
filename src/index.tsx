import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";

const rootEl = document.getElementById("root");
const root = ReactDOM.createRoot(rootEl as Element);

const queryClient = new QueryClient();

root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <HelmetProvider>
                <RouterProvider router={router} />
            </HelmetProvider>
        </QueryClientProvider>
    </React.StrictMode>
);
