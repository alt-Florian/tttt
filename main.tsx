import { DialogBoxProvider } from "@hooks/context/DialogBox.context.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import ErrorBoundary from "@components/ui/ErrorBoundary.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
  
    <BrowserRouter>
       
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary>
        <DialogBoxProvider>
          <App />
          </DialogBoxProvider>
          </ErrorBoundary>
      </QueryClientProvider>
      
      </BrowserRouter>
    
  </React.StrictMode>
);
