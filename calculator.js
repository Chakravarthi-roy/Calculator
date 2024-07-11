let ScreenValue = "";
let PreScreenValue = "";
let operator = "";
let equal = 0;
const buttons = document.querySelectorAll(".btn");
const display = document.getElementById("screen");

buttons.forEach(button => {
    button.addEventListener("click", function(){
        const value = this.textContent;
        if(!isNaN(value)){
            if(equal == 1){
                ScreenValue = "";
                ScreenValue += value;
                display.textContent = ScreenValue;
                equal = 0;
            }else{
                ScreenValue += value;
                display.textContent = ScreenValue;
            }
        }else if (value === "C"){
            ScreenValue = "";
            PreScreenValue = "";
            operator = "";
            display.textContent = "0";
        }else if (value === "D"){
            if (ScreenValue.length > 0){
                ScreenValue = ScreenValue.slice(0, -1);
                display.textContent = ScreenValue || "0";
            }
        }else if(value === "."){
            if(equal == 1){
                ScreenValue = ""
                equal = 0
            }
            if(!ScreenValue.includes("."))
                ScreenValue += ".";
                display.textContent = ScreenValue;        
        }else if (value === "="){
            calculate();
        }else{
            operator = value;
            PreScreenValue = ScreenValue;
            ScreenValue = "";
        }
    });
});

function calculate(){
    let result = 0;
    let a = parseFloat(PreScreenValue);
    let b = parseFloat(ScreenValue);

    if(!a && !ScreenValue.includes(".")){
        result = b
        ScreenValue = result.toString();
        display.textContent = ScreenValue;
        equal = 0
    }else if(!a && ScreenValue.includes(".")){
        result = ScreenValue;
        ScreenValue = result.toString();
        display.textContent = ScreenValue;
        equal = 0
    }else{
        if(operator === "+"){
            result = a + b;
        }else if (operator === "-"){
            result = a - b;
        }else if (operator === "*"){
            result = a * b;
        }else if (operator === "/"){
            if(b === 0){
                result="Error"
            }else{
                result = a / b;
            }
        }else if(operator === "%"){
            if(!b){
                result = a/100;
            }else{
                result = (a/100)*b;
            }
        }
        ScreenValue = result.toString();
        display.textContent = ScreenValue;
        equal = 1;
    }

    operator = "";
}