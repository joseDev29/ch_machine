import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

import "./styles.css";

export const ErrorsArea = () => {
  const {
    machineState: { errors, programs_temp },
  } = useContext(AppContext);

  return (
    <div className="errors-area__main my-scroll">
      <div className="errors-area__head">
        <div className="errors-area__head-prog">Programa</div>
        <div className="errors-area__head-pos">Linea</div>
        <div className="errors-area__head-text">Error</div>
      </div>
      {errors.map((error) => {
        return (
          <div className="errors-area__item" key={error.line}>
            <div className="errors-area__item-prog">
              {programs_temp[error.programID].name}
            </div>
            <div className="errors-area__item-pos">{error.line}</div>
            <div className="errors-area__item-text">{error.text}</div>
          </div>
        );
      })}
    </div>
  );
};
