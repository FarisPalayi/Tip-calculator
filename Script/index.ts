/**
 * @author Faris P
 * @license MIT
 * @description a basic tip calculator
 */

// -------------------------
// elements

const billInput: HTMLInputElement | null = document.querySelector('input[name=bill]');
const billPercentBtns: NodeListOf<HTMLButtonElement> | null = document.querySelectorAll('.card__section__btns-wrapper__btn');
const tipAmountElm: HTMLSpanElement | null = document.querySelector('.card__section__container--tip .card__section__container__amount');
const totalBillElm: HTMLSpanElement | null = document.querySelector('.card__section__container--total .card__section__container__amount');
const peopleInput: HTMLInputElement | null = document.querySelector('input[name=people]');
const customTipPercentInput: HTMLInputElement | null = document.querySelector('input[name=custom]');

// -------------------------
// vars

let bill: number = parseFloat(billInput!.value) || 0;
let tipInPercent: number = .15; // initial value
let people: number = parseInt(peopleInput!.value) || 1;

// -------------------------
// updagte variable values

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
// 

function calculateTip(): number {
  return bill * tipInPercent / 100;
}

function calculateTipPerPerson(): number {
  return calculateTip() / people;
}

function prependDollarSign(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

function showTipPerPerson(): void {
  tipAmountElm!.innerHTML = prependDollarSign(calculateTipPerPerson()) || '$0.00';
}

showTipPerPerson();

// -------------------------
// 

function calculateTotalBill(): number {
  return bill + calculateTip();
}

function calculateTotalBillPerPerson(): number {
  return calculateTotalBill() / people;
}

function showTotalBillPerPerson(): void {
  totalBillElm!.innerHTML = prependDollarSign(calculateTotalBillPerPerson()) || '$0.00';
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
// 

billInput?.addEventListener('input', (): void => {
  updateBill();
  showTipPerPerson();
  showTotalBillPerPerson();
});

billPercentBtns?.forEach((percentBtn: HTMLButtonElement): void => {
  percentBtn.addEventListener('click', (event: Event): void => {
    updateTipPercent(event);
    showTipPerPerson();
    showTotalBillPerPerson();
    removeBtnActive();
    setBtnActive(percentBtn, true);
  });
});

customTipPercentInput?.addEventListener('input', (): void => {
  updateCustomTipPercent();
  showTipPerPerson();
  showTotalBillPerPerson();
  removeBtnActive();
});

peopleInput?.addEventListener('input', (): void => {
  updatePeople();
  showTipPerPerson();
  showTotalBillPerPerson();
  validate();
});

// -------------------------
// resets the inputs

const reset: HTMLButtonElement | null = document.querySelector('.card__section__reset-btn');

reset?.addEventListener('click', resetInputs);

function resetInputs(): void {
  billInput!.value = '0';
  peopleInput!.value = '0';
  customTipPercentInput!.value = '0';
  tipAmountElm!.innerHTML = '$0.00';
  totalBillElm!.innerHTML = '$0.00';
}

// -------------------------
// validation

const errorElm: HTMLSpanElement | null = document.querySelector('.card__section__error');

function isValidInputs(): boolean {
  const peopleInputAsANumber: number = parseInt(peopleInput!.value);
  return !isNaN(peopleInputAsANumber) && peopleInputAsANumber > 0;
}

function showError(): void {
  errorElm?.setAttribute('aria-hidden', 'false');
  errorElm!.classList.add('card__section__error--visible');
}

function hideError(): void {
  errorElm!.setAttribute('aria-hidden', 'true');
  errorElm!.classList.remove('card__section__error--visible');
}

function validate(): void {
  if (isValidInputs()) {
    hideError();
    console.log(true)
  } else {
    showError();
    console.log(false)
  }
}