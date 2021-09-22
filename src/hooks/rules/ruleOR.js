export const ruleOR = (line, pos, programID, setMachineState) => {
  const var1Name = line[1];
  const var2Name = line[2];
  const var3Name = line[3];

  if (!var1Name || !var2Name || !var3Name) {
    return setMachineState((st) => {
      st.errors.push({
        programID,
        line: pos + 1,
        text: 'Se hace una declaracion "O" pero no se especifican las 3 variable requeridas',
      });
    });
  }

  if (line.length > 4) {
    return setMachineState((st) => {
      st.errors.push({
        programID,
        line: pos + 1,
        text: `Sintaxis no reconocida ${line[4]}`,
      });
    });
  }

  return setMachineState((st) => {
    if (
      !st.programs_temp[programID].variables[var1Name] ||
      !st.programs_temp[programID].variables[var2Name] ||
      !st.programs_temp[programID].variables[var3Name]
    ) {
      st.errors.push({
        programID,
        line: pos + 1,
        text: `Una de las variables especificadas en la sentencia O, no existe en el programa`,
      });
    } else if (
      st.programs_temp[programID].variables[var1Name].type !== "L" ||
      st.programs_temp[programID].variables[var2Name].type !== "L" ||
      st.programs_temp[programID].variables[var3Name].type !== "L"
    ) {
      st.errors.push({
        programID,
        line: pos + 1,
        text: `Una de las variables especificadas en la sentencia O, no tien un tipo no valido para la operacion O`,
      });
    } else {
      st.programs_temp[programID].block.push({
        line_type: "or_declaration",
        var1_name: var1Name,
        var2_name: var2Name,
        var3_name: var3Name,
      });
    }

    return st;
  });
};
