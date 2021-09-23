export const ruleGoIf = (line, pos, programID, setMachineState) => {
  const label1Name = line[1];
  const label2Name = line[2];

  if (!label1Name || !label2Name) {
    return setMachineState((st) => {
      st.errors.push({
        programID,
        line: pos + 1,
        text: 'Se hace una declaracion "vayasi" pero no se especifican las 2 etiquetas requeridas',
      });

      return st;
    });
  }

  if (line.length > 3) {
    return setMachineState((st) => {
      st.errors.push({
        programID,
        line: pos + 1,
        text: `Sintaxis no reconocida ${line[3]}`,
      });

      return st;
    });
  }

  return setMachineState((st) => {
    if (
      !st.programs_temp[programID].labels[label1Name] ||
      !st.programs_temp[programID].labels[label2Name]
    ) {
      st.errors.push({
        programID,
        line: pos + 1,
        text: `Una de las etiquetas ${label1Name} o ${label2Name} indicadas en la declaracion "vayasi", no existe en el programa`,
      });
    } else {
      st.programs_temp[programID].block.push({
        line_text: `${line.join(" ")}`,
        line_type: "goif_declaration",
        label1_name: label1Name,
        label2_name: label2Name,
      });
    }

    return st;
  });
};
