import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { add } from "./operations/add";

export const useProgramsExecution = () => {
  const {
    machineState: { memory, stepByStep, last_memory_pos },
    changeButtonsState,
    setMachineState,
    changeMachineState,
  } = useContext(AppContext);

  const runProgram = (running_pos) => {
    const running_program = memory[running_pos]?.program_id | null;

    setMachineState((st) => {
      if (st.running_program != running_program) {
        st.accumulator = 0;
      }
      st.running_program = running_program;
      return st;
    });

    console.log("pos: ", running_pos);
    console.log("id: ", running_program);
    console.log("line: ", memory[running_pos]);

    if (running_pos === 0 || memory[running_pos] === "Kernel") {
      setMachineState((st) => {
        st.running_pos += 1;
        return st;
      });
      return runProgram(running_pos + 1);
    }

    if (memory[running_pos].line_type === "add_declaration") {
      add(memory[running_pos], setMachineState, changeMachineState);
    }

    setMachineState((st) => {
      st.running_pos += 1;
      return st;
    });

    if (running_pos >= last_memory_pos) {
      return;
    }

    if (stepByStep) {
      return changeButtonsState({
        nextInstructionBtnActive: true,
      });
    } else {
      return runProgram(running_pos + 1);
    }
  };

  return {
    runProgram,
  };
};
