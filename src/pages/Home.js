import React from "react";

import { CodeArea } from "../components/CodeArea";
import { MachineProperties } from "../components/MachineProperties";

export const Home = () => {
  return (
    <div style={{ width: "100%" }}>
      <a href="">
        <h1>CH Maquina</h1>
      </a>
      <div style={{ width: "100%", maxWidth: "600px" }}>
        <MachineProperties />
        <CodeArea />
      </div>
    </div>
  );
};
