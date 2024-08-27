import React from "react";
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./Styles/index.css";
import App from "./app"; // Ensure that 'App' is correctly imported, considering case sensitivity
import * as serviceWorkerRegistration from "./serviceWorkerRegistration"; // Import service worker registration

// Your Google OAuth client ID
const clientId = "629532059065-4j23s0lue75963uam09g0csv47ao16ke.apps.googleusercontent.com";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);

// Register the service worker to enable PWA features
serviceWorkerRegistration.register();
