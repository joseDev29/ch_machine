export const go = (
  instruction,
  setMachineState,
  changeMachineState,
  posEvent
) => {
  setMachineState((st) => {
    const pos =
      st.programs[instruction.program_id].labels[instruction.label_name]
        .memoryPos;

    st.running_pos = pos - 1;

    posEvent.next(pos);

    return st;
  });

  return changeMachineState({});
};
