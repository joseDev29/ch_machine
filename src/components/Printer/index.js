import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

import "./styles.css";

export const Printer = () => {
  const { machineState } = useContext(AppContext);

  return (
    <div className="prt">
      <h4>Impresora</h4>
      <p>{machineState.printer}</p>
    </div>
  );
};
