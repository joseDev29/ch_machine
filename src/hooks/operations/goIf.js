export const goIf = (
  instruction,
  setMachineState,
  changeMachineState,
  posEvent
) => {
  setMachineState((st) => {
    const pos_1 =
      st.programs[instruction.program_id].labels[instruction.label1_name]
        .memoryPos;
    const pos_2 =
      st.programs[instruction.program_id].labels[instruction.label2_name]
        .memoryPos;

    if (st.accumulator > 0) {
      console.log(`>: ${pos_1}`);
      st.running_pos = pos_1 - 1;
      posEvent.next(pos_1);
    } else if (st.accumulator < 0) {
      st.running_pos = pos_2 - 1;
      posEvent.next(pos_2);
    } else {
      st.running_pos += 1;
      posEvent.next(false);
    }

    return st;
  });

  return changeMachineState({});
};
