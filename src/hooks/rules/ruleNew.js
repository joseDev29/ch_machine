export const ruleNew = (line, pos, programID, setMachineState) => {
  let varName = line[1];
  let varType = line[2];
  let varValue = line[3];

  if (line.length > 4) {
    return setMachineState((prevState) => {
      prevState.errors.push({
        programID,
        line: pos + 1,
        text: `Sintaxis no valida ${line[4]}`,
      });

      return prevState;
    });
  }

  if (!varName) {
    return setMachineState((prevState) => {
      prevState.errors.push({
        programID,
        line: pos + 1,
        text: "Se declara la iniciacion de una variable pero no se especifica su nombre",
      });

      return prevState;
    });
  }

  if (
    !/[a-zA-Z]/.test(varName[0]) &&
    varName[0] !== "$" &&
    varName[0] !== "_"
  ) {
    return setMachineState((prevState) => {
      prevState.errors.push({
        programID,
        line: pos + 1,
        text: `El nombre de una variable solo puede iniciar con una letra o alguno de los siguiente caracteres: '$' o '_' ${varName}`,
      });

      return prevState;
    });
  }

  if (
    !varType &&
    varType !== "I" &&
    varType !== "C" &&
    varType !== "R" &&
    varType !== "L"
  ) {
    return setMachineState((prevState) => {
      prevState.errors.push({
        programID,
        line: pos + 1,
        text: `El tipo de la variable ${varName} no es valido`,
      });

      return prevState;
    });
  }

  //Integers
  if (varType === "I") {
    if (!varValue) {
      varValue = 0;
    }

    varValue = Number(varValue);

    if (Number.isNaN(varValue) || !Number.isInteger(varValue)) {
      return setMachineState((prevState) => {
        prevState.errors.push({
          programID,
          line: pos + 1,
          text: `El tipo de la variable ${varName} declarada como entero 'I' no es entero`,
        });

        return prevState;
      });
    }
  }
  //Strings
  else if (varType === "C") {
    if (!varValue) {
      varValue = "";
    }
    varValue = String(varValue);
  }
  //Reals
  else if (varType === "R") {
    if (!varValue) {
      varValue = 0;
    }
    varValue = Number(varValue);
    if (Number.isNaN(varValue)) {
      return setMachineState((prevState) => {
        prevState.errors.push({
          programID,
          line: pos + 1,
          text: `El tipo de la variable ${varName} declarada como real 'R' no es real`,
        });

        return prevState;
      });
    }
  }
  //Booleans
  else if (varType === "L") {
    if (!varValue) {
      varValue = 0;
    }
    varValue = Number(varValue);
    if (Number.isNaN(varValue) || (varValue !== 0 && varValue !== 1)) {
      return setMachineState((prevState) => {
        prevState.errors.push({
          programID,
          line: pos + 1,
          text: `El tipo de la variable ${varName} declarada como logico 'L' no es logico`,
        });

        return prevState;
      });
    }
  }
  //Others
  else {
    return setMachineState((prevState) => {
      prevState.errors.push({
        programID,
        line: pos + 1,
        text: `Sintaxis no reconocida`,
      });

      return prevState;
    });
  }

  return setMachineState((st) => {
    st.programs_temp[programID].length = st.programs_temp[programID].length + 1;

    st.programs_temp[programID].variables[varName] = {
      type: varType,
      value: varValue,
      declaration_order:
        Object.keys(st.programs_temp[programID].variables).length + 1,
      program_position: st.programs_temp[programID].length,
      memory_position: null,
    };

    st.programs_temp[programID].block.push({
      line_type: "var_declaration",
      var_name: varName,
      var_type: varType,
      var_value: varValue,
      program_position: st.programs_temp[programID].length,
      memory_position: null,
    });

    return st;
  });
};
