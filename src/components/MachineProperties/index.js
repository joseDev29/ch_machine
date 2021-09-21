import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import "./styles.css";

export const MachineProperties = () => {
  const { machineState, changeMachineState } = useContext(AppContext);

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
    if (ev.target.value < 0) return;

    changeMachineState({ kernel: Number(ev.target.value) });
  };

  const onChangeInputMemory = (ev) => {
    if (ev.target.value < 0) return;

    changeMachineState({ memory_count: Number(ev.target.value) });
  };

  return (
    <div className="mchp__main">
      <div className="mchp__mhc-data">
        {/* Machine properties inputs */}
        <div className="mchp__kernel-mem">
          {/* Kernel Input */}
          <div className="mchp__km-item">
            <p className="mchp__km-item-title">Kernel</p>
            <div className="km-item__input-main">
              <input
                className="km-item__input-value"
                type="number"
                value={machineState.kernel}
                onChange={onChangeInputKernel}
              />

              <div className="km-item__row-btns-main">
                <button
                  className="row-btns-item row-btns-item-top"
                  onClick={increaseKernel}
                ></button>
                <button
                  className="row-btns-item row-btns-item-bottom"
                  onClick={decreaseKernel}
                ></button>
              </div>
            </div>
          </div>

          {/* Memory Input */}
          <div className="mchp__km-item" style={{ marginTop: "8px" }}>
            <p className="mchp__km-item-title">Memoria</p>
            <div className="km-item__input-main">
              <input
                className="km-item__input-value"
                type="number"
                value={machineState.memory_count}
                onChange={onChangeInputMemory}
              />
              <div className="km-item__row-btns-main">
                <button
                  className="row-btns-item row-btns-item-top"
                  onClick={increaseMemory}
                ></button>
                <button
                  className="row-btns-item row-btns-item-bottom"
                  onClick={decreaseMemory}
                ></button>
              </div>
            </div>
          </div>
        </div>

        {/* Machine actions buttons */}
        <div className="mchp__mch-btns">
          <button className="mch-btns-item bg-pblue">Iniciar maquina</button>
          <button className="mch-btns-item bg-rsred">Resetear maquina</button>
        </div>
      </div>

      {/* Process properties and actions */}
      <div className="mchp__process">
        <div className="mchp__accumulator">
          <div className="accumulator-title">Acumulador</div>
          <div className="accumulator-value">12</div>
        </div>
        <div className="mchp__active-line">
          <p className="active-line-title">En ejecucion:</p>
          <p className="active-line-text">
            [ Pos 21 ] :{" "}
            <span style={{ color: "#616161" }}>nueva res I 23</span>
          </p>
        </div>
        <div className="mchp__process-btns">
          <div className="process-btns__sub-main">
            <button className="process-btns__sub-main-item bg-aqblue">
              Ejecutar
            </button>
            <button className="process-btns__sub-main-item bg-dkpurple">
              Reanudar / Pausar
            </button>
          </div>
          <button className="process-btns-item bg-anzorange">
            Analizar codigo
          </button>
        </div>
      </div>
    </div>
  );
};
