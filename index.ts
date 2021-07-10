// language: typescript

let amount : number;
let percent : number;
let result : number;

const resultEl : HTMLSpanElement = document.getElementById("result");

function calculate(amount : number, percent : number) : number {
    result = amount * percent / 100;
    return result;
}

function updateResult(): void {
    resultEl.innerHTML = result.toFixed(2);
}

function updateAmount(): void {
    amount = parseInt(document.getElementById("amount").value);
    updateResult();
}