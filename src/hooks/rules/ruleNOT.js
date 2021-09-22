export const ruleNOT = (line, pos, programID, setMachineState) => {
  const var1Name = line[1];
  const var2Name = line[2];

  if (!var1Name || !var2Name) {
    return setMachineState((st) => {
      st.errors.push({
        programID,
        line: pos + 1,
        text: 'Se hace una declaracion "NO" pero no se especifican las 2 variable requeridas',
      });
    });
  }

  if (line.length > 3) {
    return setMachineState((st) => {
      st.errors.push({
        programID,
        line: pos + 1,
        text: `Sintaxis no reconocida ${line[3]}`,
      });
    });
  }

  return setMachineState((st) => {
    if (
      !st.programs_temp[programID].variables[var1Name] ||
      !st.programs_temp[programID].variables[var2Name]
    ) {
      st.errors.push({
        programID,
        line: pos + 1,
        text: `Una de las variables especificadas en la sentencia NO, no existe en el programa`,
      });
    } else if (
      st.programs_temp[programID].variables[var1Name].type !== "L" ||
      st.programs_temp[programID].variables[var2Name].type !== "L"
    ) {
      st.errors.push({
        programID,
        line: pos + 1,
        text: `Una de las variables especificadas en la sentencia NO, no tien un tipo no valido para la operacion NO`,
      });
    } else {
      st.programs_temp[programID].block.push({
        line_type: "not_declaration",
        var1_name: var1Name,
        var2_name: var2Name,
      });
    }

    return st;
  });
};
