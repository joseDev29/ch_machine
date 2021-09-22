export const ruleShow = (line, pos, programID, setMachineState) => {
  const varName = line[1];

  if (!varName) {
    return setMachineState((st) => {
      st.errors.push({
        programID,
        line: pos + 1,
        text: 'Se hace una declaracion "muestre" pero no se especifica la variable requerida',
      });
    });
  }

  if (line.length > 2) {
    return setMachineState((st) => {
      st.errors.push({
        programID,
        line: pos + 1,
        text: `Sintaxis no reconocida ${line[2]}`,
      });
    });
  }

  return setMachineState((st) => {
    if (
      !st.programs_temp[programID].variables[varName] &&
      varName !== "acumulador"
    ) {
      st.errors.push({
        programID,
        line: pos + 1,
        text: `La variable ${varName} indicada en la declaracion de mostrar, no existe en el programa`,
      });
    } else {
      st.programs_temp[programID].block.push({
        line_type: "show_declaration",
        var_name: varName,
      });
    }

    return st;
  });
};