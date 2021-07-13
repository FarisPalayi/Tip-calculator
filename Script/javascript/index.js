define("animations", ["require", "exports"], function (require, exports) {
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
define("index", ["require", "exports", "animations"], function (require, exports, animations_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const billInput = document.querySelector('input[name=bill]');
    const billPercentBtns = document.querySelectorAll('.card__section__btns-wrapper__btn');
    const tipAmountElm = document.querySelector('.card__section__container--tip .card__section__container__amount');
    const totalBillElm = document.querySelector('.card__section__container--total .card__section__container__amount');
    const peopleInput = document.querySelector('input[name=people]');
    const customTipPercentInput = document.querySelector('input[name=custom]');
    let bill = parseFloat(billInput.value);
    let tipInPercent = .15;
    let people = parseInt(peopleInput.value);
    function updateBill() {
        bill = parseFloat(billInput.value) || 0;
    }
    function updateTipPercent(event) {
        const clickedElmPercent = event.target?.getAttribute('data-percent');
        tipInPercent = parseFloat(clickedElmPercent);
    }
    function updateCustomTipPercent() {
        tipInPercent = parseFloat(customTipPercentInput.value) || 0;
    }
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
        return `$${amount.toFixed(2)}`;
    }
    function isTipAmountValid() {
        const calculatedTipAmount = calculateTipPerPerson();
        return !isNaN(calculatedTipAmount) && isFinite(calculatedTipAmount) && calculatedTipAmount > 0;
    }
    function showTipPerPerson() {
        if (isTipAmountValid()) {
            tipAmountElm.innerText = prependDollarSign(calculateTipPerPerson());
        }
        else {
            tipAmountElm.innerText = prependDollarSign(0);
        }
    }
    showTipPerPerson();
    function calculateTotalBill() {
        return bill + calculateTip();
    }
    function calculateTotalBillPerPerson() {
        return calculateTotalBill() / people;
    }
    function isBillAmountValid() {
        const calculatedTotalBillAmount = calculateTotalBillPerPerson();
        return !isNaN(calculatedTotalBillAmount) && isFinite(calculatedTotalBillAmount) && calculatedTotalBillAmount > 0;
    }
    function showTotalBillPerPerson() {
        if (isBillAmountValid()) {
            totalBillElm.innerHTML = prependDollarSign(calculateTotalBillPerPerson());
        }
        else {
            totalBillElm.innerText = prependDollarSign(0);
        }
    }
    showTotalBillPerPerson();
    function setBtnActive(element, active) {
        const btnActiveClass = 'card__section__btns-wrapper__btn--active';
        element.classList.toggle(btnActiveClass, active);
    }
    function removeBtnActive() {
        billPercentBtns?.forEach((percentBtn) => {
            setBtnActive(percentBtn, false);
        });
    }
    billInput?.addEventListener('input', () => {
        updateBill();
        showTipPerPerson();
        showTotalBillPerPerson();
        disableResetBtnIfInputsAreInvalid();
    });
    billPercentBtns?.forEach((percentBtn) => {
        percentBtn.addEventListener('click', (event) => {
            updateTipPercent(event);
            showTipPerPerson();
            showTotalBillPerPerson();
            removeBtnActive();
            setBtnActive(percentBtn, true);
            disableResetBtnIfInputsAreInvalid();
        });
    });
    customTipPercentInput?.addEventListener('input', () => {
        updateCustomTipPercent();
        showTipPerPerson();
        showTotalBillPerPerson();
        removeBtnActive();
        disableResetBtnIfInputsAreInvalid();
    });
    peopleInput?.addEventListener('input', () => {
        updatePeople();
        showTipPerPerson();
        showTotalBillPerPerson();
        validatePeopleInput();
        disableResetBtnIfInputsAreInvalid();
    });
    const resetBtn = document.querySelector('.card__section__reset-btn');
    resetBtn?.addEventListener('click', resetInputs);
    function resetInputs() {
        billInput.value = '0';
        peopleInput.value = '1';
        customTipPercentInput.value = '';
        tipAmountElm.innerHTML = '$0.00';
        totalBillElm.innerHTML = '$0.00';
        tipInPercent = 0;
        updateBill();
        updatePeople();
        hideErrorMsg();
        removeBtnActive();
        disableResetBtnIfInputsAreInvalid();
    }
    function disableResetBtnIfInputsAreInvalid() {
        setTimeout(() => {
            const isInputsAreInvalid = !isBillAmountValid() || !isTipAmountValid() || !isPeopleInputValid();
            resetBtn.disabled = isInputsAreInvalid;
            if (isInputsAreInvalid) {
                resetBtn?.classList.add('card__section__reset-btn--disabled');
            }
            else {
                resetBtn?.classList.remove('card__section__reset-btn--disabled');
            }
        }, 200);
    }
    disableResetBtnIfInputsAreInvalid();
    const errorElm = document.querySelector('.card__section__error');
    function isPeopleInputValid() {
        const peopleInputAsANumber = parseInt(peopleInput.value);
        return !isNaN(peopleInputAsANumber) && peopleInputAsANumber > 0;
    }
    function showErrorMsg() {
        errorElm.style.display = 'block';
        errorElm?.classList.add('card__section__error--visible');
    }
    function hideErrorMsg() {
        errorElm.style.display = 'none';
        errorElm?.classList.remove('card__section__error--visible');
    }
    function setPeopleInputValid() {
        peopleInput?.setCustomValidity('');
    }
    function setPeopleInputInvalid() {
        peopleInput?.setCustomValidity('Please enter a number greater than 0');
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
    const name = "fade-in";
    const duration = 0;
    const delay = 0;
    const easing = "ease-in";
    const animation = new animations_1.default(name, duration, delay, easing);
    console.log(animation.toString());
    console.log(animation.clone().toString());
});
//# sourceMappingURL=index.js.map