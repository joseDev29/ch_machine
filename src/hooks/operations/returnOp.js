export const returnOp = (instruction, setMachineState, changeMachineState) => {
  setMachineState((st) => {
    st.monitor = `Retorno ${instruction.value}`;

    return st;
  });

  return changeMachineState({});
};
