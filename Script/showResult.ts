import { TIP_AMT, TOTAL_BILL_AMT } from './dom'
import { results } from './inputsOutputObj'


export function showResults(): void {
  TIP_AMT!.innerText = results.tipInDollar
  TOTAL_BILL_AMT!.innerText = results.totalBillInDollar
}