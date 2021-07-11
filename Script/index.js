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
// global variables
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
// validate tip
function isTipAmountValid() {
    var calculatedTipAmount = calculateTipPerPerson();
    return !isNaN(calculatedTipAmount) && isFinite(calculatedTipAmount) && calculatedTipAmount > 0;
}
// show tip
function showTipPerPerson() {
    if (isTipAmountValid()) {
        tipAmountElm.innerText = prependDollarSign(calculateTipPerPerson());
    }
    else {
        tipAmountElm.innerText = prependDollarSign(0);
    }
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
// validate total bill
function isBillAmountValid() {
    var calculatedTotalBillAmount = calculateTotalBillPerPerson();
    return !isNaN(calculatedTotalBillAmount) && isFinite(calculatedTotalBillAmount) && calculatedTotalBillAmount > 0;
}
// show total bill
function showTotalBillPerPerson() {
    if (isBillAmountValid()) {
        totalBillElm.innerHTML = prependDollarSign(calculateTotalBillPerPerson());
    }
    else {
        totalBillElm.innerText = prependDollarSign(0);
    }
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
// validate the people input
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
function setPeopleInputValid() {
    peopleInput === null || peopleInput === void 0 ? void 0 : peopleInput.setCustomValidity('');
}
function setPeopleInputInvalid() {
    peopleInput === null || peopleInput === void 0 ? void 0 : peopleInput.setCustomValidity('Please enter a number greater than 0');
}
function validatePeopleInput() {
    if (isPeopleInuputValild()) {
        hideErrorMsg();
        setPeopleInputValid();
    }
    else {
        showErrorMsg();
        setPeopleInputInvalid();
    }
}
// difference between textContent and innerHTML
// textContent is used for text node
// innerHTML is used for element node
// thanks :thumbsup:
// https://stackoverflow.com/questions/123415/whats-the-difference-between-textcontent-and-innerhtml
// https://developer.mozilla.org/en-US/docs/Web/API/TextNode
// these links aren't working
// https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML
// yeah, this one works :thumbsup:
// any other link?
// https://stackoverflow.com/questions/123415/whats-the-difference-between-textcontent-and-innerhtml
// oh god! this is an invalid link. I already told you.
