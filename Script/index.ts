const billInput = document.querySelector('input[name=bill]') as HTMLInputElement;
const billPercentBtns = document.querySelectorAll('.card__section__btns-wrapper__btn');
const tipAmountElm = document.querySelector('.card__section__container--tip .card__section__container__amount') as HTMLSpanElement;
const totalBillElm = document.querySelector('.card__section__container--total .card__section__container__amount') as HTMLSpanElement;
const peopleInput = document.querySelector('input[name=people]') as HTMLInputElement;

let bill = billInput.value;
let tipPercent = 0;
let people = peopleInput.value;

billPercentBtns.forEach((percentBtn) => {
percentBtn.addEventListener('click', () => {
    tipPercent = parseInt(percentBtn.getAttribute('data-percent'));
    showTipPerson(calculateTipPerPerson(bill, tipPercent));
    showTotalBill(calculateTotalBillPerPerson(bill, people));
});
});

function showTipPerson(tipAmount) {
    tipAmountElm.innerHTML = tipAmount;
}

function calculateTipPerPerson(bill, tipPercent) {
    return bill * tipPercent / 100;
}

function showTotalBill(totalBill) {
    totalBillElm.innerHTML = totalBill;
}

function calculateTotalBillPerPerson(bill, people) {
    return bill * people;
}