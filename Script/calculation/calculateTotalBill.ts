import { TOTAL_BILL_AMT } from '../dom'
import inputsObj from "../inputsObj";
import { prependDollarSign } from '../utils/utils';
import { isBillAmountValid, isPeopleInputValid, isTipAmountValid } from '../validation/validation';
import { calculateTip } from "./calculateTip";


/**
 * Returns total bill by adding bill and total tip amount.
 * - Total tip amount is obtained by using the {@link calculateTip} function
*/
function calculateTotalBill(): number {
  return inputsObj.bill + calculateTip();
}

/**
 * Returns total bill per person by dividing total bill by the no.of people.
 * - No.of people is obtained by using the {@link calculateTotalBill} function
*/
function calculateTotalBillPerPerson(): number {
  return calculateTotalBill() / inputsObj.noOfPeople;
}

/**
 * Shows the bill per person value (in dollars) if inputs are valid
 * - Checks validity by using the {@link isBillAmountValid} function
*/
function showTotalBillPerPerson(): void {
  if (isBillAmountValid() && isTipAmountValid() && isPeopleInputValid())
    TOTAL_BILL_AMT!.innerHTML = prependDollarSign(calculateTotalBillPerPerson());
  else
    TOTAL_BILL_AMT!.innerText =  prependDollarSign(0);
}


export { calculateTotalBill, calculateTotalBillPerPerson, showTotalBillPerPerson }