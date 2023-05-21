import React from "react";
import CutomRoutes from "./routes";
import { BrowserRouter } from "react-router-dom";
import "./UI/Common/Common.scss";
import { SnackbarProvider } from "notistack";
import "./App.css";

function App() {
  return (
    <SnackbarProvider
      maxSnack={1}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
    >
      <BrowserRouter>
        <CutomRoutes />
      </BrowserRouter>
    </SnackbarProvider>
  );
}

export default App;
