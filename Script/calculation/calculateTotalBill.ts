import { TOTAL_BILL_AMT } from '../dom'
import { inputs } from "../inputsOutputObj";
import { prependDollarSign } from '../utils/utils';
import { isBillAmountValid } from "../validation/billInput";
import { calculateTip } from "./calculateTip";


export function calculateTotalBill(): number {
  return inputs.bill + calculateTip();
}

export function calculateTotalBillPerPerson(): number {
  return calculateTotalBill() / inputs.noOfPeople;
}

export function showTotalBillPerPerson(): void {
  if(isBillAmountValid()) {
    TOTAL_BILL_AMT!.innerHTML = prependDollarSign(calculateTotalBillPerPerson());
  } else {
    TOTAL_BILL_AMT!.innerText =  prependDollarSign(0);
  }
}