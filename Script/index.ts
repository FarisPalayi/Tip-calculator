/**
 * @author Faris P
 * @license MIT
 * @description a basic tip calculator
 */

import * as DOM from './dom'
import { inputsObj } from './inputsObj'
import { resetInputs, disableResetBtn } from './resetBtn'
import { removeBtnActive, setBtnActive } from './utils/utils';
import { showTipPerPerson } from './calculation/calculateTip';
import { showTotalBillPerPerson } from './calculation/calculateTotalBill';
import { hideErrorMsg, validatePeopleInput } from './validation/validation'

showTipPerPerson();
showTotalBillPerPerson();
disableResetBtn();

// ------------------------
// update values

function updatePeople(): void {
  inputsObj.noOfPeople = parseInt(DOM.PEOPLE_INPUT!.value) || 0;
}

function updateBill(): void {
  inputsObj.bill = parseFloat(DOM.BILL_INPUT!.value) || 0;
}

function updateTipPercent(event: Event): void {
  const clickedElmPercent = (event.target as HTMLButtonElement | HTMLInputElement)?.getAttribute('data-percent');
  inputsObj.tipInPercent = parseFloat(clickedElmPercent!);
}

function updateCustomTipPercent(): void {
  inputsObj.tipInPercent = parseFloat(DOM.CUSTOM_TIP_PERCENT_INPUT!.value) || 0;
}

// ------------------------
// Event listeners


DOM.PEOPLE_INPUT?.addEventListener('input', (event: Event): void => {
  updatePeople();
  validatePeopleInput(); // to show error if invalid
  disableResetBtn();
})

DOM.PEOPLE_INPUT?.addEventListener('keydown', (event: KeyboardEvent): void => {
  if (event.key === 'Enter') {
    updatePeople();
    showTipPerPerson();
    showTotalBillPerPerson();
    validatePeopleInput();
    disableResetBtn();
  }
});


DOM.BILL_INPUT?.addEventListener('input', (): void => {
  updateBill();
  disableResetBtn();
})

DOM.BILL_INPUT?.addEventListener('keydown', (event: KeyboardEvent): void => {
  if (event.key === 'Enter') {
    updatePeople();
    showTipPerPerson();
    showTotalBillPerPerson();
    disableResetBtn();
  }
});


DOM.TIP_PERCENT_BTNS?.forEach((percentBtn: HTMLButtonElement): void => {
  percentBtn.addEventListener('click', (event: Event): void => {
    updateTipPercent(event);
    showTipPerPerson();
    showTotalBillPerPerson();
    removeBtnActive(DOM.TIP_PERCENT_BTNS!);
    setBtnActive(percentBtn, true);
    disableResetBtn();
  });
});

DOM.CUSTOM_TIP_PERCENT_INPUT?.addEventListener('input', (event: Event): void => {
  updateCustomTipPercent();
  removeBtnActive(DOM.TIP_PERCENT_BTNS!);
  disableResetBtn();
})

DOM.CUSTOM_TIP_PERCENT_INPUT?.addEventListener('keydown', (event: KeyboardEvent): void => {
  if (event.key === 'Enter') {
    updateCustomTipPercent();
    showTipPerPerson();
    showTotalBillPerPerson();
    removeBtnActive(DOM.TIP_PERCENT_BTNS!);
    disableResetBtn();
  }
});

DOM.RESET_BTN?.addEventListener('click', (): void => {
  resetInputs();
  updateBill();
  updatePeople();
  hideErrorMsg();
  removeBtnActive(DOM.TIP_PERCENT_BTNS!);
  disableResetBtn();
});