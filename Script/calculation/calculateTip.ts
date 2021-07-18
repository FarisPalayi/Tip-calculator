import { TIP_AMT } from '../dom'
import { inputsObj } from "../inputsObj";
import { prependDollarSign } from "../utils/utils";
import { isTipAmountValid } from '../validation/validation';

/**
 * Calculate tip using the bill, tip percent values
*/

function calculateTip(): number {
  return inputsObj.bill * inputsObj.tipInPercent / 100;
}

/**
 * Calculate tip per person by dividing the no.of people with total bill.
 * Total bill is obtained by using {@link calculateTip} function
*/

function calculateTipPerPerson(): number {
  return calculateTip() / inputsObj.noOfPeople;
}

/**
 * Shows the tip per person value (in dollars)
*/

function showTipPerPerson(): void {
  if (isTipAmountValid())
    TIP_AMT!.innerText = prependDollarSign(calculateTipPerPerson());
  else
    TIP_AMT!.innerText = prependDollarSign(0);
}

export { calculateTip, calculateTipPerPerson, showTipPerPerson }