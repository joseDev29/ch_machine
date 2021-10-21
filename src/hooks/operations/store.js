export const store = (instruction, setMachineState, changeMachineState) => {
  setMachineState((st) => {
    const var_position =
      st.programs[instruction.program_id].variables[instruction.var_name]
        .memory_position;

    st.memory[var_position].value = st.accumulator;

    return st;
  });

  return changeMachineState({});
};
