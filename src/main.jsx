import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider, LoadingProvider } from "@context";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LoadingProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </LoadingProvider>
  </StrictMode>,
);
