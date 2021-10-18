export const ruleLoad = (line, pos, programID, setMachineState) => {
  const varName = line[1];

  if (!varName) {
    return setMachineState((st) => {
      st.errors.push({
        programID,
        line: pos + 1,
        text: 'Se hace una declaracion "cargue" pero no se especifica el valor a cargar',
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
        text: `La variable ${varName} indicada en la declaracion de carga, no existe en el programa`,
      });
    } else {
      st.programs_temp[programID].block.push({
        line_text: `${line.join(" ")}`,
        line_type: "load_declaration",
        var_name: varName,
        program_id: programID,
      });
    }

    return st;
  });
};
