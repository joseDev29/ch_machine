import { useContext, useRef } from "react";
import { Subject } from "rxjs";

import { AppContext } from "../context/AppContext";

export const useFile = () => {
  const { generalState, changeGeneralState, changeMachineState } =
    useContext(AppContext);

  const inputFile = useRef(null);

  const readFileEvent = useRef(new Subject());

  //Se acciona al clickear el boton de cargar codigo
  const onLoadCode = () => {
    inputFile.current.click();
  };

  //Se acciona al detectar un cambio en input file
  const onChangeInputFile = (event) => {
    try {
      const filePath = event.target.value;

      const file = event.target.files[0];

      if (!file || !filePath) {
        changeGeneralState({
          filename: "Ningun archivo seleccionado",
          rawCode: "",
        });

        changeMachineState({
          programs_temp: {},
          code: null,
          errors: [],
        });
        return;
      }

      verifyFile(filePath);
      readCodeFromFile(file);
    } catch (error) {
      changeGeneralState({
        filename: "Ningun archivo seleccionado",
        rawCode: "",
      });
      changeMachineState({
        programs_temp: {},
        code: null,
        errors: [],
      });
      alert(`Error al leer el archivo: ${error.message}`);
    }
  };

  //Verifica la extension del archivo
  const verifyFile = (filePath) => {
    if (!filePath) {
      changeGeneralState({
        filename: "Ningun archivo seleccionado",
        rawCode: "",
      });

      changeMachineState({
        programs_temp: {},
        code: null,
        errors: [],
      });

      return;
    }

    const fileExtension = filePath.substr(filePath.length - 3, 3);

    if (fileExtension !== ".ch") {
      changeGeneralState({
        filename: "Ningun archivo seleccionado",
        rawCode: "",
      });

      changeMachineState({
        programs_temp: {},
        code: null,
        errors: [],
      });

      throw new Error("Extension no compatible");
    }

    let filename = filePath.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];

    filename = filename.slice(0, filename.length - 3);

    localStorage.setItem("filename", filename);

    return changeGeneralState({ filename });
  };

  //Lee el codigo del archivo y ejecuta la funcion para ordenarlos
  const readCodeFromFile = (file) => {
    let reader = new FileReader();

    reader.readAsText(file);

    reader.onloadend = (ev) => {
      const rawCode = ev.target.result;

      readFileEvent.current.next(rawCode);
    };

    reader.onerror = () => {
      changeGeneralState({
        filename: "Ningun archivo seleccionado",
        rawCode: "",
      });

      changeMachineState({
        programs_temp: {},
        code: null,
        errors: [],
      });

      throw new Error("Error de lectura, archivo no valido");
    };
  };

  //Genera la descarga de un archivo de texto plano .ch
  //con el codigo del area de texto
  const downloadCode = () => {
    let element = document.createElement("a");

    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," +
        encodeURIComponent(generalState.rawCode)
    );

    element.setAttribute("download", generalState.filename + ".ch");

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  };

  return {
    inputFile,
    onLoadCode,
    onChangeInputFile,
    readFileEvent,
    downloadCode,
  };
};
