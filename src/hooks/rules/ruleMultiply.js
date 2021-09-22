export const ruleMultiply = (line, pos, programID, setMachineState) => {
  const varName = line[1];

  if (!varName) {
    return setMachineState((st) => {
      st.errors.push({
        programID,
        line: pos + 1,
        text: 'Se hace una declaracion "multiplique" pero no se especifica la variable requerida',
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
    if (!st.programs_temp[programID].variables[varName]) {
      st.errors.push({
        programID,
        line: pos + 1,
        text: `La variable ${varName} indicada en la declaracion de multiplicar, no existe en el programa`,
      });
    } else if (
      st.programs_temp[programID].variables[varName].type !== "I" &&
      st.programs_temp[programID].variables[varName].type !== "R"
    ) {
      st.errors.push({
        programID,
        line: pos + 1,
        text: `La variable ${varName} indicada en la declaracion de multiplicar es de un tipo no valido para realizar la operacion multiplicar`,
      });
    } else {
      st.programs_temp[programID].block.push({
        line_type: "multiply_declaration",
        var_name: varName,
      });
    }

    return st;
  });
};