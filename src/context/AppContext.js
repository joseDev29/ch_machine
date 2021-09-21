import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [generalState, setGeneralState] = useState({
    filename: "Ningun archivo seleccionado",
    rawCode: "",
  });

  const [buttonsState, setButtonsState] = useState({
    loadCodeBtnActive: true,
    downloadCodeBtnActive: false,
    runBtnActive: false,
    playPauseBtnActive: false,
    analyzeCodeBtnActive: false,
    initiMachineBtnActive: false,
    resetMachineBtnActive: false,
    kernelMemoryBtnsActive: false,
  });

  const [machineState, setMachineState] = useState({
    code: null,
    kernel: 0,
    memory_count: 0,
    last_memory_pos: 0,
    accumulator: 0,
    memory: [0],
    errors: [],
    programs: {},
    programs_temp: {},
  });

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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
