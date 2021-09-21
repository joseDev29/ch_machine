import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { ruleLabel } from "./rules/ruleLabel";
import { ruleLoad } from "./rules/ruleLoad";
import { ruleNew } from "./rules/ruleNew";

export const useVerifyCode = () => {
  const { changeMachineState, setMachineState, getGeneralState } =
    useContext(AppContext);

  //Ordena el codigo en una matriz de lineas x palabras
  const orderCode = (rawCode) => {
    let code = rawCode.trim().split("\n");

    code = code.map((line) => {
      return line
        .trim()
        .split(" ")
        .filter((word) => word !== "" && word !== " ");
    });

    code = code.filter((line) => line.length > 0);

    changeMachineState({ code });

    analyzeCode(code);
  };

  const analyzeCode = (code) => {
    try {
      const programID = Math.floor(Math.random() * (9999 - 999)) + 999;
      console.log("Program ID: ", programID);
      const programLength = code.length;
      const programName = getGeneralState().filename;

      setMachineState((st) => {
        st.programs_temp[programID] = {
          name: programName + ".ch",
          block: [],
          variables: {},
          labels: {},
          length: code.length,
        };

        return st;
      });

      code.forEach((line, pos) => {
        //new
        if (line[0] === "nueva") {
          ruleNew(line, pos, programID, setMachineState);
        }
        //label
        else if (line[0] === "etiqueta") {
          ruleLabel(line, pos, programID, programLength, setMachineState);
        }
        //load
        else if (line[0] === "cargue") {
          ruleLoad(line, pos, programID, setMachineState);
        }
        //others
        else {
          /*setMachineState((st) => {
              st.errors.push({
                programID,
                line: pos,
                text: "Sintaxis no reconocia",
              });
            });*/
        }
      });
    } catch (error) {
      alert(
        "Error al verificar el codgio, verifique su codigo y ejecute nuevamente el analisis"
      );
    }
  };

  return {
    orderCode,
  };
};
