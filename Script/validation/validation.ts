import * as DOM from '../dom'
import { calculateTipPerPerson } from '../calculation/calculateTip';
import { calculateTotalBillPerPerson } from '../calculation/calculateTotalBill';

// TODO: add transition to error text, and change it's color
// ------------------------------
// validate bill input

export function isBillAmountValid(): boolean {
  const calculatedTotalBillAmount: number = calculateTotalBillPerPerson();
  return !isNaN(calculatedTotalBillAmount) && isFinite(calculatedTotalBillAmount) && calculatedTotalBillAmount > 0;
}

// ------------------------------
// validate tip input

export function isTipAmountValid(): boolean {
  const calculatedTipAmount: number = calculateTipPerPerson();
  return !isNaN(calculatedTipAmount) && isFinite(calculatedTipAmount) && calculatedTipAmount > 0;
}

// ------------------------------
// validate people input

function isInteger(str: string): boolean {
  return parseFloat(str) === parseInt(str);
}

export function isPeopleInputValid(): boolean {
  const peopleInputAsANumber: number = parseInt(DOM.PEOPLE_INPUT!.value);
  return !isNaN(peopleInputAsANumber) && peopleInputAsANumber > 0 && isInteger(DOM.PEOPLE_INPUT!.value);
}

function errorMsgs(elementText: string, errorElm: HTMLElement): void {
  const elementTextAsANumber = parseFloat(elementText);
  
  let showError = (errMsg: string) => errorElm!.innerText = errMsg 

  if (elementText === '')
    showError(`Can't be empty`)
  else if ( elementTextAsANumber < 0 )
    showError('Should be greater than zero')
  else if ( elementTextAsANumber === 0 )
    showError(`Can\'t be zero`)
  else if ( elementText.includes('.') )
    showError('Should be an integer')
  else
    showError('invalid input')
}

function showErrorMsg(): void {
  errorMsgs(DOM.PEOPLE_INPUT!.value, DOM.ERROR!);
  DOM.ERROR!.style.display = 'block';
  DOM.ERROR?.classList.add('card__section__error--visible');
}

export function hideErrorMsg(): void {
  DOM.ERROR!.style.display = 'none';
  DOM.ERROR?.classList.remove('card__section__error--visible');
}

function setPeopleInputValid(): void {
  DOM.PEOPLE_INPUT?.setCustomValidity('');
}

function setPeopleInputInvalid(): void {
  DOM.PEOPLE_INPUT?.setCustomValidity('Please enter a number greater than 0');
}

export function validatePeopleInput(): void {
  if (isPeopleInputValid()) {
    hideErrorMsg();
    setPeopleInputValid();
  } else {
    showErrorMsg();
    setPeopleInputInvalid();
  }
}