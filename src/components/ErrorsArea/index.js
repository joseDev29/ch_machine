import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

import "./styles.css";

export const ErrorsArea = () => {
  const { machineState } = useContext(AppContext);

  return (
    <div className="errors-area__main my-scroll">
      {machineState.errors.length > 0 && (
        <div className="errors-area__head">
          <div className="errors-area__head-prog">Programa</div>
          <div className="errors-area__head-pos">Linea</div>
          <div className="errors-area__head-text">Error</div>
        </div>
      )}
      {machineState.errors.map((error) => {
        return (
          <div className="errors-area__item">
            <div className="errors-area__item-prog">
              {machineState.programs_temp[error.programID].name}
            </div>
            <div className="errors-area__item-pos">{error.line}</div>
            <div className="errors-area__item-text">{error.text}</div>
          </div>
        );
      })}
    </div>
  );
};
