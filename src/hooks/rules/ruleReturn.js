export const ruleReturn = (
  line,
  pos,
  programID,
  setMachineState,
  programLength
) => {
  const value = line[1];

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

  if (pos + 1 !== programLength) {
    return setMachineState((st) => {
      st.errors.push({
        programID,
        line: pos + 1,
        text: 'La instruccion "retorne" debe ser la ultima en el programa',
      });

      return st;
    });
  }

  if (!value && value !== 0) {
    return setMachineState((st) => {
      st.programs_temp[programID].block.push({
        line_text: `${line.join(" ")}`,
        line_type: "return_declaration",
        var_name: null,
        value: null,
        program_id: programID,
      });

      return st;
    });
  }

  if (Number.isInteger(Number(value))) {
    return setMachineState((st) => {
      st.programs_temp[programID].block.push({
        line_text: `${line.join(" ")}`,
        line_type: "return_declaration",
        var_name: null,
        value: value,
        program_id: programID,
      });

      return st;
    });
  } else {
    return setMachineState((st) => {
      if (
        st.programs_temp[programID].variables[value] &&
        st.programs_temp[programID].variables[value].type === "I"
      ) {
        st.programs_temp[programID].block.push({
          line_text: `${line.join(" ")}`,
          line_type: "return_declaration",
          var_name: value,
          value: null,
          program_id: programID,
        });
      } else {
        st.errors.push({
          programID,
          line: pos + 1,
          text: `El valor o variable ingresado para retornar no es valido`,
        });
      }

      return st;
    });
  }
};
