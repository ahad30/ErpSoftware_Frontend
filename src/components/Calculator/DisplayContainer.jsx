import { BackwardIcon } from "@heroicons/react/24/outline";
import React from "react";
import { CgBackspace } from "react-icons/cg";

function DisplayContainer({ display, result, backspace, clear }) {
  return (
    <>
      <div className="display-container">
        <div className="display">
          <div className="input-field mt-5">{display}</div>
          <div className="answer-field">{result}</div>
        </div>
        <div className="other-btns mt-5">
          <button className="colored-btn flex flex-col items-center justify-center" onClick={backspace}>
            <CgBackspace size={25}/>
          </button>
          <button onClick={clear} className="text-base colored-btn">
            AC
          </button>
        </div>
      </div>
    </>
  );
}

export default DisplayContainer;
