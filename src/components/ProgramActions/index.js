import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useProgramsExecution } from "../../hooks/useProgramsExecution";

import "./styles.css";

export const ProgramActions = () => {
  const {
    buttonsState: {
      runNotPauseBtnActive,
      runStepByStepBtnActive,
      resetMemoryPosBtnActive,
      nextInstructionBtnActive,
    },
    machineState: { running_pos },
    changeButtonsState,
    setMachineState,
  } = useContext(AppContext);

  const { runProgram } = useProgramsExecution();

  const onRunNotPause = () => {
    changeButtonsState({
      resetMemoryPosBtnActive: true,
      runStepByStepBtnActive: false,
    });

    runProgram(running_pos + 1);
  };

  const onRunStepByStep = () => {
    setMachineState((st) => {
      st.stepByStep = true;
      return st;
    });
    changeButtonsState({
      resetMemoryPosBtnActive: true,
      runStepByStepBtnActive: false,
      runNotPauseBtnActive: false,
    });
    runProgram(running_pos + 1);
  };

  const onNextInstruction = () => {
    changeButtonsState({
      nextInstructionBtnActive: false,
    });
    runProgram(running_pos + 1);
  };

  const onResetMemoryPosition = () => {};

  return (
    <div className="pa-main">
      <button
        className={`pa-btn ${runNotPauseBtnActive ? "bg-aqblue" : "bg-dsgray"}`}
        disabled={!runNotPauseBtnActive}
        onClick={onRunNotPause}
      >
        Ejecutar sin pausas
      </button>

      <button
        className={`pa-btn ${
          runStepByStepBtnActive ? "bg-dkpurple" : "bg-dsgray"
        }`}
        disabled={!runStepByStepBtnActive}
        onClick={onRunStepByStep}
      >
        Ejecutar paso a paso
      </button>

      <button
        className={`pa-btn ${
          resetMemoryPosBtnActive ? "bg-strose" : "bg-dsgray"
        }`}
        disabled={!resetMemoryPosBtnActive}
        onClick={onResetMemoryPosition}
      >
        Reiniciar posicion de memoria
      </button>

      <button
        className={`pa-btn ${
          nextInstructionBtnActive ? "bg-nxyellow" : "bg-dsgray"
        }`}
        disabled={!nextInstructionBtnActive}
        onClick={onNextInstruction}
      >
        Siguiente instruccion
      </button>
    </div>
  );
};
