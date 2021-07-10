var billInput = document.querySelector('input[name=bill]');
var billPercentBtns = document.querySelectorAll('.card__section__btns-wrapper__btn');
var tipAmountElm = document.querySelector('.card__section__container--tip .card__section__container__amount');
var totalBillElm = document.querySelector('.card__section__container--total card__section__container__amount');
var peopleInput = document.querySelector('input[name=people]');
var bill = 0;
var tipPercent = 0;
var people = 0;
var totalBill = 0;
var tipAmount = 0;
function updateTipPercent() {
    billPercentBtns.forEach(function (percentBtn) {
        percentBtn.addEventListener('click', function () {
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
