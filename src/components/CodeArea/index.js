import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useFile } from "../../hooks/useFile";
import { useVerifyCode } from "../../hooks/useVerifyCode";
import "./styles.css";

export const CodeArea = () => {
  const {
    generalState,
    changeGeneralState,
    buttonsState: { loadCodeBtnActive, downloadCodeBtnActive, codeSheetActive },
  } = useContext(AppContext);

  const {
    inputFile,
    onLoadCode,
    onChangeInputFile,
    readFileEvent,
    downloadCode,
  } = useFile();

  const { orderCode } = useVerifyCode();

  useEffect(() => {
    readFileEvent.current.subscribe((rawCode) => {
      changeGeneralState({ rawCode });
      orderCode(rawCode, generalState.filename);
    });
  }, [readFileEvent]);

  const onChangeInputFilename = (ev) => {
    changeGeneralState({ filename: ev.target.value });
    localStorage.setItem("filename", ev.target.value);
  };

  const onChangeTextArea = (ev) => {
    changeGeneralState({ rawCode: ev.target.value });
  };

  return (
    <div className="code-area__main">
      <input
        ref={inputFile}
        id="inputFile"
        type="file"
        className="code-area__input-file-hidden"
        onChange={onChangeInputFile}
      />

      <button
        className={`code-area__btn ${
          loadCodeBtnActive ? "bg-pgreen" : "bg-dsgray"
        }`}
        disabled={!loadCodeBtnActive}
        onClick={onLoadCode}
      >
        Cargar codigo
      </button>

      <div className="code-area__file-path">
        <input
          className="code-area__file-path-input"
          type="text"
          spellCheck="false"
          value={generalState.filename}
          disabled={!codeSheetActive}
          onChange={onChangeInputFilename}
        />
        <div className="code-area__file-path-ext">
          <p>.ch</p>
        </div>
      </div>

      <textarea
        className="code-area__sheet my-scroll"
        name=""
        id=""
        spellCheck="false"
        value={generalState.rawCode}
        onChange={onChangeTextArea}
        disabled={!codeSheetActive}
      />

      <button
        className={`code-area__btn ${
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
