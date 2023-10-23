import * as DOM from './dom'
import inputsObj from './inputsObj'
import { isBillAmountValid, isPeopleInputValid, isTipAmountValid } from './validation/validation';

/**
 * 1. resets the input values
 * 2. resets inputsObj object values
 * 3. reset the tip and totalbill result values to '$0.00'
*/
function resetInputs(): void {
  DOM.BILL_INPUT!.value = ''
  DOM.CUSTOM_TIP_PERCENT_INPUT!.value = ''
  DOM.PEOPLE_INPUT!.value = ''

  inputsObj.bill = 0
  inputsObj.noOfPeople = 0
  inputsObj.tipInPercent = 0

  DOM.TIP_AMT!.innerText = '$0.00'
  DOM.TOTAL_BILL_AMT!.innerText = '$0.00'
}


/**
 * Disable reset button if the input values are invalid
 */
function disableResetBtn(): void {
  const btnDisableDelay = 200;
  setTimeout((): void => {
    const areInputsInvalid: boolean = !isBillAmountValid() || !isTipAmountValid() || !isPeopleInputValid();

    DOM.RESET_BTN!.disabled = areInputsInvalid;

    if (areInputsInvalid)
      DOM.RESET_BTN?.classList.add('card__section__reset-btn--disabled');
    else
      DOM.RESET_BTN?.classList.remove('card__section__reset-btn--disabled');

  }, btnDisableDelay); // to give btn disabling and style changes a bit delay
}


export { resetInputs ,disableResetBtn }