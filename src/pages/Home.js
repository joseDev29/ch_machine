import React from "react";

import { CodeArea } from "../components/CodeArea";
import { ErrorsArea } from "../components/ErrorsArea";
import { MachineProperties } from "../components/MachineProperties";
import { MemoryTable } from "../components/MemoryTable";

export const Home = () => {
  return (
    <div style={{ width: "100%" }}>
      <a href="">
        <h1>CH Maquina</h1>
      </a>
      <div style={{ width: "100%", display: "flex" }}>
        <div style={{ width: "100%", maxWidth: "500px" }}>
          <MachineProperties />
          <CodeArea />
        </div>
        <div style={{ width: "100%", maxWidth: "500px" }}>
          <ErrorsArea />
        </div>
        <div style={{ width: "100%", maxWidth: "500px" }}>
          <MemoryTable />
        </div>
      </div>
    </div>
  );
};
