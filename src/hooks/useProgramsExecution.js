import { useContext } from "react";
import { Subject } from "rxjs";
import { AppContext } from "../context/AppContext";
import { add } from "./operations/add";
import { AND } from "./operations/AND";
import { concatenate } from "./operations/concatenate";
import { deleteOp } from "./operations/delete";
import { division } from "./operations/division";
import { exponentiation } from "./operations/exponentiation";
import { extract } from "./operations/extract";
import { go } from "./operations/go";
import { goIf } from "./operations/goIf";
import { load } from "./operations/load";
import { moduleOp } from "./operations/module";
import { multiply } from "./operations/multiply";
import { NOT } from "./operations/NOT";
import { OR } from "./operations/OR";
import { print } from "./operations/print";
import { read } from "./operations/read";
import { returnOp } from "./operations/returnOp";
import { show } from "./operations/show";
import { store } from "./operations/store";
import { subtract } from "./operations/subtract";

export const useProgramsExecution = () => {
  const {
    machineState: { memory, stepByStep, last_memory_pos },
    changeButtonsState,
    setMachineState,
    changeMachineState,
    readInputEvent,
  } = useContext(AppContext);

  const runProgram = (running_pos) => {
    if (running_pos > last_memory_pos) {
      return;
    }

    const running_program = memory[running_pos]?.program_id | null;

    setMachineState((st) => {
      if (st.running_program != running_program) {
        st.accumulator = 0;
        st.monitor = "";
        st.printer = "";
      }
      st.running_program = running_program;
      return st;
    });

    // console.log("pos: ", running_pos);
    // console.log("id: ", running_program);
    // console.log("line: ", memory[running_pos]);

    if (running_pos === 0 || memory[running_pos] === "Kernel") {
      setMachineState((st) => {
        st.running_pos += 1;
        return st;
      });
      return runProgram(running_pos + 1);
    }

    //Add
    if (memory[running_pos].line_type === "add_declaration") {
      add(memory[running_pos], setMachineState, changeMachineState);
    }
    //AND
    else if (memory[running_pos].line_type === "and_declaration") {
      AND(memory[running_pos], setMachineState, changeMachineState);
    }
    //Concatenate
    else if (memory[running_pos].line_type === "concatenate_declaration") {
      concatenate(memory[running_pos], setMachineState, changeMachineState);
    }
    //Delete
    else if (memory[running_pos].line_type === "delete_declaration") {
      deleteOp(memory[running_pos], setMachineState, changeMachineState);
    }
    //Division
    else if (memory[running_pos].line_type === "division_declaration") {
      division(memory[running_pos], setMachineState, changeMachineState);
    }
    //Exponentiation
    else if (memory[running_pos].line_type === "exponent_declaration") {
      exponentiation(memory[running_pos], setMachineState, changeMachineState);
    }
    //Extract
    else if (memory[running_pos].line_type === "extract_declaration") {
      extract(memory[running_pos], setMachineState, changeMachineState);
    }
    //Go
    else if (memory[running_pos].line_type === "go_declaration") {
      const posEvent = new Subject();

      posEvent.subscribe((pos) => {
        console.log(pos);
        runProgram(pos);
      });

      return go(
        memory[running_pos],
        setMachineState,
        changeMachineState,
        posEvent
      );
    }
    //Go If
    else if (memory[running_pos].line_type === "goif_declaration") {
      const posEvent = new Subject();

      posEvent.subscribe((pos) => {
        if (pos) {
          runProgram(pos);
        } else {
          runProgram(running_pos + 1);
        }
      });

      return goIf(
        memory[running_pos],
        setMachineState,
        changeMachineState,
        posEvent
      );
    }
    //Load
    else if (memory[running_pos].line_type === "load_declaration") {
      load(memory[running_pos], setMachineState, changeMachineState);
    }
    //Module
    else if (memory[running_pos].line_type === "module_declaration") {
      moduleOp(memory[running_pos], setMachineState, changeMachineState);
    }
    //Multiply
    else if (memory[running_pos].line_type === "multiply_declaration") {
      multiply(memory[running_pos], setMachineState, changeMachineState);
    }
    //NOT
    else if (memory[running_pos].line_type === "not_declaration") {
      NOT(memory[running_pos], setMachineState, changeMachineState);
    }
    //OR
    else if (memory[running_pos].line_type === "or_declaration") {
      OR(memory[running_pos], setMachineState, changeMachineState);
    }
    //Print
    else if (memory[running_pos].line_type === "print_declaration") {
      print(memory[running_pos], setMachineState, changeMachineState);
    }
    //Read
    else if (memory[running_pos].line_type === "read_declaration") {
      return read(
        memory[running_pos],
        setMachineState,
        changeMachineState,
        readInputEvent
      );
    }
    //Return
    else if (memory[running_pos].line_type === "return_declaration") {
      returnOp(memory[running_pos], setMachineState, changeMachineState);
    }
    //Show
    else if (memory[running_pos].line_type === "show_declaration") {
      show(memory[running_pos], setMachineState, changeMachineState);
    }
    //Store
    else if (memory[running_pos].line_type === "store_declaration") {
      store(memory[running_pos], setMachineState, changeMachineState);
    }
    //Subtract
    else if (memory[running_pos].line_type === "subtract_declaration") {
      subtract(memory[running_pos], setMachineState, changeMachineState);
    }

    setMachineState((st) => {
      st.running_pos += 1;
      return st;
    });

    if (running_pos === last_memory_pos) {
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
