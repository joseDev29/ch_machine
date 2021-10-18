import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

import "./styles.css";

export const MachinePropertiesInput = () => {
  const {
    machineState,
    changeMachineState,
    buttonsState: { kernelMemoryBtnsActive },
  } = useContext(AppContext);

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

  const colorCondition = kernelMemoryBtnsActive
    ? "var(--primary-green)"
    : "var(--disabled-gray)";

  return (
    <div className="mpi-main">
      {/*Memory input*/}
      <div className="mpi-item">
        <p
          className="mpi-item-title"
          style={{
            color: colorCondition,
          }}
        >
          Memoria
        </p>

        <div className="mpi-item-input">
          <input
            className="mpi-item-input-value"
            style={{
              borderColor: colorCondition,
              color: colorCondition,
            }}
            type="number"
            value={machineState.memory_count}
            max={machineState.memory_max_count}
            onChange={onChangeInputMemory}
            disabled={!kernelMemoryBtnsActive}
          />

          <div className="mpi-item-btns">
            <button
              className="mpi-item-btn row-btn-top"
              style={{
                borderBottomColor: colorCondition,
              }}
              disabled={!kernelMemoryBtnsActive}
              onClick={increaseMemory}
            ></button>
            <button
              className="mpi-item-btn row-btn-bottom"
              style={{
                borderTopColor: colorCondition,
              }}
              disabled={!kernelMemoryBtnsActive}
              onClick={decreaseMemory}
            ></button>
          </div>
        </div>
      </div>

      {/*Kernel input*/}
      <div className="mpi-item">
        <p
          className="mpi-item-title"
          style={{
            color: colorCondition,
          }}
        >
          Kernel
        </p>

        <div className="mpi-item-input">
          <input
            className="mpi-item-input-value"
            style={{
              borderColor: colorCondition,
              color: colorCondition,
            }}
            type="number"
            value={machineState.kernel}
            onChange={onChangeInputKernel}
            disabled={!kernelMemoryBtnsActive}
          />

          <div className="mpi-item-btns">
            <button
              className="mpi-item-btn row-btn-top"
              style={{
                borderBottomColor: colorCondition,
              }}
              disabled={!kernelMemoryBtnsActive}
              onClick={increaseKernel}
            ></button>
            <button
              className="mpi-item-btn row-btn-bottom"
              style={{
                borderTopColor: colorCondition,
              }}
              disabled={!kernelMemoryBtnsActive}
              onClick={decreaseKernel}
            ></button>
          </div>
        </div>
      </div>
    </div>
  );
};
