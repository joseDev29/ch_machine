import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";

import "./styles.css";

export const CodeInputs = () => {
  const {
    generalState,
    changeGeneralState,
    buttonsState: { codeSheetActive },
  } = useContext(AppContext);

  const onChangeInputFilename = (ev) => {
    changeGeneralState({ filename: ev.target.value });
    localStorage.setItem("filename", ev.target.value);
  };

  const onChangeTextArea = (ev) => {
    changeGeneralState({ rawCode: ev.target.value });
  };

  return (
    <div className="ci-main">
      <div className="ci-file-path">
        <input
          className="ci-file-path-input"
          type="text"
          spellCheck="false"
          value={generalState.filename}
          disabled={!codeSheetActive}
          onChange={onChangeInputFilename}
        />
        <div className="ci-file-path-ext">
          <p>.ch</p>
        </div>
      </div>

      <textarea
        className="ci-sheet my-scroll"
        name=""
        id=""
        spellCheck="false"
        value={generalState.rawCode}
        onChange={onChangeTextArea}
        disabled={!codeSheetActive}
      />
    </div>
  );
};
