var billInput = document.querySelector('input[name=bill]');
var billPercentBtns = document.querySelectorAll('.card__section__btns-wrapper__btn');
var tipAmountElm = document.querySelector('.card__section__container--tip .card__section__container__amount');
var totalBillElm = document.querySelector('.card__section__container--total .card__section__container__amount');
var peopleInput = document.querySelector('input[name=people]');
var bill = parseFloat(billInput.value) || 0;
var tipInPercent = 0;
var people = parseInt(peopleInput.value) || 0;
billPercentBtns.forEach(function (percentBtn) {
    percentBtn.addEventListener('click', updateTipPercent);
    percentBtn.addEventListener('click', showTipPerPerson);
    percentBtn.addEventListener('click', showTotalBillPerPerson);
});
function updateTipPercent(event) {
    var _a;
    var clickedElmPercent = (_a = event.target) === null || _a === void 0 ? void 0 : _a.getAttribute('data-percent');
    tipInPercent = parseFloat(clickedElmPercent);
}
billInput === null || billInput === void 0 ? void 0 : billInput.addEventListener('input', updateBill);
function updateBill() {
    bill = parseFloat(billInput.value) || 50;
}
peopleInput === null || peopleInput === void 0 ? void 0 : peopleInput.addEventListener('input', updatePeople);
function updatePeople() {
    people = parseInt(peopleInput.value) || 0;
}
function calculateTip() {
    return bill * tipInPercent / 100;
}
function calculateTipPerPerson() {
    return calculateTip() / people;
}
function showTipPerPerson() {
    tipAmountElm.innerHTML = calculateTipPerPerson().toFixed(2);
}
function calculateTotalBill() {
    return bill + calculateTip();
}
function calculateTotalBillPerPerson() {
    return calculateTotalBill() / people;
}
function showTotalBillPerPerson() {
    totalBillElm.innerHTML = calculateTotalBillPerPerson().toFixed(2);
}
showTipPerPerson();
showTotalBillPerPerson();
