define("dom", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ERROR = exports.RESET_BTN = exports.TOTAL_BILL_AMT = exports.TIP_AMT = exports.PEOPLE_INPUT = exports.CUSTOM_TIP_PERCENT_INPUT = exports.TIP_PERCENT_BTNS = exports.BILL_INPUT = void 0;
    exports.BILL_INPUT = document.querySelector('input[name=bill]');
    exports.TIP_PERCENT_BTNS = document.querySelectorAll('.card__section__btns-wrapper__btn');
    exports.CUSTOM_TIP_PERCENT_INPUT = document.querySelector('input[name=custom]');
    exports.PEOPLE_INPUT = document.querySelector('input[name=people]');
    exports.TIP_AMT = document.querySelector('.card__section__container--tip .card__section__container__amount');
    exports.TOTAL_BILL_AMT = document.querySelector('.card__section__container--total .card__section__container__amount');
    exports.RESET_BTN = document.querySelector('.card__section__reset-btn');
    exports.ERROR = document.querySelector('.card__section__error');
});
define("inputsObj", ["require", "exports", "dom"], function (require, exports, DOM) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.inputsObj = void 0;
    exports.inputsObj = {
        bill: parseFloat(DOM.BILL_INPUT.value),
        tipInPercent: .15,
        noOfPeople: parseInt(DOM.PEOPLE_INPUT.value),
    };
});
define("utils/utils", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.removeBtnActive = exports.setBtnActive = exports.prependDollarSign = void 0;
    function prependDollarSign(amount) {
        return `$${amount.toFixed(2)}`;
    }
    exports.prependDollarSign = prependDollarSign;
    function setBtnActive(element, active) {
        const btnActiveClass = 'card__section__btns-wrapper__btn--active';
        element.classList.toggle(btnActiveClass, active);
    }
    exports.setBtnActive = setBtnActive;
    function removeBtnActive(elements) {
        elements?.forEach((percentBtn) => {
            setBtnActive(percentBtn, false);
        });
    }
    exports.removeBtnActive = removeBtnActive;
});
define("calculation/calculateTip", ["require", "exports", "dom", "inputsObj", "utils/utils", "validation/validation"], function (require, exports, dom_1, inputsObj_1, utils_1, validation_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.showTipPerPerson = exports.calculateTipPerPerson = exports.calculateTip = void 0;
    function calculateTip() {
        return inputsObj_1.inputsObj.bill * inputsObj_1.inputsObj.tipInPercent / 100;
    }
    exports.calculateTip = calculateTip;
    function calculateTipPerPerson() {
        return calculateTip() / inputsObj_1.inputsObj.noOfPeople;
    }
    exports.calculateTipPerPerson = calculateTipPerPerson;
    function showTipPerPerson() {
        if (validation_1.isTipAmountValid())
            dom_1.TIP_AMT.innerText = utils_1.prependDollarSign(calculateTipPerPerson());
        else
            dom_1.TIP_AMT.innerText = utils_1.prependDollarSign(0);
    }
    exports.showTipPerPerson = showTipPerPerson;
});
define("calculation/calculateTotalBill", ["require", "exports", "dom", "inputsObj", "utils/utils", "validation/validation", "calculation/calculateTip"], function (require, exports, dom_2, inputsObj_2, utils_2, validation_2, calculateTip_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.showTotalBillPerPerson = exports.calculateTotalBillPerPerson = exports.calculateTotalBill = void 0;
    function calculateTotalBill() {
        return inputsObj_2.inputsObj.bill + calculateTip_1.calculateTip();
    }
    exports.calculateTotalBill = calculateTotalBill;
    function calculateTotalBillPerPerson() {
        return calculateTotalBill() / inputsObj_2.inputsObj.noOfPeople;
    }
    exports.calculateTotalBillPerPerson = calculateTotalBillPerPerson;
    function showTotalBillPerPerson() {
        if (validation_2.isBillAmountValid())
            dom_2.TOTAL_BILL_AMT.innerHTML = utils_2.prependDollarSign(calculateTotalBillPerPerson());
        else
            dom_2.TOTAL_BILL_AMT.innerText = utils_2.prependDollarSign(0);
    }
    exports.showTotalBillPerPerson = showTotalBillPerPerson;
});
define("validation/validation", ["require", "exports", "dom", "calculation/calculateTip", "calculation/calculateTotalBill"], function (require, exports, DOM, calculateTip_2, calculateTotalBill_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.validatePeopleInput = exports.hideErrorMsg = exports.isPeopleInputValid = exports.isTipAmountValid = exports.isBillAmountValid = void 0;
    function isBillAmountValid() {
        const calculatedTotalBillAmount = calculateTotalBill_1.calculateTotalBillPerPerson();
        return !isNaN(calculatedTotalBillAmount) && isFinite(calculatedTotalBillAmount) && calculatedTotalBillAmount > 0;
    }
    exports.isBillAmountValid = isBillAmountValid;
    function isTipAmountValid() {
        const calculatedTipAmount = calculateTip_2.calculateTipPerPerson();
        return !isNaN(calculatedTipAmount) && isFinite(calculatedTipAmount) && calculatedTipAmount > 0;
    }
    exports.isTipAmountValid = isTipAmountValid;
    function isInteger(str) {
        return parseFloat(str) === parseInt(str);
    }
    function isPeopleInputValid() {
        const peopleInputAsANumber = parseInt(DOM.PEOPLE_INPUT.value);
        return !isNaN(peopleInputAsANumber) && peopleInputAsANumber > 0 && isInteger(DOM.PEOPLE_INPUT.value);
    }
    exports.isPeopleInputValid = isPeopleInputValid;
    function errorMsgs(elementText, errorElm) {
        const elementTextAsANumber = parseFloat(elementText);
        let showError = (errMsg) => errorElm.innerText = errMsg;
        if (elementText === '')
            showError(`Can't be empty`);
        else if (elementTextAsANumber < 0)
            showError('Should be greater than zero');
        else if (elementTextAsANumber === 0)
            showError(`Can\'t be zero`);
        else if (elementText.includes('.'))
            showError('Should be an integer');
        else
            showError('invalid input');
    }
    function showErrorMsg() {
        errorMsgs(DOM.PEOPLE_INPUT.value, DOM.ERROR);
        DOM.ERROR.style.display = 'block';
        DOM.ERROR?.classList.add('card__section__error--visible');
    }
    function hideErrorMsg() {
        DOM.ERROR.style.display = 'none';
        DOM.ERROR?.classList.remove('card__section__error--visible');
    }
    exports.hideErrorMsg = hideErrorMsg;
    function setPeopleInputValid() {
        DOM.PEOPLE_INPUT?.setCustomValidity('');
    }
    function setPeopleInputInvalid() {
        DOM.PEOPLE_INPUT?.setCustomValidity('Please enter a number greater than 0');
    }
    function validatePeopleInput() {
        if (isPeopleInputValid()) {
            hideErrorMsg();
            setPeopleInputValid();
        }
        else {
            showErrorMsg();
            setPeopleInputInvalid();
        }
    }
    exports.validatePeopleInput = validatePeopleInput;
});
define("resetBtn", ["require", "exports", "dom", "inputsObj", "validation/validation"], function (require, exports, DOM, inputsObj_3, validation_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.disableResetBtn = exports.resetInputs = void 0;
    function resetInputs() {
        DOM.BILL_INPUT.value = '';
        DOM.CUSTOM_TIP_PERCENT_INPUT.value = '';
        DOM.PEOPLE_INPUT.value = '';
        inputsObj_3.inputsObj.bill = 0;
        inputsObj_3.inputsObj.noOfPeople = 0;
        inputsObj_3.inputsObj.tipInPercent = 0;
        DOM.TIP_AMT.innerText = '$0.00';
        DOM.TOTAL_BILL_AMT.innerText = '$0.00';
    }
    exports.resetInputs = resetInputs;
    function disableResetBtn() {
        setTimeout(() => {
            const isInputsAreInvalid = !validation_3.isBillAmountValid() || !validation_3.isTipAmountValid() || !validation_3.isPeopleInputValid();
            DOM.RESET_BTN.disabled = isInputsAreInvalid;
            if (isInputsAreInvalid)
                DOM.RESET_BTN?.classList.add('card__section__reset-btn--disabled');
            else
                DOM.RESET_BTN?.classList.remove('card__section__reset-btn--disabled');
        }, 200);
    }
    exports.disableResetBtn = disableResetBtn;
});
define("index", ["require", "exports", "dom", "inputsObj", "resetBtn", "utils/utils", "calculation/calculateTip", "calculation/calculateTotalBill", "validation/validation"], function (require, exports, DOM, inputsObj_4, resetBtn_1, utils_3, calculateTip_3, calculateTotalBill_2, validation_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    calculateTip_3.showTipPerPerson();
    calculateTotalBill_2.showTotalBillPerPerson();
    resetBtn_1.disableResetBtn();
    function updatePeople() {
        inputsObj_4.inputsObj.noOfPeople = parseInt(DOM.PEOPLE_INPUT.value) || 0;
    }
    function updateBill() {
        inputsObj_4.inputsObj.bill = parseFloat(DOM.BILL_INPUT.value) || 0;
    }
    function updateTipPercent(event) {
        const clickedElmPercent = event.target?.getAttribute('data-percent');
        inputsObj_4.inputsObj.tipInPercent = parseFloat(clickedElmPercent);
    }
    function updateCustomTipPercent() {
        inputsObj_4.inputsObj.tipInPercent = parseFloat(DOM.CUSTOM_TIP_PERCENT_INPUT.value) || 0;
    }
    DOM.PEOPLE_INPUT?.addEventListener('input', (event) => {
        updatePeople();
        validation_4.validatePeopleInput();
        resetBtn_1.disableResetBtn();
    });
    DOM.PEOPLE_INPUT?.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            updatePeople();
            calculateTip_3.showTipPerPerson();
            calculateTotalBill_2.showTotalBillPerPerson();
            validation_4.validatePeopleInput();
            resetBtn_1.disableResetBtn();
        }
    });
    DOM.BILL_INPUT?.addEventListener('input', () => {
        updateBill();
        resetBtn_1.disableResetBtn();
    });
    DOM.BILL_INPUT?.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            updatePeople();
            calculateTip_3.showTipPerPerson();
            calculateTotalBill_2.showTotalBillPerPerson();
            resetBtn_1.disableResetBtn();
        }
    });
    DOM.TIP_PERCENT_BTNS?.forEach((percentBtn) => {
        percentBtn.addEventListener('click', (event) => {
            updateTipPercent(event);
            calculateTip_3.showTipPerPerson();
            calculateTotalBill_2.showTotalBillPerPerson();
            utils_3.removeBtnActive(DOM.TIP_PERCENT_BTNS);
            utils_3.setBtnActive(percentBtn, true);
            resetBtn_1.disableResetBtn();
        });
    });
    DOM.CUSTOM_TIP_PERCENT_INPUT?.addEventListener('input', (event) => {
        updateCustomTipPercent();
        utils_3.removeBtnActive(DOM.TIP_PERCENT_BTNS);
        resetBtn_1.disableResetBtn();
    });
    DOM.CUSTOM_TIP_PERCENT_INPUT?.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            updateCustomTipPercent();
            calculateTip_3.showTipPerPerson();
            calculateTotalBill_2.showTotalBillPerPerson();
            utils_3.removeBtnActive(DOM.TIP_PERCENT_BTNS);
            resetBtn_1.disableResetBtn();
        }
    });
    DOM.RESET_BTN?.addEventListener('click', () => {
        resetBtn_1.resetInputs();
        updateBill();
        updatePeople();
        validation_4.hideErrorMsg();
        utils_3.removeBtnActive(DOM.TIP_PERCENT_BTNS);
        resetBtn_1.disableResetBtn();
    });
});
//# sourceMappingURL=index.js.map