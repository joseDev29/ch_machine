import React from "react";
import { CodeActions } from "../components/CodeActions";
import { CodeInputs } from "../components/CodeInputs";
import { ErrorsArea } from "../components/ErrorsArea";
import { LabelsInfo } from "../components/LabelsInfo";
import { MachineActions } from "../components/MachineActions";
import { MachinePropertiesInput } from "../components/MachinePropertiesInput";
import { MachineState } from "../components/MachineState";
import { MemoryTable } from "../components/MemoryTable";
import { Monitor } from "../components/Monitor";
import { Printer } from "../components/Printer";
import { ProgramActions } from "../components/ProgramActions";
import { ProgramsInfo } from "../components/ProgramsInfo";
import { ProgramState } from "../components/ProgramState";
import { ReadOperationZone } from "../components/ReadOperationZone";
import { VariablesInfo } from "../components/VariablesInfo";

export const Home = () => {
  return (
    <div style={{ width: "100%", padding: "24px", display: "flex" }}>
      <div style={{ width: "100%", maxWidth: "400px" }}>
        <MachinePropertiesInput />
        <MachineActions />
        <MachineState />
        <ProgramState />
        <ReadOperationZone />
        <ProgramActions />
        <CodeActions />
        <CodeInputs />
      </div>
      <div style={{ width: "100%", maxWidth: "400px", padding: "0 12px" }}>
        <Monitor />
        <Printer />
        <ErrorsArea />
        <ProgramsInfo />
        <VariablesInfo />
        <LabelsInfo />
      </div>
      <div style={{ width: "100%", maxWidth: "300px" }}>
        <MemoryTable />
      </div>
    </div>
  );
};
