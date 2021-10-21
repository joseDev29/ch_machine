export const deleteOp = (instruction, setMachineState, changeMachineState) => {
  setMachineState((st) => {
    const value =
      st.memory[
        st.programs[instruction.program_id].variables[instruction.var_name]
          .memory_position
      ].value;

    st.accumulator = `${st.accumulator}`.replace(`${value}`, "");

    return st;
  });

  return changeMachineState({});
};
