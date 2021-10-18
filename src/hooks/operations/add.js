export const add = (instruction, setMachineState, changeMachineState) => {
  setMachineState((st) => {
    st.accumulator +=
      st.programs[instruction.program_id].variables[instruction.var_name].value;
    return st;
  });

  return changeMachineState({});
};
