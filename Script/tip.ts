import { showTipPerPerson } from './calculation/calculateTip';
import { showTotalBillPerPerson } from './calculation/calculateTotalBill';
import * as DOM from './dom'
import { inputs } from './inputsOutputObj';
import { disableResetBtnIfInputsAreInvalid } from './resetBtn';
import { removeBtnActive, setBtnActive } from './utils/utils';

export function updateTipPercent(event: Event): void {
  const clickedElmPercent = (event.target as HTMLButtonElement | HTMLInputElement)?.getAttribute('data-percent');
  inputs.tipInPercent = parseFloat(clickedElmPercent!);
}


export function updateCustomTipPercent(): void {
  inputs.tipInPercent = parseFloat(DOM.CUSTOM_TIP_PERCENT_INPUT!.value) || 0;
}

DOM.TIP_PERCENT_BTNS?.forEach((percentBtn: HTMLButtonElement): void => {
  percentBtn.addEventListener('click', (event: Event): void => {
    updateTipPercent(event);
    showTipPerPerson();
    showTotalBillPerPerson();
    removeBtnActive(DOM.TIP_PERCENT_BTNS!);
    setBtnActive(percentBtn, true);
    disableResetBtnIfInputsAreInvalid();
  });
});

DOM.CUSTOM_TIP_PERCENT_INPUT?.addEventListener('input', (event: Event): void => {
  updateCustomTipPercent();
  removeBtnActive(DOM.TIP_PERCENT_BTNS!);
  disableResetBtnIfInputsAreInvalid();
})

DOM.CUSTOM_TIP_PERCENT_INPUT?.addEventListener('keydown', (event: KeyboardEvent): void => {
  if (event.key === 'Enter') {
    updateCustomTipPercent();
    showTipPerPerson();
    showTotalBillPerPerson();
    removeBtnActive(DOM.TIP_PERCENT_BTNS!);
    disableResetBtnIfInputsAreInvalid();
  }
});