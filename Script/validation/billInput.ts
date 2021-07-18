import { calculateTotalBillPerPerson } from "../calculation/calculateTotalBill";


export function isBillAmountValid(): boolean {
  const calculatedTotalBillAmount: number = calculateTotalBillPerPerson();
  return !isNaN(calculatedTotalBillAmount) && isFinite(calculatedTotalBillAmount) && calculatedTotalBillAmount > 0;
}