import React from "react";
import { CodeActions } from "../components/CodeActions";
import { CodeInputs } from "../components/CodeInputs";
import { ErrorsArea } from "../components/ErrorsArea";
import { MachineActions } from "../components/MachineActions";
import { MachinePropertiesInput } from "../components/MachinePropertiesInput";
import { MachineState } from "../components/MachineState";
import { MemoryTable } from "../components/MemoryTable";
import { ProgramActions } from "../components/ProgramActions";
import { ProgramState } from "../components/ProgramState";

export const Home = () => {
  return (
    <div style={{ width: "100%", padding: "24px", display: "flex" }}>
      <div style={{ width: "100%", maxWidth: "400px" }}>
        <MachinePropertiesInput />
        <MachineActions />
        <MachineState />
        <ProgramState />
        <ProgramActions />
        <CodeActions />
        <CodeInputs />
      </div>
      <div style={{ width: "100%", maxWidth: "400px" }}>
        <ErrorsArea />
      </div>
      <div style={{ width: "100%", maxWidth: "300px" }}>
        <MemoryTable />
      </div>
    </div>
  );
};
