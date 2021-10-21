export const NOT = (instruction, setMachineState, changeMachineState) => {
  setMachineState((st) => {
    const var_1 =
      st.memory[
        st.programs[instruction.program_id].variables[instruction.var1_name]
          .memory_position
      ].value;

    const result = !var_1 ? 1 : 0;

    st.memory[
      st.programs[instruction.program_id].variables[
        instruction.var2_name
      ].memory_position
    ].value = result;

    return st;
  });

  return changeMachineState({});
};
