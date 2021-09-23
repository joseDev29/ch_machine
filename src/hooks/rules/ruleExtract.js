export const ruleExtract = () => {
  const varName = line[1];

  if (!varName) {
    return setMachineState((st) => {
      st.errors.push({
        programID,
        line: pos + 1,
        text: 'Se hace una declaracion "extraiga" pero no se especifica la variable requerida',
      });

      return st;
    });
  }

  if (line.length > 2) {
    return setMachineState((st) => {
      st.errors.push({
        programID,
        line: pos + 1,
        text: `Sintaxis no reconocida ${line[2]}`,
      });

      return st;
    });
  }

  return setMachineState((st) => {
    if (!st.programs_temp[programID].variables[varName]) {
      st.errors.push({
        programID,
        line: pos + 1,
        text: `La variable ${varName} indicada en la declaracion de extraer, no existe en el programa`,
      });
    } else if (st.programs_temp[programID].variables[varName].type !== "I") {
      st.errors.push({
        programID,
        line: pos + 1,
        text: `La variable ${varName} indicada en la declaracion de extraer es de un tipo no valido para realizar la operacion extraer`,
      });
    } else {
      st.programs_temp[programID].block.push({
        line_text: `${line.join(" ")}`,
        line_type: "extract_declaration",
        var_name: varName,
      });
    }

    return st;
  });
};
