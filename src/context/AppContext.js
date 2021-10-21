import { createContext, useRef, useState } from "react";
import { Subject } from "rxjs";

const initialGeneralState = {
  filename: "Sin nombre",
  rawCode: "",
};

const initialMachineState = {
  state: "NO INICIADA",
  code: null,
  kernel: 25,
  memory_count: 150,
  memory_max_count: 10100,
  last_memory_pos: 0,
  accumulator: 0,
  memory: [0],
  errors: [],
  programs: {},
  programs_temp: {},
  running_program: null,
  running_pos: 0,
  stepByStep: false,
  all_variables: [],
  all_labels: [],
  printer: "",
  monitor: "",
};

const initialButtonsState = {
  initiMachineBtnActive: true,
  resetMachineBtnActive: true,
  kernelMemoryBtnsActive: true,

  codeSheetActive: false,
  loadCodeBtnActive: false,
  downloadCodeBtnActive: false,
  analyzeCodeBtnActive: false,

  runNotPauseBtnActive: false,
  runStepByStepBtnActive: false,
  resetMemoryPosBtnActive: false,
  nextInstructionBtnActive: false,
};

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [generalState, setGeneralState] = useState(initialGeneralState);

  const [buttonsState, setButtonsState] = useState(initialButtonsState);

  const [machineState, setMachineState] = useState(initialMachineState);

  const readInputEvent = useRef(new Subject());

  const changeGeneralState = (value) => {
    setGeneralState((prevState) => {
      return {
        ...prevState,
        ...value,
      };
    });
  };

  const changeButtonsState = (value) => {
    setButtonsState((prevState) => {
      return {
        ...prevState,
        ...value,
      };
    });
  };

  const changeMachineState = (value) => {
    setMachineState((prevState) => {
      return {
        ...prevState,
        ...value,
      };
    });
  };

  const getGeneralState = () => {
    let state;
    setGeneralState((st) => {
      state = st;
      return st;
    });

    return state;
  };

  const resetMachineState = () => {
    setMachineState((st) => {
      st = {
        state: "NO INICIADA",
        code: null,
        kernel: 25,
        memory_count: 150,
        memory_max_count: 10100,
        last_memory_pos: 0,
        accumulator: 0,
        memory: [0],
        errors: [],
        programs: {},
        programs_temp: {},
        running_program: null,
        running_pos: 0,
        stepByStep: false,
        all_variables: [],
        all_labels: [],
        printer: "",
        monitor: "",
      };
      return st;
    });
  };

  const resetButtonsState = () => {
    setButtonsState((st) => {
      st = initialButtonsState;
      return st;
    });
  };

  const resetGeneralState = () => {
    setGeneralState((st) => {
      st = initialGeneralState;
      return st;
    });
  };

  const resetAll = () => {
    resetMachineState();
    resetButtonsState();
    resetGeneralState();
  };

  return (
    <AppContext.Provider
      value={{
        generalState,
        buttonsState,
        machineState,
        readInputEvent,
        changeGeneralState,
        changeButtonsState,
        changeMachineState,
        setMachineState,
        setButtonsState,
        getGeneralState,
        resetMachineState,
        resetButtonsState,
        resetGeneralState,
        resetAll,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
