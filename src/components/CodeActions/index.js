import { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { useFile } from "../../hooks/useFile";
import { useVerifyCode } from "../../hooks/useVerifyCode";

import "./styles.css";

export const CodeActions = () => {
  const {
    generalState,
    changeGeneralState,
    buttonsState: {
      analyzeCodeBtnActive,
      loadCodeBtnActive,
      downloadCodeBtnActive,
    },
  } = useContext(AppContext);

  const {
    inputFile,
    onLoadCode,
    onChangeInputFile,
    readFileEvent,
    downloadCode,
  } = useFile();

  const { orderCode } = useVerifyCode();

  const onAnalyzeCode = () => {
    orderCode(generalState.rawCode, generalState.filename);
  };

  useEffect(() => {
    readFileEvent.current.subscribe((rawCode) => {
      changeGeneralState({ rawCode });
      orderCode(rawCode, generalState.filename);
    });
  }, [readFileEvent]);

  return (
    <div className="ca-main">
      <button
        className={`ca-btn ${
          analyzeCodeBtnActive ? "bg-anzorange" : "bg-dsgray"
        }`}
        disabled={!analyzeCodeBtnActive}
        onClick={onAnalyzeCode}
      >
        Analizar y cargar en memoria
      </button>

      <input
        ref={inputFile}
        id="inputFile"
        type="file"
        className="ca-input-file-hidden"
        onChange={onChangeInputFile}
      />

      <button
        className={`ca-btn ${loadCodeBtnActive ? "bg-pgreen" : "bg-dsgray"}`}
        disabled={!loadCodeBtnActive}
        onClick={onLoadCode}
      >
        Cargar archivo
      </button>

      <button
        className={`ca-btn ${
          downloadCodeBtnActive ? "bg-spurple" : "bg-dsgray"
        }`}
        disabled={!downloadCodeBtnActive}
        onClick={downloadCode}
      >
        Descargar codigo
      </button>
    </div>
  );
};
