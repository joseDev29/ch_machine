import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

import "./styles.css";

export const ProgramsInfo = () => {
  const {
    machineState: { programs },
  } = useContext(AppContext);

  return (
    <div className="pf-main my-scroll">
      <div className="pf-head">
        <div className="pf-id">ID</div>
        <div className="pf-pg">Programa</div>
        <div className="pf-lg">Long</div>
        <div className="pf-pos">InP</div>
        <div className="pf-pos">FnP</div>
      </div>
      {Object.keys(programs)
        .reverse()
        .map((programID, index) => {
          const { name, length, init_pos, last_pos } = programs[programID];

          return (
            <div className="pf-item" key={programID}>
              <div className="pf-id">{programID}</div>
              <div className="pf-pg">{name}</div>
              <div className="pf-lg">{length}</div>
              <div className="pf-pos">{init_pos}</div>
              <div className="pf-pos">{last_pos}</div>
            </div>
          );
        })}
    </div>
  );
};
