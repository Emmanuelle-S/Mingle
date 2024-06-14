import React from "react";
import ReactDOM from "react-dom/client";
import PublishForm from "@components/PublishForm/PublishForm";
// import App from "./App";
// import "./App.cs";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    {/* <App /> */}
    <PublishForm />
  </React.StrictMode>
);
