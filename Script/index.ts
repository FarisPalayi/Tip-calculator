const billInput: HTMLInputElement | null = document.querySelector('input[name=bill]');
const billPercentBtns: NodeListOf<Element> | null = document.querySelectorAll('.card__section__btns-wrapper__btn');
const tipAmountElm: HTMLSpanElement | null = document.querySelector('.card__section__container--tip .card__section__container__amount');
const totalBillElm: HTMLSpanElement | null = document.querySelector('.card__section__container--total .card__section__container__amount');
const peopleInput: HTMLInputElement | null = document.querySelector('input[name=people]');

let bill: number = parseFloat(billInput!.value) || 0;
let tipInPercent: number = 0;
let people: number = parseInt(peopleInput!.value) || 0;

billPercentBtns.forEach((percentBtn: Element) => {
  percentBtn.addEventListener('click', updateTipPercent);
  percentBtn.addEventListener('click', showTipPerPerson);
  percentBtn.addEventListener('click', showTotalBillPerPerson);
});

function updateTipPercent(event: Event): void {
  const clickedElmPercent = (event.target as HTMLButtonElement | HTMLInputElement)?.getAttribute('data-percent')
  tipInPercent = parseFloat(clickedElmPercent!);
}

billInput?.addEventListener('input', updateBill)

function updateBill(): void {
  bill = parseFloat(billInput!.value) || 50;
}

peopleInput?.addEventListener('input', updatePeople);

function updatePeople(): void {
  people = parseInt(peopleInput!.value) || 0;
}

function calculateTip(): number {
  return bill * tipInPercent / 100;
}

function calculateTipPerPerson(): number {
  return calculateTip() / people;
}

function showTipPerPerson(): void {
  tipAmountElm!.innerHTML = calculateTipPerPerson().toFixed(2);
}

function calculateTotalBill(): number {
  return bill + calculateTip();
}

function calculateTotalBillPerPerson(): number {
  return calculateTotalBill() / people;
}

function showTotalBillPerPerson(): void {
  totalBillElm!.innerHTML = calculateTotalBillPerPerson().toFixed(2);
}

showTipPerPerson();
showTotalBillPerPerson();