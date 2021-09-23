export const ruleLabel = (
  line,
  pos,
  programID,
  programLength,
  setMachineState
) => {
  const labelName = line[1];
  let labelValue = line[2];

  if (!labelName || !labelValue || line.length > 3) {
    return setMachineState((st) => {
      st.errors.push({
        programID,
        line: pos + 1,
        text: "Sintaxis incorrecta",
      });

      return st;
    });
  }

  labelValue = Number(labelValue);

  if (Number.isNaN(labelValue) || !Number.isInteger(labelValue)) {
    return setMachineState((st) => {
      st.errors.push({
        programID,
        line: pos + 1,
        text: `El valor indicado para la etiqueta ${labelName} no es valido`,
      });

      return st;
    });
  }

  if (labelValue > programLength) {
    return setMachineState((st) => {
      st.errors.push({
        programID,
        line: pos + 1,
        text: `La posicion de programa indicada en la etiqueta ${labelName} no existe en el programa`,
      });

      return st;
    });
  }

  return setMachineState((st) => {
    st.programs_temp[programID].labels[labelName] = {
      programPos: labelValue,
    };

    st.programs_temp[programID].block.push({
      line_text: `${line.join(" ")}`,
      line_type: "label_declaration",
      label_name: labelName,
      label_value: labelValue,
      memory_position: null,
    });

    return st;
  });
};
