export const ruleGo = (line, pos, programID, setMachineState) => {
  const labelName = line[1];

  if (!labelName) {
    return setMachineState((st) => {
      st.errors.push({
        programID,
        line: pos + 1,
        text: 'Se hace una declaracion "vaya" pero no se especifica la etiqueta requerida',
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
    if (!st.programs_temp[programID].labels[labelName]) {
      st.errors.push({
        programID,
        line: pos + 1,
        text: `La etiqueta ${labelName} indicada en la declaracion vaya, no existe en el programa`,
      });
    } else {
      st.programs_temp[programID].block.push({
        line_text: `${line.join(" ")}`,
        line_type: "go_declaration",
        label_name: labelName,
      });
    }

    return st;
  });
};
