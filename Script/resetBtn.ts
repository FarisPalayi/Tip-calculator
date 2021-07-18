import * as DOM from './dom'
import { inputs, results } from './inputsOutputObj'
import { updateBill } from './bill'
import { updatePeople } from './people';
import { removeBtnActive } from './utils/utils';
import { isBillAmountValid } from './validation/billInput';
import { isTipAmountValid } from './validation/tipIntput';
import { hideErrorMsg, isPeopleInputValid } from './validation/peopleInput';


export function resetInputs(): void {
  DOM.BILL_INPUT!.value = '0';
  DOM.PEOPLE_INPUT!.value = '1';
  DOM.CUSTOM_TIP_PERCENT_INPUT!.value = '';
  DOM.TIP_AMT!.innerHTML = '$0.00';
  DOM.TOTAL_BILL_AMT!.innerHTML = '$0.00';
  inputs.tipInPercent = 0;
  updateBill();
  updatePeople();
  hideErrorMsg();
  removeBtnActive(DOM.TIP_PERCENT_BTNS!);
  disableResetBtnIfInputsAreInvalid();
}


export function disableResetBtnIfInputsAreInvalid(): void {
  setTimeout((): void => {
    const isInputsAreInvalid: boolean = !isBillAmountValid() || !isTipAmountValid() || !isPeopleInputValid();
    DOM.RESET_BTN!.disabled = isInputsAreInvalid;
    if (isInputsAreInvalid) {
      DOM.RESET_BTN?.classList.add('card__section__reset-btn--disabled');
    } else {
      DOM.RESET_BTN?.classList.remove('card__section__reset-btn--disabled');
    }    
  }, 200); // to give btn disabling and style changes a bit delay
}

DOM.RESET_BTN?.addEventListener('click', resetInputs);



disableResetBtnIfInputsAreInvalid();