import { TIP_AMT } from '../dom'
import { inputs } from "../inputsOutputObj";
import { prependDollarSign } from "../utils/utils";
import { isTipAmountValid } from "../validation/tipIntput";

export function calculateTip(): number {
  return inputs.bill * inputs.tipInPercent / 100;
}

export function calculateTipPerPerson(): number {
  return calculateTip() / inputs.noOfPeople;
}

export function showTipPerPerson(): void {
  if (isTipAmountValid()) {
    TIP_AMT!.innerText = prependDollarSign(calculateTipPerPerson());
  } else {
    TIP_AMT!.innerText = prependDollarSign(0);
  }
}