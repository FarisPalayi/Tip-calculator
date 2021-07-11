/**
 * @author Faris P
 * @license MIT
 * @description a basic tip calculator
 */
// -------------------------
// grab the dom elements
var billInput = document.querySelector('input[name=bill]');
var billPercentBtns = document.querySelectorAll('.card__section__btns-wrapper__btn');
var tipAmountElm = document.querySelector('.card__section__container--tip .card__section__container__amount');
var totalBillElm = document.querySelector('.card__section__container--total .card__section__container__amount');
var peopleInput = document.querySelector('input[name=people]');
var customTipPercentInput = document.querySelector('input[name=custom]');
// -------------------------
// vars
var bill = parseFloat(billInput.value) || 0;
var tipInPercent = .15; // initial value
var people = parseInt(peopleInput.value) || 1;
// -------------------------
// updagte variable values
function updateBill() {
    bill = parseFloat(billInput.value) || 0;
}
function updateTipPercent(event) {
    var _a;
    var clickedElmPercent = (_a = event.target) === null || _a === void 0 ? void 0 : _a.getAttribute('data-percent');
    tipInPercent = parseFloat(clickedElmPercent);
}
function updateCustomTipPercent() {
    tipInPercent = parseFloat(customTipPercentInput.value) || 0;
}
function updatePeople() {
    people = parseInt(peopleInput.value) || 0;
}
// -------------------------
// calculate tip
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
    tipAmountElm.innerHTML = prependDollarSign(calculateTipPerPerson()) || '$0.00';
}
showTipPerPerson();
// -------------------------
// calculate total bill
function calculateTotalBill() {
    return bill + calculateTip();
}
function calculateTotalBillPerPerson() {
    return calculateTotalBill() / people;
}
function showTotalBillPerPerson() {
    totalBillElm.innerHTML = prependDollarSign(calculateTotalBillPerPerson()) || '$0.00';
}
showTotalBillPerPerson();
// -------------------------
function setBtnActive(element, active) {
    var btnActiveClass = 'card__section__btns-wrapper__btn--active';
    element.classList.toggle(btnActiveClass, active);
}
function removeBtnActive() {
    billPercentBtns === null || billPercentBtns === void 0 ? void 0 : billPercentBtns.forEach(function (percentBtn) {
        setBtnActive(percentBtn, false);
    });
}
// -------------------------
// event listeners
billInput === null || billInput === void 0 ? void 0 : billInput.addEventListener('input', function () {
    updateBill();
    showTipPerPerson();
    showTotalBillPerPerson();
});
billPercentBtns === null || billPercentBtns === void 0 ? void 0 : billPercentBtns.forEach(function (percentBtn) {
    percentBtn.addEventListener('click', function (event) {
        updateTipPercent(event);
        showTipPerPerson();
        showTotalBillPerPerson();
        removeBtnActive();
        setBtnActive(percentBtn, true);
    });
});
customTipPercentInput === null || customTipPercentInput === void 0 ? void 0 : customTipPercentInput.addEventListener('input', function () {
    updateCustomTipPercent();
    showTipPerPerson();
    showTotalBillPerPerson();
    removeBtnActive();
});
peopleInput === null || peopleInput === void 0 ? void 0 : peopleInput.addEventListener('input', function () {
    updatePeople();
    showTipPerPerson();
    showTotalBillPerPerson();
    validatePeopleInput();
});
// -------------------------
// resets the inputs
var reset = document.querySelector('.card__section__reset-btn');
reset === null || reset === void 0 ? void 0 : reset.addEventListener('click', resetInputs);
function resetInputs() {
    billInput.value = '0';
    peopleInput.value = '1';
    customTipPercentInput.value = '0';
    tipAmountElm.innerHTML = '$0.00';
    totalBillElm.innerHTML = '$0.00';
    hideErrorMsg();
}
// -------------------------
// validation
var errorElm = document.querySelector('.card__section__error');
function isPeopleInuputValild() {
    var peopleInputAsANumber = parseInt(peopleInput.value);
    return !isNaN(peopleInputAsANumber) && peopleInputAsANumber > 0;
}
function showErrorMsg() {
    errorElm === null || errorElm === void 0 ? void 0 : errorElm.setAttribute('aria-hidden', 'false');
    errorElm === null || errorElm === void 0 ? void 0 : errorElm.classList.add('card__section__error--visible');
}
function hideErrorMsg() {
    errorElm === null || errorElm === void 0 ? void 0 : errorElm.setAttribute('aria-hidden', 'true');
    errorElm === null || errorElm === void 0 ? void 0 : errorElm.classList.remove('card__section__error--visible');
}
function validatePeopleInput() {
    if (isPeopleInuputValild()) {
        hideErrorMsg();
    }
    else {
        showErrorMsg();
    }
}
