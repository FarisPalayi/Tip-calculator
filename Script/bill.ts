import { showTipPerPerson } from './calculation/calculateTip';
import { showTotalBillPerPerson } from './calculation/calculateTotalBill';
import * as DOM from './dom'
import { inputs, results } from './inputsOutputObj'
import { updatePeople } from './people';
import { disableResetBtnIfInputsAreInvalid } from './resetBtn'
import { showResults } from './showResult';
import { validatePeopleInput } from './validation/peopleInput';


export function updateBill(): void {
  inputs.bill = parseFloat(DOM.BILL_INPUT!.value) || 0;
}


DOM.BILL_INPUT?.addEventListener('input', (): void => {
  updateBill();
  disableResetBtnIfInputsAreInvalid();
})

DOM.BILL_INPUT?.addEventListener('keydown', (event: KeyboardEvent): void => {
  if (event.key === 'Enter') {
    updatePeople();
    showTipPerPerson();
    showTotalBillPerPerson();
    validatePeopleInput();
    disableResetBtnIfInputsAreInvalid();
  }
});