export const print = (instruction, setMachineState, changeMachineState) => {
  setMachineState((st) => {
    if (instruction.var_name === "acumulador") {
      st.printer = st.accumulator;
    } else {
      st.printer =
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
