define("../animations", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Animation {
        name;
        duration;
        delay;
        easing;
        constructor(name, duration, delay, easing) {
            this.name = name;
            this.duration = duration;
            this.delay = delay;
            this.easing = easing;
        }
        getName() {
            return this.name;
        }
        getDuration() {
            return this.duration;
        }
        getDelay() {
            return this.delay;
        }
        getEasing() {
            return this.easing;
        }
        setName(name) {
            this.name = name;
        }
        setDuration(duration) {
            this.duration = duration;
        }
        setDelay(delay) {
            this.delay = delay;
        }
        setEasing(easing) {
            this.easing = easing;
        }
        toString() {
            return `Animation: ${this.name} (${this.duration}s, ${this.delay}s, ${this.easing})`;
        }
        clone() {
            return new Animation(this.name, this.duration, this.delay, this.easing);
        }
        equals(other) {
            return this.name === other.name && this.duration === other.duration && this.delay === other.delay && this.easing === other.easing;
        }
        static parse(animation) {
            const [name, duration, delay, easing] = animation.split(",");
            return new Animation(name, parseFloat(duration), parseFloat(delay), easing);
        }
        static parseArray(animations) {
            const parsedAnimations = [];
            for (let i = 0; i < animations.length; i++) {
                parsedAnimations.push(Animation.parse(animations[i]));
            }
            return parsedAnimations;
        }
        static parseFromObject(animation) {
            return new Animation(animation.name, animation.duration, animation.delay, animation.easing);
        }
        static parseArrayFromObject(animations) {
            const parsedAnimations = [];
            for (let i = 0; i < animations.length; i++) {
                parsedAnimations.push(Animation.parseFromObject(animations[i]));
            }
            return parsedAnimations;
        }
        static equals(animation1, animation2) {
            return animation1.name === animation2.name && animation1.duration === animation2.duration && animation1.delay === animation2.delay && animation1.easing === animation2.easing;
        }
        static clone(animation) {
            return Animation.parse(animation.toString());
        }
        static getEasingValues() {
            return ["linear", "ease", "ease-in", "ease-out", "ease-in-out"];
        }
        static getEasingValuesArray() {
            return ["linear", "ease", "ease-in", "ease-out", "ease-in-out"].map(easing => `${easing} (cubic-bezier(${easing}))`);
        }
        static getEasingValuesObject() {
            return Animation.getEasingValuesArray().reduce((acc, easing) => {
                acc[easing] = easing;
                return acc;
            }, {});
        }
        static getEasingValuesObjectArray() {
            return Animation.getEasingValuesArray().map(easing => ({ [easing]: easing }));
        }
        static getEasingValuesObjectArrayWithCubicBezier() {
            return Animation.getEasingValuesArray().map(easing => ({ [easing]: `${easing} (cubic-bezier(${easing}))` }));
        }
    }
    exports.default = Animation;
});
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
define("inputsOutputObj", ["require", "exports", "dom"], function (require, exports, DOM) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.results = exports.inputs = void 0;
    exports.inputs = {
        bill: parseFloat(DOM.BILL_INPUT.value),
        tipInPercent: .15,
        noOfPeople: parseInt(DOM.PEOPLE_INPUT.value),
    };
    exports.results = {
        tipInDollar: '$0.00',
        totalBillInDollar: '$0.00',
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
define("validation/tipIntput", ["require", "exports", "calculation/calculateTip"], function (require, exports, calculateTip_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isTipAmountValid = void 0;
    function isTipAmountValid() {
        const calculatedTipAmount = calculateTip_1.calculateTipPerPerson();
        return !isNaN(calculatedTipAmount) && isFinite(calculatedTipAmount) && calculatedTipAmount > 0;
    }
    exports.isTipAmountValid = isTipAmountValid;
});
define("calculation/calculateTip", ["require", "exports", "dom", "inputsOutputObj", "utils/utils", "validation/tipIntput"], function (require, exports, dom_1, inputsOutputObj_1, utils_1, tipIntput_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.showTipPerPerson = exports.calculateTipPerPerson = exports.calculateTip = void 0;
    function calculateTip() {
        return inputsOutputObj_1.inputs.bill * inputsOutputObj_1.inputs.tipInPercent / 100;
    }
    exports.calculateTip = calculateTip;
    function calculateTipPerPerson() {
        return calculateTip() / inputsOutputObj_1.inputs.noOfPeople;
    }
    exports.calculateTipPerPerson = calculateTipPerPerson;
    function showTipPerPerson() {
        if (tipIntput_1.isTipAmountValid()) {
            dom_1.TIP_AMT.innerText = utils_1.prependDollarSign(calculateTipPerPerson());
        }
        else {
            dom_1.TIP_AMT.innerText = utils_1.prependDollarSign(0);
        }
    }
    exports.showTipPerPerson = showTipPerPerson;
});
define("validation/billInput", ["require", "exports", "calculation/calculateTotalBill"], function (require, exports, calculateTotalBill_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isBillAmountValid = void 0;
    function isBillAmountValid() {
        const calculatedTotalBillAmount = calculateTotalBill_1.calculateTotalBillPerPerson();
        return !isNaN(calculatedTotalBillAmount) && isFinite(calculatedTotalBillAmount) && calculatedTotalBillAmount > 0;
    }
    exports.isBillAmountValid = isBillAmountValid;
});
define("calculation/calculateTotalBill", ["require", "exports", "dom", "inputsOutputObj", "utils/utils", "validation/billInput", "calculation/calculateTip"], function (require, exports, dom_2, inputsOutputObj_2, utils_2, billInput_1, calculateTip_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.showTotalBillPerPerson = exports.calculateTotalBillPerPerson = exports.calculateTotalBill = void 0;
    function calculateTotalBill() {
        return inputsOutputObj_2.inputs.bill + calculateTip_2.calculateTip();
    }
    exports.calculateTotalBill = calculateTotalBill;
    function calculateTotalBillPerPerson() {
        return calculateTotalBill() / inputsOutputObj_2.inputs.noOfPeople;
    }
    exports.calculateTotalBillPerPerson = calculateTotalBillPerPerson;
    function showTotalBillPerPerson() {
        if (billInput_1.isBillAmountValid()) {
            dom_2.TOTAL_BILL_AMT.innerHTML = utils_2.prependDollarSign(calculateTotalBillPerPerson());
        }
        else {
            dom_2.TOTAL_BILL_AMT.innerText = utils_2.prependDollarSign(0);
        }
    }
    exports.showTotalBillPerPerson = showTotalBillPerPerson;
});
define("validation/peopleInput", ["require", "exports", "dom"], function (require, exports, DOM) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.validatePeopleInput = exports.hideErrorMsg = exports.isPeopleInputValid = void 0;
    function isInteger(str) {
        return parseFloat(str) === parseInt(str);
    }
    function isPeopleInputValid() {
        const peopleInputAsANumber = parseInt(DOM.PEOPLE_INPUT.value);
        return !isNaN(peopleInputAsANumber) && peopleInputAsANumber > 0 && isInteger(DOM.PEOPLE_INPUT.value);
    }
    exports.isPeopleInputValid = isPeopleInputValid;
    function errorMsgs(val, errorElm) {
        const valueAsANumber = parseFloat(val);
        if (val === '') {
            errorElm.innerText = 'Can\'t be empty';
        }
        else if (valueAsANumber < 0) {
            errorElm.innerText = 'Should be greater than zero';
        }
        else if (valueAsANumber === 0) {
            errorElm.innerText = 'Can\'t be zero';
        }
        else if (val.includes('.')) {
            errorElm.innerText = 'Should be an integer';
        }
        else {
            errorElm.innerText = 'invalid input';
        }
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
define("resetBtn", ["require", "exports", "dom", "inputsOutputObj", "bill", "people", "utils/utils", "validation/billInput", "validation/tipIntput", "validation/peopleInput"], function (require, exports, DOM, inputsOutputObj_3, bill_1, people_1, utils_3, billInput_2, tipIntput_2, peopleInput_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.disableResetBtnIfInputsAreInvalid = exports.resetInputs = void 0;
    function resetInputs() {
        DOM.BILL_INPUT.value = '0';
        DOM.PEOPLE_INPUT.value = '1';
        DOM.CUSTOM_TIP_PERCENT_INPUT.value = '';
        DOM.TIP_AMT.innerHTML = '$0.00';
        DOM.TOTAL_BILL_AMT.innerHTML = '$0.00';
        inputsOutputObj_3.inputs.tipInPercent = 0;
        bill_1.updateBill();
        people_1.updatePeople();
        peopleInput_1.hideErrorMsg();
        utils_3.removeBtnActive(DOM.TIP_PERCENT_BTNS);
        disableResetBtnIfInputsAreInvalid();
    }
    exports.resetInputs = resetInputs;
    function disableResetBtnIfInputsAreInvalid() {
        setTimeout(() => {
            const isInputsAreInvalid = !billInput_2.isBillAmountValid() || !tipIntput_2.isTipAmountValid() || !peopleInput_1.isPeopleInputValid();
            DOM.RESET_BTN.disabled = isInputsAreInvalid;
            if (isInputsAreInvalid) {
                DOM.RESET_BTN?.classList.add('card__section__reset-btn--disabled');
            }
            else {
                DOM.RESET_BTN?.classList.remove('card__section__reset-btn--disabled');
            }
        }, 200);
    }
    exports.disableResetBtnIfInputsAreInvalid = disableResetBtnIfInputsAreInvalid;
    DOM.RESET_BTN?.addEventListener('click', resetInputs);
    disableResetBtnIfInputsAreInvalid();
});
define("showResult", ["require", "exports", "dom", "inputsOutputObj"], function (require, exports, dom_3, inputsOutputObj_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.showResults = void 0;
    function showResults() {
        dom_3.TIP_AMT.innerText = inputsOutputObj_4.results.tipInDollar;
        dom_3.TOTAL_BILL_AMT.innerText = inputsOutputObj_4.results.totalBillInDollar;
    }
    exports.showResults = showResults;
});
define("people", ["require", "exports", "calculation/calculateTip", "calculation/calculateTotalBill", "dom", "inputsOutputObj", "resetBtn", "validation/peopleInput"], function (require, exports, calculateTip_3, calculateTotalBill_2, DOM, inputsOutputObj_5, resetBtn_1, peopleInput_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.updatePeople = void 0;
    function updatePeople() {
        inputsOutputObj_5.inputs.noOfPeople = parseInt(DOM.PEOPLE_INPUT.value) || 0;
    }
    exports.updatePeople = updatePeople;
    DOM.PEOPLE_INPUT?.addEventListener('input', (event) => {
        updatePeople();
        peopleInput_2.validatePeopleInput();
        resetBtn_1.disableResetBtnIfInputsAreInvalid();
    });
    DOM.PEOPLE_INPUT?.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            updatePeople();
            calculateTip_3.showTipPerPerson();
            calculateTotalBill_2.showTotalBillPerPerson();
            peopleInput_2.validatePeopleInput();
            resetBtn_1.disableResetBtnIfInputsAreInvalid();
        }
    });
});
define("bill", ["require", "exports", "calculation/calculateTip", "calculation/calculateTotalBill", "dom", "inputsOutputObj", "people", "resetBtn", "validation/peopleInput"], function (require, exports, calculateTip_4, calculateTotalBill_3, DOM, inputsOutputObj_6, people_2, resetBtn_2, peopleInput_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.updateBill = void 0;
    function updateBill() {
        inputsOutputObj_6.inputs.bill = parseFloat(DOM.BILL_INPUT.value) || 0;
    }
    exports.updateBill = updateBill;
    DOM.BILL_INPUT?.addEventListener('input', () => {
        updateBill();
        resetBtn_2.disableResetBtnIfInputsAreInvalid();
    });
    DOM.BILL_INPUT?.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            people_2.updatePeople();
            calculateTip_4.showTipPerPerson();
            calculateTotalBill_3.showTotalBillPerPerson();
            peopleInput_3.validatePeopleInput();
            resetBtn_2.disableResetBtnIfInputsAreInvalid();
        }
    });
});
define("tip", ["require", "exports", "calculation/calculateTip", "calculation/calculateTotalBill", "dom", "inputsOutputObj", "resetBtn", "utils/utils"], function (require, exports, calculateTip_5, calculateTotalBill_4, DOM, inputsOutputObj_7, resetBtn_3, utils_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.updateCustomTipPercent = exports.updateTipPercent = void 0;
    function updateTipPercent(event) {
        const clickedElmPercent = event.target?.getAttribute('data-percent');
        inputsOutputObj_7.inputs.tipInPercent = parseFloat(clickedElmPercent);
    }
    exports.updateTipPercent = updateTipPercent;
    function updateCustomTipPercent() {
        inputsOutputObj_7.inputs.tipInPercent = parseFloat(DOM.CUSTOM_TIP_PERCENT_INPUT.value) || 0;
    }
    exports.updateCustomTipPercent = updateCustomTipPercent;
    DOM.TIP_PERCENT_BTNS?.forEach((percentBtn) => {
        percentBtn.addEventListener('click', (event) => {
            updateTipPercent(event);
            calculateTip_5.showTipPerPerson();
            calculateTotalBill_4.showTotalBillPerPerson();
            utils_4.removeBtnActive(DOM.TIP_PERCENT_BTNS);
            utils_4.setBtnActive(percentBtn, true);
            resetBtn_3.disableResetBtnIfInputsAreInvalid();
        });
    });
    DOM.CUSTOM_TIP_PERCENT_INPUT?.addEventListener('input', (event) => {
        updateCustomTipPercent();
        utils_4.removeBtnActive(DOM.TIP_PERCENT_BTNS);
        resetBtn_3.disableResetBtnIfInputsAreInvalid();
    });
    DOM.CUSTOM_TIP_PERCENT_INPUT?.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            updateCustomTipPercent();
            calculateTip_5.showTipPerPerson();
            calculateTotalBill_4.showTotalBillPerPerson();
            utils_4.removeBtnActive(DOM.TIP_PERCENT_BTNS);
            resetBtn_3.disableResetBtnIfInputsAreInvalid();
        }
    });
});
define("index", ["require", "exports", "calculation/calculateTip", "calculation/calculateTotalBill"], function (require, exports, calculateTip_6, calculateTotalBill_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    calculateTip_6.showTipPerPerson();
    calculateTotalBill_5.showTotalBillPerPerson();
});
//# sourceMappingURL=index.js.map