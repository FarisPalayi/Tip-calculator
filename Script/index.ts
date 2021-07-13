/**
 * @author Faris P
 * @license MIT
 * @description a basic tip calculator
 */

// -------------------------
// grab the dom elements

const billInput: HTMLInputElement | null = document.querySelector('input[name=bill]');
const billPercentBtns: NodeListOf<HTMLButtonElement> | null = document.querySelectorAll('.card__section__btns-wrapper__btn');
const tipAmountElm: HTMLSpanElement | null = document.querySelector('.card__section__container--tip .card__section__container__amount');
const totalBillElm: HTMLSpanElement | null = document.querySelector('.card__section__container--total .card__section__container__amount');
const peopleInput: HTMLInputElement | null = document.querySelector('input[name=people]');
const customTipPercentInput: HTMLInputElement | null = document.querySelector('input[name=custom]');

// -------------------------
// global variables

let bill: number = parseFloat(billInput!.value);
let tipInPercent: number = .15; // initial value
let people: number = parseInt(peopleInput!.value);

// -------------------------
// update variable values

function updateBill(): void {
  bill = parseFloat(billInput!.value) || 0;
}

function updateTipPercent(event: Event): void {
  const clickedElmPercent = (event.target as HTMLButtonElement | HTMLInputElement)?.getAttribute('data-percent');
  tipInPercent = parseFloat(clickedElmPercent!);
}

function updateCustomTipPercent(): void {
  tipInPercent = parseFloat(customTipPercentInput!.value) || 0;
}

function updatePeople(): void {
  people = parseInt(peopleInput!.value) || 0;
}

// -------------------------
// calculate tip

function calculateTip(): number {
  return bill * tipInPercent / 100;
}

function calculateTipPerPerson(): number {
  return calculateTip() / people;
}

function prependDollarSign(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

// validate tip

function isTipAmountValid(): boolean {
  const calculatedTipAmount: number = calculateTipPerPerson();
  return !isNaN(calculatedTipAmount) && isFinite(calculatedTipAmount) && calculatedTipAmount > 0;
}

// show tip

function showTipPerPerson(): void {
  if (isTipAmountValid()) {
    tipAmountElm!.innerText = prependDollarSign(calculateTipPerPerson());
  } else {
    tipAmountElm!.innerText = prependDollarSign(0);
  }
}

showTipPerPerson();

// -------------------------
// calculate total bill

function calculateTotalBill(): number {
  return bill + calculateTip();
}

function calculateTotalBillPerPerson(): number {
  return calculateTotalBill() / people;
}

// validate total bill

function isBillAmountValid(): boolean {
  const calculatedTotalBillAmount: number = calculateTotalBillPerPerson();
  return !isNaN(calculatedTotalBillAmount) && isFinite(calculatedTotalBillAmount) && calculatedTotalBillAmount > 0;
}
// show total bill

function showTotalBillPerPerson(): void {
  if(isBillAmountValid()) {
    totalBillElm!.innerHTML = prependDollarSign(calculateTotalBillPerPerson());
  } else {
    totalBillElm!.innerText =  prependDollarSign(0);
  }
}

showTotalBillPerPerson();

// -------------------------

function setBtnActive(element: Element, active: boolean): void {
  const btnActiveClass = 'card__section__btns-wrapper__btn--active'
  element.classList.toggle(btnActiveClass, active);
}

function removeBtnActive(): void {
  billPercentBtns?.forEach((percentBtn: Element): void => {
    setBtnActive(percentBtn, false);
  });
}

// -------------------------
// event listeners

billInput?.addEventListener('input', (): void => {
  updateBill();
  showTipPerPerson();
  showTotalBillPerPerson();
  disableResetBtnIfInputsAreInvalid();
});

billPercentBtns?.forEach((percentBtn: HTMLButtonElement): void => {
  percentBtn.addEventListener('click', (event: Event): void => {
    updateTipPercent(event);
    showTipPerPerson();
    showTotalBillPerPerson();
    removeBtnActive();
    setBtnActive(percentBtn, true);
    disableResetBtnIfInputsAreInvalid();
  });
});

customTipPercentInput?.addEventListener('input', (): void => {
  updateCustomTipPercent();
  showTipPerPerson();
  showTotalBillPerPerson();
  removeBtnActive();
  disableResetBtnIfInputsAreInvalid();
});

peopleInput?.addEventListener('input', (): void => {
  updatePeople();
  showTipPerPerson();
  showTotalBillPerPerson();
  validatePeopleInput();
  disableResetBtnIfInputsAreInvalid();
});

// -------------------------
// resets the inputs

const resetBtn: HTMLButtonElement | null = document.querySelector('.card__section__reset-btn');

resetBtn?.addEventListener('click', resetInputs);

function resetInputs(): void {
  billInput!.value = '0';
  peopleInput!.value = '1';
  customTipPercentInput!.value = '';
  tipAmountElm!.innerHTML = '$0.00';
  totalBillElm!.innerHTML = '$0.00';
  tipInPercent = 0;
  updateBill();
  updatePeople();
  hideErrorMsg();
  removeBtnActive();
  disableResetBtnIfInputsAreInvalid();
}

function disableResetBtnIfInputsAreInvalid(): void {
  setTimeout((): void => {
    const isInputsAreInvalid: boolean = !isBillAmountValid() || !isTipAmountValid() || !isPeopleInputValid();
    resetBtn!.disabled = isInputsAreInvalid;
    if (isInputsAreInvalid) {
      resetBtn?.classList.add('card__section__reset-btn--disabled');
    } else {
      resetBtn?.classList.remove('card__section__reset-btn--disabled');
    }    
  }, 200); // to give btn disabling and style changes a bit delay
}

disableResetBtnIfInputsAreInvalid();

// -------------------------
// validate the people input

const errorElm: HTMLSpanElement | null = document.querySelector('.card__section__error');

function isPeopleInputValid(): boolean {
  const peopleInputAsANumber: number = parseInt(peopleInput!.value);
  return !isNaN(peopleInputAsANumber) && peopleInputAsANumber > 0;
}

function showErrorMsg(): void {
  errorElm!.style.display = 'block';
  errorElm?.classList.add('card__section__error--visible');
}

function hideErrorMsg(): void {
  errorElm!.style.display = 'none';
  errorElm?.classList.remove('card__section__error--visible');
}

function setPeopleInputValid(): void {
  peopleInput?.setCustomValidity('');
}

function setPeopleInputInvalid(): void {
  peopleInput?.setCustomValidity('Please enter a number greater than 0');
}

function validatePeopleInput(): void {
  if (isPeopleInputValid()) {
    hideErrorMsg();
    setPeopleInputValid();
  } else {
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
// difference between aria-labelledby and aria-describedby
// https://www.w3.org/TR/wai-aria-1.1/#aria-labelledby

import Animation from "./animations";

const name : string = "fade-in";
const duration : number = 0;
const delay : number = 0;
const easing : string = "ease-in";

const animation = new Animation(name, duration, delay, easing);
console.log(animation.toString())
console.log(animation.clone().toString())