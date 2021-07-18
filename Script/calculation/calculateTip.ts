import { TIP_AMT } from '../dom'
import inputsObj from "../inputsObj";
import { prependDollarSign } from "../utils/utils";
import { isTipAmountValid } from '../validation/validation';

// TODO: handle rounding errors

/**
 * Returns tip by using the bill, tip percent values
 * - bill and tip percent values are stored in the {@link inputsObj} object
*/
function calculateTip(): number {
  return inputsObj.bill * inputsObj.tipInPercent / 100;
}

/**
 * Returns tip per person by dividing the no.of people with total tip.
 * - Total bill is obtained by using the {@link calculateTip} function
*/
function calculateTipPerPerson(): number {
  return calculateTip() / inputsObj.noOfPeople;
}

/**
 * Shows the tip per person value (in dollars) if bill input value is valid
 * - Checks validity by using the {@link isTipAmountValid} function
*/
function showTipPerPerson(): void {
  if (isTipAmountValid())
    TIP_AMT!.innerText = prependDollarSign(calculateTipPerPerson());
  else
    TIP_AMT!.innerText = prependDollarSign(0);
}


export { calculateTip, calculateTipPerPerson, showTipPerPerson }