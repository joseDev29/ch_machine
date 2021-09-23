import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

import "./styles.css";

export const MemoryTable = () => {
  const { machineState } = useContext(AppContext);

  return (
    <div className="memtab-main my-scroll">
      {machineState.memory.length > 1 && (
        <>
          <div className="memtab-head">
            <div className="memtab-head__pos">Pos</div>
            <div className="memtab-head__text">Value</div>
          </div>
          {machineState.memory.map((memory_cell, pos) => {
            if (memory_cell === "Kernel") {
              return (
                <div className="memtab-item" key={pos}>
                  <div className="memtab-item__pos bg-strose">{pos}</div>
                  <div className="memtab-item__text">Kernel</div>
                </div>
              );
            } else if (pos === 0) {
              return (
                <div className="memtab-item">
                  <div className="memtab-item__pos bg-anzorange">{pos}</div>
                  <div className="memtab-item__text">Acumulador</div>
                </div>
              );
            } else {
              return (
                <div className="memtab-item">
                  <div className="memtab-item__pos bg-pblue">{pos}</div>
                  <div className="memtab-item__text">
                    {memory_cell.line_text}
                  </div>
                </div>
              );
            }
          })}
        </>
      )}
    </div>
  );
};
