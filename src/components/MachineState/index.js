import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

import "./styles.css";

export const MachineState = () => {
  const {
    machineState: { state },
  } = useContext(AppContext);

  return (
    <div className="ms-main">
      <p className="ms-title">Estado de la maquina:</p>
      <p className="ms-content">{state}</p>
    </div>
  );
};
