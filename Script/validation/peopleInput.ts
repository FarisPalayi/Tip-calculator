import * as DOM from '../dom'


function isInteger(str: string): boolean {
  return parseFloat(str) === parseInt(str);
}

export function isPeopleInputValid(): boolean {
  const peopleInputAsANumber: number = parseInt(DOM.PEOPLE_INPUT!.value);
  return !isNaN(peopleInputAsANumber) && peopleInputAsANumber > 0 && isInteger(DOM.PEOPLE_INPUT!.value);
}

function errorMsgs(val: string, errorElm: HTMLElement): void {
  const valueAsANumber = parseFloat(val);
  if (val === '') {
    errorElm!.innerText = 'Can\'t be empty';
  } else if ( valueAsANumber < 0 ) {
    errorElm!.innerText = 'Should be greater than zero';
  } else if ( valueAsANumber === 0 ) {
    errorElm!.innerText = 'Can\'t be zero';
  } else if ( val.includes('.') ) {
    errorElm!.innerText = 'Should be an integer';
  } else {
    errorElm!.innerText = 'invalid input'
  }
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