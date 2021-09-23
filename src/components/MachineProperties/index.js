import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useVerifyCode } from "../../hooks/useVerifyCode";
import "./styles.css";

export const MachineProperties = () => {
  const {
    machineState,
    generalState,
    changeMachineState,
    changeButtonsState,
    changeGeneralState,
    buttonsState: {
      runBtnActive,
      playPauseBtnActive,
      analyzeCodeBtnActive,
      initiMachineBtnActive,
      resetMachineBtnActive,
      kernelMemoryBtnsActive,
    },
    resetAll,
  } = useContext(AppContext);

  const { orderCode } = useVerifyCode();

  const increaseKernel = () => {
    changeMachineState({ kernel: machineState.kernel + 1 });
  };

  const decreaseKernel = () => {
    if (!machineState.kernel) return;

    changeMachineState({ kernel: machineState.kernel - 1 });
  };

  const increaseMemory = () => {
    changeMachineState({ memory_count: machineState.memory_count + 1 });
  };

  const decreaseMemory = () => {
    if (!machineState.memory_count) return;

    changeMachineState({ memory_count: machineState.memory_count - 1 });
  };

  const onChangeInputKernel = (ev) => {
    if (Number(ev.target.value) < 0) return;

    changeMachineState({ kernel: Number(ev.target.value) });
  };

  const onChangeInputMemory = (ev) => {
    if (Number(ev.target.value) < 0) return;

    changeMachineState({ memory_count: Number(ev.target.value) });
  };

  const onInitMachine = () => {
    if (machineState.kernel > machineState.memory_count) {
      return alert(
        "Error: La cantidad reservada para el kernel no puede ser mayor a la capacidad de la memoria principal"
      );
    }

    if (machineState.kernel < 10 || machineState.memory_count < 50) {
      return alert(
        "Error: Los valores minimos son 10 para el kernel y 50 para la memoria principal"
      );
    }

    if (machineState.memory_count > machineState.memory_max_count) {
      return alert("Error: El valor maximo para la memoria es de 10100");
    }

    const kernelBlocks = [];

    for (let i = 0; i < machineState.kernel; i++) {
      kernelBlocks.push("Kernel");
    }

    changeMachineState({
      state: `Memoria: ${machineState.memory_count} | Kernel: ${machineState.kernel} | Modo: KERNEL`,
      memory: [...machineState.memory, ...kernelBlocks],
      last_memory_pos: machineState.last_memory_pos + kernelBlocks.length,
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

  const onAnalyzeCode = () => {
    orderCode(generalState.rawCode, generalState.filename);
  };

  const onResetMachine = () => {
    resetAll();
  };

  return (
    <div className="mchp__main">
      <div className="mchp__mhc-data-main">
        <div className="mchp__mhc-data">
          {/* Machine properties inputs */}
          <div className="mchp__kernel-mem">
            {/* Memory Input */}
            <div className="mchp__km-item">
              <p
                className="mchp__km-item-title"
                style={{
                  color: `${
                    kernelMemoryBtnsActive
                      ? "var(--primary-green)"
                      : "var(--disabled-gray)"
                  }`,
                }}
              >
                Memoria
              </p>
              <div className="km-item__input-main">
                <input
                  className="km-item__input-value"
                  style={{
                    borderColor: `${
                      kernelMemoryBtnsActive
                        ? "var(--primary-green)"
                        : "var(--disabled-gray)"
                    }`,
                    color: `${
                      kernelMemoryBtnsActive
                        ? "var(--primary-green)"
                        : "var(--disabled-gray)"
                    }`,
                  }}
                  type="number"
                  value={machineState.memory_count}
                  max={machineState.memory_max_count}
                  onChange={onChangeInputMemory}
                  disabled={!kernelMemoryBtnsActive}
                />
                <div className="km-item__row-btns-main">
                  <button
                    className="row-btns-item row-btns-item-top"
                    style={{
                      borderBottomColor: `${
                        kernelMemoryBtnsActive
                          ? "var(--primary-green)"
                          : "var(--disabled-gray)"
                      }`,
                    }}
                    disabled={!kernelMemoryBtnsActive}
                    onClick={increaseMemory}
                  ></button>
                  <button
                    className="row-btns-item row-btns-item-bottom"
                    style={{
                      borderTopColor: `${
                        kernelMemoryBtnsActive
                          ? "var(--primary-green)"
                          : "var(--disabled-gray)"
                      }`,
                    }}
                    disabled={!kernelMemoryBtnsActive}
                    onClick={decreaseMemory}
                  ></button>
                </div>
              </div>
            </div>

            {/* Kernel Input */}
            <div className="mchp__km-item" style={{ marginTop: "8px" }}>
              <p
                className="mchp__km-item-title"
                style={{
                  color: `${
                    kernelMemoryBtnsActive
                      ? "var(--primary-green)"
                      : "var(--disabled-gray)"
                  }`,
                }}
              >
                Kernel
              </p>
              <div className="km-item__input-main">
                <input
                  className="km-item__input-value"
                  type="number"
                  value={machineState.kernel}
                  style={{
                    borderColor: `${
                      kernelMemoryBtnsActive
                        ? "var(--primary-green)"
                        : "var(--disabled-gray)"
                    }`,
                    color: `${
                      kernelMemoryBtnsActive
                        ? "var(--primary-green)"
                        : "var(--disabled-gray)"
                    }`,
                  }}
                  onChange={onChangeInputKernel}
                  disabled={!kernelMemoryBtnsActive}
                />

                <div className="km-item__row-btns-main">
                  <button
                    className="row-btns-item row-btns-item-top"
                    style={{
                      borderBottomColor: `${
                        kernelMemoryBtnsActive
                          ? "var(--primary-green)"
                          : "var(--disabled-gray)"
                      }`,
                    }}
                    disabled={!kernelMemoryBtnsActive}
                    onClick={increaseKernel}
                  ></button>
                  <button
                    className="row-btns-item row-btns-item-bottom"
                    style={{
                      borderTopColor: `${
                        kernelMemoryBtnsActive
                          ? "var(--primary-green)"
                          : "var(--disabled-gray)"
                      }`,
                    }}
                    disabled={!kernelMemoryBtnsActive}
                    onClick={decreaseKernel}
                  ></button>
                </div>
              </div>
            </div>
          </div>

          {/* Machine actions buttons */}
          <div className="mchp__mch-btns">
            <button
              className={`mch-btns-item ${
                initiMachineBtnActive ? "bg-pblue" : "bg-dsgray"
              }`}
              disabled={!initiMachineBtnActive}
              onClick={onInitMachine}
            >
              Iniciar maquina
            </button>
            <button
              className={`mch-btns-item ${
                resetMachineBtnActive ? "bg-rsred" : "bg-dsgray"
              }`}
              disabled={!resetMachineBtnActive}
              onClick={onResetMachine}
            >
              Resetear maquina
            </button>
          </div>
        </div>

        {/* Machine state */}
        <div className="mchp__mch-state">
          <p className="mchp__state-title">Estado de la maquina:</p>
          <p className="mchp__state-text">{machineState.state}</p>
        </div>
      </div>

      {/* Process properties and actions */}
      <div className="mchp__process">
        <div className="mchp__accumulator">
          <div className="accumulator-title">Acumulador</div>
          <div className="accumulator-value"> {machineState.accumulator} </div>
        </div>
        <div className="mchp__active-line">
          <p className="active-line-title">En ejecucion:</p>
          <p className="active-line-text">
            [ Pos ] : <span style={{ color: "#616161" }}></span>
          </p>
        </div>
        <div className="mchp__process-btns">
          <div className="process-btns__sub-main">
            <button
              className={`process-btns__sub-main-item ${
                runBtnActive ? "bg-aqblue" : "bg-dsgray"
              }`}
              disabled={!runBtnActive}
            >
              Ejecutar
            </button>
            <button
              className={`process-btns__sub-main-item ${
                playPauseBtnActive ? "bg-dkpurple" : "bg-dsgray"
              }`}
              disabled={!playPauseBtnActive}
            >
              Reanudar / Pausar
            </button>
          </div>
          <button
            className={`process-btns-item ${
              analyzeCodeBtnActive ? "bg-anzorange" : "bg-dsgray"
            }`}
            disabled={!analyzeCodeBtnActive}
            onClick={onAnalyzeCode}
          >
            Analizar codigo
          </button>
        </div>
      </div>
    </div>
  );
};
