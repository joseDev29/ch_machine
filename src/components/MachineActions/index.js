import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

import "./styles.css";

export const MachineActions = () => {
  const {
    machineState: {
      kernel,
      memory_count,
      memory_max_count,
      last_memory_pos,
      memory,
    },
    buttonsState: { initiMachineBtnActive, resetMachineBtnActive },
    changeMachineState,
    changeButtonsState,
    resetAll,
  } = useContext(AppContext);

  const onInitMachine = () => {
    if (kernel > memory_count) {
      return alert(
        "Error: La cantidad reservada para el kernel no puede ser mayor a la capacidad de la memoria principal"
      );
    }

    if (kernel < 10 || memory_count < 50) {
      return alert(
        "Error: Los valores minimos son 10 para el kernel y 50 para la memoria principal"
      );
    }

    if (memory_count > memory_max_count) {
      return alert("Error: El valor maximo para la memoria es de 10100");
    }

    const kernelBlocks = [];

    for (let i = 0; i < kernel; i++) {
      kernelBlocks.push("Kernel");
    }

    changeMachineState({
      state: `Memoria: ${memory_count} | Kernel: ${kernel} | Modo: KERNEL`,
      memory: [...memory, ...kernelBlocks],
      last_memory_pos: last_memory_pos + kernelBlocks.length,
    });

    changeButtonsState({
      kernelMemoryBtnsActive: false,
      initiMachineBtnActive: false,
      analyzeCodeBtnActive: true,
      loadCodeBtnActive: true,
      downloadCodeBtnActive: true,
      codeSheetActive: true,
    });
  };

  const onResetMachine = () => {
    resetAll();
  };

  return (
    <div className="ma-main">
      <button
        className={`ma-btn ${initiMachineBtnActive ? "bg-pblue" : "bg-dsgray"}`}
        disabled={!initiMachineBtnActive}
        onClick={onInitMachine}
      >
        Iniciar maquina
      </button>

      <button
        className={`ma-btn ${resetMachineBtnActive ? "bg-rsred" : "bg-dsgray"}`}
        disabled={!resetMachineBtnActive}
        onClick={onResetMachine}
      >
        Resetear maquina
      </button>
    </div>
  );
};
