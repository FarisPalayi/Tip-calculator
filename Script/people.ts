import { showTipPerPerson } from './calculation/calculateTip';
import { showTotalBillPerPerson } from './calculation/calculateTotalBill';
import * as DOM from './dom'
import { inputs, results } from './inputsOutputObj';
import { disableResetBtnIfInputsAreInvalid } from './resetBtn';
import { showResults } from './showResult';
import { validatePeopleInput } from './validation/peopleInput';

export function updatePeople(): void {
  inputs.noOfPeople = parseInt(DOM.PEOPLE_INPUT!.value) || 0;
}


DOM.PEOPLE_INPUT?.addEventListener('input', (event: Event): void => {
  updatePeople();
  validatePeopleInput(); // to show error if invalid
  disableResetBtnIfInputsAreInvalid();
})

DOM.PEOPLE_INPUT?.addEventListener('keydown', (event: KeyboardEvent): void => {
  if (event.key === 'Enter') {
    updatePeople();
    showTipPerPerson();
    showTotalBillPerPerson();
    validatePeopleInput();
    disableResetBtnIfInputsAreInvalid();
  }
});