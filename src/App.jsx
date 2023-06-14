/* eslint-disable no-unused-vars */
import { useState } from "react" 

export default function App() {
    
    const [input, setInput] = useState("")
    
    const [result, setResult] = useState("0")

    const [equalPressed, setEqualPressed] = useState(false)

    const [error, setError] = useState(false)

    const handleClick = (e) => {

        const v = e.target.value
        if (!isNaN(v)) {
            if (equalPressed) {
                setEqualPressed(false) 
                setInput("") 
                setResult(v) 
                return 
            }

            if (result.includes(".")) {
                setResult(result + v) 
                return 
            }

            if (isNaN(result)) {
                setInput(input + result) 
                setResult("" + +v) 
                return 
            }

            setResult(prevState => (prevState = "" + +(result + v))) 

            return 
        }

        if (v === ".") {
            if (result.includes(".")) {
                return 
            }
            setResult(result + v) 
            return 
        }

        if (v === "clear") {
            setInput("") 
            setResult("0") 
            setEqualPressed(false) 
            setError(false) 
            return 
        }

        if (v === "del") {
            if (equalPressed) {
                setInput("") 
                setResult("0") 
                return 
            }

            if (result.length > 1) {
                setResult(result.slice(0, -1)) 
            } else {
                setResult("0") 
            }
            
            return 
        }

        if (["+", "-", "/", "X"].includes(v)) {
            if (equalPressed) {
                setEqualPressed(false) 
                setInput(result) 
                setResult(v) 
                return 
            }

            if (!["+", "/", "X", "-"].includes(result[0])) {
                setInput(input + result) 
                setResult(v) 
                return 
            }

            if (v === "-" && result !== "-" && result.length < 2 && !equalPressed) {
                setResult(result + v) 
                return 
            }

            setResult(v) 
            return 
        }

        if (v === "=") {
            if (equalPressed) return 

            setEqualPressed(true) 
            try {
                let calc = "" + eval(input.replaceAll("X", "*") + result) 
                const len = calc.length 
                setResult(len > 10 ? (+calc).toPrecision(10) : calc) 
                setInput(input + result + "=") 
            } catch (err) {
                setError(true) 
            }
        }
    } 

    return (
        <div className="big-container">
            <div id="calculator">
                <div id="title" >
                    Javascript Calculator
                </div>
                <div id="log-screen">
                    {!error ? input + result : input + result + "= Error"}
                </div>
                <div id="display"            >
                    {!error ? result : "ERROR!"}
                </div>
                <button
                    id="clear"
                    value="clear"
                    onClick={handleClick}
                >
                    CLR
                </button>
                <button
                    id="del"
                    value="del"
                    onClick={handleClick}
                >
                    DEL
                </button>
                <button
                    id="divide"
                    value="/"
                    onClick={handleClick}
                >
                    /
                </button>
                <button id="one" value="1" onClick={handleClick}>
                    1
                </button>
                <button id="two" value="2" onClick={handleClick}>
                    2
                </button>
                <button id="three" value="3" onClick={handleClick}>
                    3
                </button>
                <button
                    id="multiply"
                    value="X"
                    onClick={handleClick}
                >
                    X
                </button>
                <button id="four" value="4" onClick={handleClick}>
                    4
                </button>
                <button id="five" value="5" onClick={handleClick}>
                    5
                </button>
                <button id="six" value="6" onClick={handleClick}>
                    6
                </button>
                <button
                    id="subtract"
                    value="-"
                    onClick={handleClick}
                >
                    -
                </button>
                <button
                    id="seven"

                    value="7"
                    onClick={handleClick}
                >
                    7
                </button>
                <button
                    id="eight"
                    value="8"
                    onClick={handleClick}
                >
                    8
                </button>
                <button id="nine" value="9" onClick={handleClick}>
                    9
                </button>
                <button id="add" value="+" onClick={handleClick}>
                    +
                </button>
                <button
                    id="decimal"
                    value="."
                    onClick={handleClick}
                >
                    .
                </button>
                <button id="zero" value="0" onClick={handleClick}>
                    0
                </button>
                <button
                    id="equals"
                    value="="
                    onClick={handleClick}
                >
                    =
                </button>
            </div>
        </div>
    )
}
