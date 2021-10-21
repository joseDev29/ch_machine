import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

import "./styles.css";

export const Monitor = () => {
  const { machineState } = useContext(AppContext);

  return (
    <div className="mtr">
      <h4>Monitor</h4>
      <p>{machineState.monitor}</p>
    </div>
  );
};
