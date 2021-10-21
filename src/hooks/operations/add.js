export const add = (instruction, setMachineState, changeMachineState) => {
  setMachineState((st) => {
    st.accumulator +=
      st.memory[
        st.programs[instruction.program_id].variables[
          instruction.var_name
        ].memory_position
      ].value;

    return st;
  });

  return changeMachineState({});
};
