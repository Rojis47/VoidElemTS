import React from "react";
import ReactDOM from "react-dom";
import App from "./views/App";
import "./styles/index.css";
import { ProjectsProvider } from "../src/contexts/ProjectsProvider";

ReactDOM.render(
  <React.StrictMode>
    <ProjectsProvider>
      <App />
    </ProjectsProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
