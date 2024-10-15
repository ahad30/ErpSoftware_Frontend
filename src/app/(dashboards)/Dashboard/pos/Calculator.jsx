"use client"
import ButtonsContainer from "@/components/Calculator/ButtonsContainer";
import DisplayContainer from "@/components/Calculator/DisplayContainer";
import React, { useState } from "react";

function Calculator() {
  const [display, setDisplay] = useState("");
  const [result, setResult] = useState("");

  function handleClick(e) {
    const targetValue = e.target.name;
    setDisplay(display + targetValue);
  }

  function operatorClick(operator) {
    let lastCharacter = display.slice(-2);
    let operatorsArray = ["+ ", "- ", "* ", "/ "];

    console.log(lastCharacter);

    if (display === "" || operatorsArray.includes(lastCharacter)) return;

    setDisplay((prevDisplay) => {
      return prevDisplay + " " + operator + " ";
    });
  }

  function handleEqual() {
    if (display.slice(-2).includes("+ ", "- ", "* ", "/ ")) return;

    setDisplay("");

    try {
      const resultValue = calculate(display);
      setResult(resultValue);
    } catch (error) {
      setDisplay("Error");
    }
  }

  function calculate(expression) {
    const tokens = expression.split(" ");
    let resultValue = parseInt(tokens[0]);

    for (let i = 1; i < tokens.length; i += 2) {
      const operator = tokens[i];
      const nextNumber = parseInt(tokens[i + 1]);

      switch (operator) {
        case "+":
          resultValue += nextNumber;
          break;
        case "-":
          resultValue -= nextNumber;
          break;
        case "*":
          resultValue *= nextNumber;
          break;
        case "/":
          resultValue /= nextNumber;
          break;
        default:
          resultValue = "Error";
      }
    }
    return resultValue;
  }

  function clear() {
    setDisplay("");
    setResult("");
  }

  function backspace() {
    setDisplay(display.slice(0, -1));
  }

  return (
    <>
      <div className="container">
        <div className="w-[80%] lg:w-[100%]">
          <DisplayContainer
            display={display}
            result={result}
            backspace={backspace}
            clear={clear}
          />
          <ButtonsContainer
            operatorClick={operatorClick}
            handleClick={handleClick}
            handleEqual={handleEqual}
          />
        </div>
      </div>
    </>
  );
}

export default Calculator;
