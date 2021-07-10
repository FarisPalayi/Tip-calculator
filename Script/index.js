var billInput = document.querySelector('input[name=bill]');
var billPercentBtns = document.querySelectorAll('.card__section__btns-wrapper__btn');
var tipAmountElm = document.querySelector('.card__section__container--tip .card__section__container__amount');
var totalBillElm = document.querySelector('.card__section__container--total .card__section__container__amount');
var peopleInput = document.querySelector('input[name=people]');
var bill = billInput.value;
var tipPercent = 0;
var people = peopleInput.value;
billPercentBtns.forEach(function (percentBtn) {
    percentBtn.addEventListener('click', function () {
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
