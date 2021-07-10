const billInput = document.querySelector('input[name=bill]') as HTMLInputElement;
const billPercentBtns = document.querySelectorAll('.card__section__btns-wrapper__btn');
const tipAmountElm = document.querySelector('.card__section__container--tip .card__section__container__amount') as HTMLSpanElement;
const totalBillElm = document.querySelector('.card__section__container--total card__section__container__amount') as HTMLSpanElement;
const peopleInput = document.querySelector('input[name=people]') as HTMLInputElement;

let bill = 0;
let tipPercent = 0;
let people = 0;

let totalBill = 0;
let tipAmount = 0;

function updateTipPercent() {
  billPercentBtns.forEach((percentBtn) => {
    percentBtn.addEventListener('click', () => {
      tipPercent = parseInt(percentBtn.getAttribute('data-percent'));
      tipAmount = tipPercent / 100 * bill;
      tipAmountElm.innerHTML = tipAmount.toFixed(2);
    });
  });
}
updateTipPercent();
updateBill();
updatePeople();
updateTotalBill();
updateTipAmount();

function updateBill() {
    bill = parseInt(billInput.value);
}

function updatePeople() {
    people = parseInt(peopleInput.value);
}

function updateTotalBill() {
    totalBill = bill * people;
}

function updateTipAmount() {
    tipAmount = totalBill * tipPercent / 100;
    tipAmountElm.innerHTML = tipAmount.toFixed(2);
}


// const perPerson = percent / people;
// function updateTotal