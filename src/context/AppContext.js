import { createContext, useState } from "react";

const initialGeneralState = {
  filename: "Sin nombre",
  rawCode: "",
};

const initialMachineState = {
  state: "NO INICIADA",
  code: null,
  kernel: 109,
  memory_count: 150,
  memory_max_count: 10100,
  last_memory_pos: 0,
  accumulator: 0,
  memory: [0],
  errors: [],
  programs: {},
  programs_temp: {},
};

const initialButtonsState = {
  codeSheetActive: false,
  loadCodeBtnActive: false,
  downloadCodeBtnActive: false,
  runBtnActive: false,
  playPauseBtnActive: false,
  analyzeCodeBtnActive: false,
  initiMachineBtnActive: true,
  resetMachineBtnActive: true,
  kernelMemoryBtnsActive: true,
};

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [generalState, setGeneralState] = useState(initialGeneralState);

  const [buttonsState, setButtonsState] = useState(initialButtonsState);

  const [machineState, setMachineState] = useState(initialMachineState);

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
      st = initialMachineState;
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
        changeGeneralState,
        changeButtonsState,
        changeMachineState,
        setMachineState,
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
