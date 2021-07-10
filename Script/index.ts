/**
 * @author Faris P
 * @license MIT
 * @description basic tip calculator
 */

const billInput: HTMLInputElement | null = document.querySelector('input[name=bill]');
const billPercentBtns: NodeListOf<Element> | null = document.querySelectorAll('.card__section__btns-wrapper__btn');
const tipAmountElm: HTMLSpanElement | null = document.querySelector('.card__section__container--tip .card__section__container__amount');
const totalBillElm: HTMLSpanElement | null = document.querySelector('.card__section__container--total .card__section__container__amount');
const peopleInput: HTMLInputElement | null = document.querySelector('input[name=people]');
const customTipPercentInput: HTMLInputElement | null = document.querySelector('input[name=custom]');

// -------------------------

let bill: number = parseFloat(billInput!.value) || 0;
let tipInPercent: number = 0;
let people: number = parseInt(peopleInput!.value) || 0;

billPercentBtns?.forEach((percentBtn: Element): void => {
  percentBtn.addEventListener('click', (event: Event): void => {
    updateTipPercent(event);
    showTipPerPerson();
    showTotalBillPerPerson();
    removeBtnActive();
    setBtnActive(percentBtn, true);
  });
});

function updateCustomInputDataPercent(event: Event): void {
}

function updateTipPercent(event: Event): void {
  const clickedElmPercent = (event.target as HTMLButtonElement | HTMLInputElement)?.getAttribute('data-percent');
  tipInPercent = parseFloat(clickedElmPercent!);
}

function setBtnActive(element: Element, active: boolean): void {
  const btnActiveClass = 'card__section__btns-wrapper__btn--active'
  element.classList.toggle(btnActiveClass, active);
}

function removeBtnActive(): void {
  billPercentBtns?.forEach((percentBtn: Element): void => {
    setBtnActive(percentBtn, false);
  });
}

billInput?.addEventListener('input', (): void => {
  updateBill();
  showTipPerPerson();
  showTotalBillPerPerson();
});

function updateBill(): void {
  bill = parseFloat(billInput!.value) || 50;
}

peopleInput?.addEventListener('input', (): void => {
  updatePeople();
  showTipPerPerson();
  showTotalBillPerPerson();
});

function updatePeople(): void {
  people = parseInt(peopleInput!.value) || 0;
}

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
  tipAmountElm!.innerHTML = prependDollarSign(calculateTipPerPerson());
}

function calculateTotalBill(): number {
  return bill + calculateTip();
}

function calculateTotalBillPerPerson(): number {
  return calculateTotalBill() / people;
}

function showTotalBillPerPerson(): void {
  totalBillElm!.innerHTML = prependDollarSign(calculateTotalBillPerPerson());
}

showTipPerPerson();
showTotalBillPerPerson();

// -------------------------