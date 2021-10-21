import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

import "./styles.css";

export const LabelsInfo = () => {
  const {
    machineState: { all_labels },
  } = useContext(AppContext);

  return (
    <div className="lf-main my-scroll">
      <div className="lf-head">
        <div className="lf-pos">Pos</div>
        <div className="lf-name">Etiqueta</div>
        <div className="lf-pg">PgID</div>
      </div>
      {all_labels.map(({ label_name, pos, programID }) => (
        <div className="lf-item" key={pos}>
          <div className="lf-pos">{pos}</div>
          <div className="lf-name">{label_name}</div>
          <div className="lf-pg">{programID}</div>
        </div>
      ))}
    </div>
  );
};
