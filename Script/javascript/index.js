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
define("inputsObj", ["require", "exports", "dom"], function (require, exports, dom_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let inputsObj = {
        bill: parseFloat(dom_1.BILL_INPUT.value),
        tipInPercent: .15,
        noOfPeople: parseInt(dom_1.PEOPLE_INPUT.value),
    };
    exports.default = inputsObj;
});
define("utils/utils", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isInteger = exports.removeBtnActive = exports.setBtnActive = exports.prependDollarSign = void 0;
    /**
     * Prepends dollar sign to a number
     */
    function prependDollarSign(amount) {
        return `$${amount.toFixed(2)}`;
    }
    exports.prependDollarSign = prependDollarSign;
    /**
     * Sets argument button element active/inactive by adding/removing a css class.
     * @param  {HTMLButtonElement} btn
     * @param  {boolean} active Controls if the css active class should be added or removed
     */
    function setBtnActive(btn, active) {
        const btnActiveClass = 'card__section__btns-wrapper__btn--active';
        btn.classList.toggle(btnActiveClass, active);
    }
    exports.setBtnActive = setBtnActive;
    /**
     * Removes a css active class from a list of buttons (passed as an argument)
     * With the help of the {@link setBtnActive} function
     */
    function removeBtnActive(btns) {
        btns?.forEach((percentBtn) => setBtnActive(percentBtn, false));
    }
    exports.removeBtnActive = removeBtnActive;
    /**
     * Checks if a string contains valid integer
     */
    function isInteger(str) {
        return parseFloat(str) === parseInt(str);
    }
    exports.isInteger = isInteger;
});
define("calculation/calculateTip", ["require", "exports", "dom", "inputsObj", "utils/utils", "validation/validation"], function (require, exports, dom_2, inputsObj_1, utils_1, validation_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.showTipPerPerson = exports.calculateTipPerPerson = exports.calculateTip = void 0;
    // TODO: handle rounding errors
    /**
     * Returns tip by using the bill, tip percent values
     * - bill and tip percent values are stored in the {@link inputsObj} object
    */
    function calculateTip() {
        return inputsObj_1.default.bill * inputsObj_1.default.tipInPercent / 100;
    }
    exports.calculateTip = calculateTip;
    /**
     * Returns tip per person by dividing the no.of people with total tip.
     * - Total bill is obtained by using the {@link calculateTip} function
    */
    function calculateTipPerPerson() {
        return calculateTip() / inputsObj_1.default.noOfPeople;
    }
    exports.calculateTipPerPerson = calculateTipPerPerson;
    /**
     * Shows the tip per person value (in dollars) if bill input value is valid
     * - Checks validity by using the {@link isTipAmountValid} function
    */
    function showTipPerPerson() {
        if (validation_1.isTipAmountValid())
            dom_2.TIP_AMT.innerText = utils_1.prependDollarSign(calculateTipPerPerson());
        else
            dom_2.TIP_AMT.innerText = utils_1.prependDollarSign(0);
    }
    exports.showTipPerPerson = showTipPerPerson;
});
define("calculation/calculateTotalBill", ["require", "exports", "dom", "inputsObj", "utils/utils", "validation/validation", "calculation/calculateTip"], function (require, exports, dom_3, inputsObj_2, utils_2, validation_2, calculateTip_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.showTotalBillPerPerson = exports.calculateTotalBillPerPerson = exports.calculateTotalBill = void 0;
    /**
     * Returns total bill by adding bill and total tip amount.
     * - Total tip amount is obtained by using the {@link calculateTip} function
    */
    function calculateTotalBill() {
        return inputsObj_2.default.bill + calculateTip_1.calculateTip();
    }
    exports.calculateTotalBill = calculateTotalBill;
    /**
     * Returns total bill per person by dividing total bill by the no.of people.
     * - No.of people is obtained by using the {@link calculateTotalBill} function
    */
    function calculateTotalBillPerPerson() {
        return calculateTotalBill() / inputsObj_2.default.noOfPeople;
    }
    exports.calculateTotalBillPerPerson = calculateTotalBillPerPerson;
    /**
     * Shows the bill per person value (in dollars) if bill input value is valid
     * - Checks validity by using the {@link isBillAmountValid} function
    */
    function showTotalBillPerPerson() {
        if (validation_2.isBillAmountValid())
            dom_3.TOTAL_BILL_AMT.innerHTML = utils_2.prependDollarSign(calculateTotalBillPerPerson());
        else
            dom_3.TOTAL_BILL_AMT.innerText = utils_2.prependDollarSign(0);
    }
    exports.showTotalBillPerPerson = showTotalBillPerPerson;
});
define("validation/validation", ["require", "exports", "dom", "calculation/calculateTip", "calculation/calculateTotalBill", "utils/utils"], function (require, exports, dom_4, calculateTip_2, calculateTotalBill_1, utils_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.showErrorMsgOnPeopleInput = exports.hideErrorMsg = exports.isPeopleInputValid = exports.isTipAmountValid = exports.isBillAmountValid = void 0;
    // TODO: add transitions to error text
    // TODO: Change error message's color to red ✔
    // there are repeated code in this file.
    /**
     * Function to check if the input value is valid
    */
    function isValidInput(num) {
        return !isNaN(num) && isFinite(num) && num > 0;
    }
    /**
     * Checks if the calculated total bill per person is valid.
     * - Total bill per person is obtained by using the {@link calculateTotalBillPerPerson} function
     */
    function isBillAmountValid() {
        return isValidInput(calculateTotalBill_1.calculateTotalBillPerPerson());
    }
    exports.isBillAmountValid = isBillAmountValid;
    /**
     * Checks if the calculated tip per person value is valid.
     * - Tip per person is obtained by using the {@link calculateTipPerPerson} function
    */
    function isTipAmountValid() {
        return isValidInput(calculateTip_2.calculateTipPerPerson());
    }
    exports.isTipAmountValid = isTipAmountValid;
    /**
     * Checks if the people input value is valid.
    */
    function isPeopleInputValid() {
        return utils_3.isInteger(dom_4.PEOPLE_INPUT.value) && isValidInput(parseInt(dom_4.PEOPLE_INPUT.value));
    }
    exports.isPeopleInputValid = isPeopleInputValid;
    /**
     * Prints error message based on some constraints.
     */
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
    /**
     * Shows the error message on the people input
    */
    function showErrorMsg() {
        errorMsgs(dom_4.PEOPLE_INPUT.value, dom_4.ERROR);
        dom_4.ERROR.style.display = 'block';
        dom_4.ERROR?.classList.add('card__section__error--visible');
        setPeopleInputInvalid();
    }
    /**
     * Hides the error message on the people input
    */
    function hideErrorMsg() {
        dom_4.ERROR?.classList.remove('card__section__error--visible');
        dom_4.ERROR.style.display = 'none';
        setPeopleInputValid();
    }
    exports.hideErrorMsg = hideErrorMsg;
    /**
     * Sets the people input invalid.
     * So, that css :invalid pseudo-class will apply styles.
     */
    function setPeopleInputValid() {
        dom_4.PEOPLE_INPUT?.setCustomValidity('');
    }
    /**
     * Sets the people input invalid.
     * So that the css :invalid pseudo class won't apply styles.
    */
    function setPeopleInputInvalid() {
        dom_4.PEOPLE_INPUT?.setCustomValidity('Please enter a number greater than 0');
    }
    /**
     * Shows error message on people input's error element if the input is not valid.
    */
    function showErrorMsgOnPeopleInput() {
        if (isPeopleInputValid())
            hideErrorMsg();
        else
            showErrorMsg();
    }
    exports.showErrorMsgOnPeopleInput = showErrorMsgOnPeopleInput;
});
define("resetBtn", ["require", "exports", "dom", "inputsObj", "validation/validation"], function (require, exports, DOM, inputsObj_3, validation_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.disableResetBtn = exports.resetInputs = void 0;
    /**
     * 1. resets the input values
     * 2. resets inputsObj object values
     * 3. reset the tip and totalbill result values to '$0.00'
    */
    function resetInputs() {
        DOM.BILL_INPUT.value = '';
        DOM.CUSTOM_TIP_PERCENT_INPUT.value = '';
        DOM.PEOPLE_INPUT.value = '';
        inputsObj_3.default.bill = 0;
        inputsObj_3.default.noOfPeople = 0;
        inputsObj_3.default.tipInPercent = 0;
        DOM.TIP_AMT.innerText = '$0.00';
        DOM.TOTAL_BILL_AMT.innerText = '$0.00';
    }
    exports.resetInputs = resetInputs;
    /**
     * Disable reset button if the input values are invalid
     */
    function disableResetBtn() {
        setTimeout(() => {
            const isInputsAreInvalid = !validation_3.isBillAmountValid() || !validation_3.isTipAmountValid() || !validation_3.isPeopleInputValid();
            DOM.RESET_BTN.disabled = isInputsAreInvalid;
            if (isInputsAreInvalid)
                DOM.RESET_BTN?.classList.add('card__section__reset-btn--disabled');
            else
                DOM.RESET_BTN?.classList.remove('card__section__reset-btn--disabled');
        }, 200); // to give btn disabling and style changes a bit delay
    }
    exports.disableResetBtn = disableResetBtn;
});
/**
 * @author Faris P
 * @license MIT
 * @description a basic tip calculator
 */
define("index", ["require", "exports", "dom", "inputsObj", "resetBtn", "utils/utils", "calculation/calculateTip", "calculation/calculateTotalBill", "validation/validation"], function (require, exports, DOM, inputsObj_4, resetBtn_1, utils_4, calculateTip_3, calculateTotalBill_2, validation_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // ------------------------
    calculateTip_3.showTipPerPerson();
    calculateTotalBill_2.showTotalBillPerPerson();
    resetBtn_1.disableResetBtn();
    // ------------------------
    // update values
    function updatePeople() {
        inputsObj_4.default.noOfPeople = parseInt(DOM.PEOPLE_INPUT.value) || 0;
    }
    function updateBill() {
        inputsObj_4.default.bill = parseFloat(DOM.BILL_INPUT.value) || 0;
    }
    function updateTipPercent(event) {
        const clickedElmPercent = event.target?.getAttribute('data-percent');
        inputsObj_4.default.tipInPercent = parseFloat(clickedElmPercent);
    }
    function updateCustomTipPercent() {
        inputsObj_4.default.tipInPercent = parseFloat(DOM.CUSTOM_TIP_PERCENT_INPUT.value) || 0;
    }
    // ------------------------
    // Event listeners
    DOM.PEOPLE_INPUT?.addEventListener('input', (event) => {
        updatePeople();
        validation_4.showErrorMsgOnPeopleInput(); // to show error if invalid
        resetBtn_1.disableResetBtn();
    });
    DOM.PEOPLE_INPUT?.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            updatePeople();
            calculateTip_3.showTipPerPerson();
            calculateTotalBill_2.showTotalBillPerPerson();
            validation_4.showErrorMsgOnPeopleInput();
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
            utils_4.removeBtnActive(DOM.TIP_PERCENT_BTNS);
            utils_4.setBtnActive(percentBtn, true);
            resetBtn_1.disableResetBtn();
        });
    });
    DOM.CUSTOM_TIP_PERCENT_INPUT?.addEventListener('input', (event) => {
        updateCustomTipPercent();
        utils_4.removeBtnActive(DOM.TIP_PERCENT_BTNS);
        resetBtn_1.disableResetBtn();
    });
    DOM.CUSTOM_TIP_PERCENT_INPUT?.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            updateCustomTipPercent();
            calculateTip_3.showTipPerPerson();
            calculateTotalBill_2.showTotalBillPerPerson();
            utils_4.removeBtnActive(DOM.TIP_PERCENT_BTNS);
            resetBtn_1.disableResetBtn();
        }
    });
    DOM.RESET_BTN?.addEventListener('click', () => {
        resetBtn_1.resetInputs();
        updateBill();
        updatePeople();
        validation_4.hideErrorMsg();
        utils_4.removeBtnActive(DOM.TIP_PERCENT_BTNS);
        resetBtn_1.disableResetBtn();
    });
});
//# sourceMappingURL=index.js.map