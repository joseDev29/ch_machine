import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

import "./styles.css";

export const MemoryTable = () => {
  const {
    machineState: { memory, memory_count, last_memory_pos },
  } = useContext(AppContext);

  const emptyMemoryCells = () => {
    let cells = [];
    for (let i = last_memory_pos + 1; i < memory_count; i++) {
      cells.push(i);
    }
    return cells;
  };

  return (
    <div className="mt-main my-scroll">
      {memory.length > 1 && (
        <>
          <div className="mt-head">
            <div className="mt-head-pos">Pos</div>
            <div className="mt-head-text">Value</div>
          </div>
          {memory.map((memory_cell, pos) => {
            if (memory_cell === "Kernel") {
              return (
                <div className="mt-item" key={pos}>
                  <div className="mt-item-pos bg-pblue">{pos}</div>
                  <div className="mt-item-text">Kernel</div>
                </div>
              );
            } else if (pos === 0) {
              return (
                <div className="mt-item" key={pos}>
                  <div className="mt-item-pos bg-aqblue">{pos}</div>
                  <div className="mt-item-text">Acumulador</div>
                </div>
              );
            } else if (memory_cell?.line_type === "var_value") {
              return (
                <div className="mt-item" key={pos}>
                  <div className="mt-item-pos bg-spurple">{pos}</div>
                  <div className="mt-item-text">{memory_cell.value}</div>
                </div>
              );
            } else {
              return (
                <div className="mt-item" key={pos}>
                  <div className="mt-item-pos bg-spurple">{pos}</div>
                  <div className="mt-item-text">{memory_cell.line_text}</div>
                </div>
              );
            }
          })}
          {last_memory_pos < memory_count &&
            emptyMemoryCells().map((pos) => (
              <div className="mt-item" key={pos}>
                <div className="mt-item-pos bg-strose">{pos}</div>
                <div className="mt-item-text">vacio </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};
