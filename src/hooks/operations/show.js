export const show = (instruction, setMachineState, changeMachineState) => {
  setMachineState((st) => {
    if (instruction.var_name === "acumulador") {
      st.monitor = st.accumulator;
    } else {
      st.monitor =
        st.memory[
          st.programs[instruction.program_id].variables[
            instruction.var_name
          ].memory_position
        ].value;
    }

    return st;
  });

  return changeMachineState({});
};
