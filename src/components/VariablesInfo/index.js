import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

import "./styles.css";

export const VariablesInfo = () => {
  const {
    machineState: { all_variables },
  } = useContext(AppContext);

  return (
    <div className="vf-main my-scroll">
      <div className="vf-head">
        <div className="vf-pos">Pos</div>
        <div className="vf-name">Variable</div>
        <div className="vf-pg">PgID</div>
      </div>
      {all_variables.map(({ pos, programID, var_name }) => (
        <div className="vf-item" key={pos}>
          <div className="vf-pos">{pos}</div>
          <div className="vf-name">{var_name}</div>
          <div className="vf-pg">{programID}</div>
        </div>
      ))}
    </div>
  );
};
