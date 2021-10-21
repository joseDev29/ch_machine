export const read = (
  instruction,
  setMachineState,
  changeMachineState,
  readInputEvent
) => {
  const var_name = instruction.var_name;
  const program_id = instruction.program_id;

  readInputEvent.current.next({
    var_name,
    program_id,
    active: true,
  });

  setMachineState((st) => {
    st.running_pos += 1;

    return st;
  });

  return changeMachineState({});
};
