import { calculateTipPerPerson } from "../calculation/calculateTip";

export function isTipAmountValid(): boolean {
  const calculatedTipAmount: number = calculateTipPerPerson();
  return !isNaN(calculatedTipAmount) && isFinite(calculatedTipAmount) && calculatedTipAmount > 0;
}