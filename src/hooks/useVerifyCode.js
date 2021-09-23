import { useContext } from "react";
import { AppContext } from "../context/AppContext";

//Rules
import { ruleAdd } from "./rules/ruleAdd";
import { ruleDivision } from "./rules/ruleDivision";
import { ruleLabel } from "./rules/ruleLabel";
import { ruleLoad } from "./rules/ruleLoad";
import { ruleMultiply } from "./rules/ruleMultiply";
import { ruleNew } from "./rules/ruleNew";
import { ruleRead } from "./rules/ruleRead";
import { ruleStore } from "./rules/ruleStore";
import { ruleSubtract } from "./rules/ruleSubtract";
import { ruleExponentiation } from "./rules/ruleExponentiation";
import { ruleModule } from "./rules/ruleModule";
import { ruleConcatenate } from "./rules/ruleConcatenate";
import { ruleAND } from "./rules/ruleAND";
import { ruleOR } from "./rules/ruleOR";
import { ruleNOT } from "./rules/ruleNOT";
import { ruleShow } from "./rules/ruleShow";
import { rulePrint } from "./rules/rulePrint";
import { ruleGo } from "./rules/ruleGo";
import { ruleGoIf } from "./rules/ruleGoIf";
import { ruleReturn } from "./rules/ruleReturn";

export const useVerifyCode = () => {
  const { changeMachineState, setMachineState } = useContext(AppContext);

  //Ordena el codigo en una matriz de lineas x palabras
  const orderCode = (rawCode, filename) => {
    changeMachineState({
      code: null,
      errors: [],
      programs_temp: {},
    });

    let code = rawCode.trim().split("\n");

    code = code.map((line) => {
      return line
        .trim()
        .split(" ")
        .filter((word) => word !== "" && word !== " ");
    });

    code = code.filter((line) => line.length > 0);

    if (code.length === 0) return;

    changeMachineState({ code });

    analyzeCode(code, filename);
  };

  const analyzeCode = (code, filename) => {
    try {
      const programID = Math.floor(Math.random() * (9999 - 999)) + 999;
      console.log("Program ID: ", programID);
      const programLength = code.length;
      const programName = localStorage.getItem("filename");

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

      //Verificacion de variables y etiquetas
      code.forEach((line, pos) => {
        //new
        if (line[0] === "nueva") {
          ruleNew(line, pos, programID, setMachineState);
        }
        //label
        else if (line[0] === "etiqueta") {
          ruleLabel(line, pos, programID, programLength, setMachineState);
        }
      });

      //Verificacion del resto de lineas de codigo
      code.forEach((line, pos) => {
        //new
        if (line[0] === "nueva") {
          return;
        }
        //label
        else if (line[0] === "etiqueta") {
          return;
        }
        //load
        else if (line[0] === "cargue") {
          ruleLoad(line, pos, programID, setMachineState);
        }
        //store
        else if (line[0] === "almacene") {
          ruleStore(line, pos, programID, setMachineState);
        }
        //read
        else if (line[0] === "lea") {
          ruleRead(line, pos, programID, setMachineState);
        }
        //add
        else if (line[0] === "sume") {
          ruleAdd(line, pos, programID, setMachineState);
        }
        //subtract
        else if (line[0] === "reste") {
          ruleSubtract(line, pos, programID, setMachineState);
        }
        //multiply
        else if (line[0] === "multiplique") {
          ruleMultiply(line, pos, programID, setMachineState);
        }
        //division
        else if (line[0] === "divida") {
          ruleDivision(line, pos, programID, setMachineState);
        }
        //exponentiation
        else if (line[0] === "potencia") {
          ruleExponentiation(line, pos, programID, setMachineState);
        }
        //module
        else if (line[0] === "modulo") {
          ruleModule(line, pos, programID, setMachineState);
        }
        //concatenate
        else if (line[0] === "concatene") {
          ruleConcatenate(line, pos, programID, setMachineState);
        }
        //delete
        else if (line[0] === "elimine") {
          ruleConcatenate(line, pos, programID, setMachineState);
        }
        //extract
        else if (line[0] === "extraiga") {
          ruleConcatenate(line, pos, programID, setMachineState);
        }
        //AND
        else if (line[0] === "Y") {
          ruleAND(line, pos, programID, setMachineState);
        }
        //OR
        else if (line[0] === "O") {
          ruleOR(line, pos, programID, setMachineState);
        }
        //NOT
        else if (line[0] === "NO") {
          ruleNOT(line, pos, programID, setMachineState);
        }
        //show
        else if (line[0] === "muestre") {
          ruleShow(line, pos, programID, setMachineState);
        }
        //print
        else if (line[0] === "imprima") {
          rulePrint(line, pos, programID, setMachineState);
        }
        //go
        else if (line[0] === "vaya") {
          ruleGo(line, pos, programID, setMachineState);
        }
        //go if
        else if (line[0] === "vayasi") {
          ruleGoIf(line, pos, programID, setMachineState);
        }
        //return
        else if (line[0] === "retorne") {
          ruleReturn(line, pos, programID, setMachineState, programLength);
        }
        //others
        else {
          setMachineState((st) => {
            st.errors.push({
              programID,
              line: pos + 1,
              text: `La line iniciada con "${line[0]}" no fue reconocida como sintaxis valida del sistema`,
            });

            return st;
          });
        }
      });

      setMachineState((st) => {
        if (st.errors.length === 0) {
          st.memory = [...st.memory, ...st.programs_temp[programID].block];
          alert(
            "El programa fue analizado y cargado a la memoria exitosamente"
          );
        } else {
          alert(
            "Hay errores en su codigo, verifique y realice nuevamente un analisis de codigo"
          );
        }

        return st;
      });

      changeMachineState({});
    } catch (error) {
      alert(
        "Error al verificar el codgio, verifique su codigo y ejecute nuevamente el analisis" +
          error
      );
    }
  };

  return {
    orderCode,
  };
};
