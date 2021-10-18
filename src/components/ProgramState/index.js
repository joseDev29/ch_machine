import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

import "./styles.css";

export const ProgramState = () => {
  const {
    machineState: { accumulator, running_program, running_pos, memory },
  } = useContext(AppContext);

  return (
    <div className="ps-main">
      <div className="ps-acm">
        <div className="ps-acm-title">Acumulador</div>
        <div className="ps-acm-value"> {accumulator} </div>
      </div>

      <div className="ps-al">
        <p className="ps-al-title">
          En ejecucion: <span style={{ color: "#000" }}>{running_program}</span>
        </p>
        <p className="ps-al-text">
          [ {running_pos || "Pos"} ] :{" "}
          <span style={{ color: "#616161" }}>
            {(running_pos && memory[running_pos]?.line_text) || "vacio"}
          </span>
        </p>
      </div>
    </div>
  );
};
