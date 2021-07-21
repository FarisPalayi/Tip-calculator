import { ERROR as ERROR_ELM, PEOPLE_INPUT } from '../dom'
import { calculateTipPerPerson } from '../calculation/calculateTip';
import { calculateTotalBillPerPerson } from '../calculation/calculateTotalBill';
import { isInteger } from '../utils/utils';


// TODO: add transitions to error text
// TODO: Change error message's color to red ✔
// there are repeated code in this file.

/**
 * Function to check if the input value is valid
*/
function isValidInput(num: number): boolean {
  return !isNaN(num) && isFinite(num) && num > 0;
}

/**
 * Checks if the calculated total bill per person is valid.
 * - Total bill per person is obtained by using the {@link calculateTotalBillPerPerson} function
 */
function isBillAmountValid(): boolean {
  return isValidInput(calculateTotalBillPerPerson());
}

/**
 * Checks if the calculated tip per person value is valid.
 * - Tip per person is obtained by using the {@link calculateTipPerPerson} function 
*/
function isTipAmountValid(): boolean {
  return isValidInput(calculateTipPerPerson())
}

/**
 * Checks if the people input value is valid.
*/
function isPeopleInputValid(): boolean {
  return isInteger(PEOPLE_INPUT!.value) && isValidInput(parseInt(PEOPLE_INPUT!.value));
}

/**
 * Prints error message based on some constraints.
 */
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

/**
 * Shows the error message on the people input
*/
function showErrorMsg(): void {
  errorMsgs(PEOPLE_INPUT!.value, ERROR_ELM!);
  ERROR_ELM!.style.display = 'block';
  ERROR_ELM?.classList.add('card__section__error--visible');
  setPeopleInputInvalid();
}

/**
 * Hides the error message on the people input 
*/
function hideErrorMsg(): void {
  ERROR_ELM?.classList.remove('card__section__error--visible');
  ERROR_ELM!.style.display = 'none';
  setPeopleInputValid();
}

/**
 * Sets the people input invalid.
 * So, that css :invalid pseudo-class will apply styles.
 */
function setPeopleInputValid(): void {
  PEOPLE_INPUT?.setCustomValidity('');
}

/**
 * Sets the people input invalid.
 * So that the css :invalid pseudo class won't apply styles.
*/
function setPeopleInputInvalid(): void {
  PEOPLE_INPUT?.setCustomValidity('Please enter a number greater than 0');
}

/**
 * Shows error message on people input's error element if the input is not valid.
*/
function showErrorMsgOnPeopleInput(): void {
  if (isPeopleInputValid()) hideErrorMsg();
  else showErrorMsg();
}


export { isBillAmountValid, isTipAmountValid, isPeopleInputValid, hideErrorMsg, showErrorMsgOnPeopleInput }