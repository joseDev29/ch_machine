import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useProgramsExecution } from "../../hooks/useProgramsExecution";
import "./styles.css";

export const ReadOperationZone = () => {
  const { readInputEvent, setMachineState, changeMachineState, machineState } =
    useContext(AppContext);

  const { runProgram } = useProgramsExecution();

  const inputRef = useRef();

  const [state, setState] = useState({
    var_name: null,
    program_id: null,
    active: false,
  });

  const onReadValue = () => {
    setMachineState((st) => {
      const var_type =
        st.programs[state.program_id].variables[state.var_name].type;

      let var_value = inputRef.current.value;

      if (var_type === "I" || var_type === "R" || var_type === "L") {
        var_value = Number(var_value);
      }

      st.memory[
        st.programs[state.program_id].variables[state.var_name].memory_position
      ].value = var_value;

      return st;
    });

    setState((st) => {
      st.var_name = null;
      st.program_id = null;
      st.active = false;

      return st;
    });

    setTimeout(() => {
      inputRef.current.value = "";
    }, 5);

    changeMachineState({});

    runProgram(machineState.running_pos + 1);
  };

  useEffect(() => {
    readInputEvent.current.subscribe((ev) => {
      setState((st) => {
        st.var_name = ev.var_name;
        st.program_id = ev.program_id;
        st.active = ev.active;
        return st;
      });
    });
  });

  return (
    <div className="ipz">
      <input
        style={{
          borderColor: state.active
            ? "var(--next-yellow)"
            : "var(--disabled-gray)",
        }}
        type="text"
        placeholder="Ingrese el valor a leer"
        disabled={!state.active}
        ref={inputRef}
      />
      <button
        style={{
          backgroundColor: state.active
            ? "var(--next-yellow)"
            : "var(--disabled-gray)",
        }}
        disabled={!state.active}
        onClick={onReadValue}
      >
        Ingresar
      </button>
    </div>
  );
};
