export const division = (instruction, setMachineState, changeMachineState) => {
  setMachineState((st) => {
    const var_value =
      st.memory[
        st.programs[instruction.program_id].variables[instruction.var_name]
          .memory_position
      ].value;

    st.accumulator = st.accumulator / var_value;

    return st;
  });

  return changeMachineState({});
};
