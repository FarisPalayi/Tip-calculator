/**
 * @author Faris P
 * @license MIT
 * @description basic tip calculator
 */
var billInput = document.querySelector('input[name=bill]');
var billPercentBtns = document.querySelectorAll('.card__section__btns-wrapper__btn');
var tipAmountElm = document.querySelector('.card__section__container--tip .card__section__container__amount');
var totalBillElm = document.querySelector('.card__section__container--total .card__section__container__amount');
var peopleInput = document.querySelector('input[name=people]');
var customTipPercentInput = document.querySelector('input[name=custom]');
// -------------------------
var bill = parseFloat(billInput.value) || 0;
var tipInPercent = 0;
var people = parseInt(peopleInput.value) || 0;
billPercentBtns === null || billPercentBtns === void 0 ? void 0 : billPercentBtns.forEach(function (percentBtn) {
    percentBtn.addEventListener('click', function (event) {
        updateTipPercent(event);
        showTipPerPerson();
        showTotalBillPerPerson();
        removeBtnActive();
        setBtnActive(percentBtn, true);
    });
});
function updateCustomInputDataPercent(event) {
}
function updateTipPercent(event) {
    var _a;
    var clickedElmPercent = (_a = event.target) === null || _a === void 0 ? void 0 : _a.getAttribute('data-percent');
    tipInPercent = parseFloat(clickedElmPercent);
}
function setBtnActive(element, active) {
    var btnActiveClass = 'card__section__btns-wrapper__btn--active';
    element.classList.toggle(btnActiveClass, active);
}
function removeBtnActive() {
    billPercentBtns === null || billPercentBtns === void 0 ? void 0 : billPercentBtns.forEach(function (percentBtn) {
        setBtnActive(percentBtn, false);
    });
}
billInput === null || billInput === void 0 ? void 0 : billInput.addEventListener('input', function () {
    updateBill();
    showTipPerPerson();
    showTotalBillPerPerson();
});
function updateBill() {
    bill = parseFloat(billInput.value) || 50;
}
peopleInput === null || peopleInput === void 0 ? void 0 : peopleInput.addEventListener('input', function () {
    updatePeople();
    showTipPerPerson();
    showTotalBillPerPerson();
});
function updatePeople() {
    people = parseInt(peopleInput.value) || 0;
}
function calculateTip() {
    return bill * tipInPercent / 100;
}
function calculateTipPerPerson() {
    return calculateTip() / people;
}
function prependDollarSign(amount) {
    return "$" + amount.toFixed(2);
}
function showTipPerPerson() {
    tipAmountElm.innerHTML = prependDollarSign(calculateTipPerPerson());
}
function calculateTotalBill() {
    return bill + calculateTip();
}
function calculateTotalBillPerPerson() {
    return calculateTotalBill() / people;
}
function showTotalBillPerPerson() {
    totalBillElm.innerHTML = prependDollarSign(calculateTotalBillPerPerson());
}
showTipPerPerson();
showTotalBillPerPerson();
// -------------------------
