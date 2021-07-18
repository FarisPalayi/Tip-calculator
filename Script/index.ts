/**
 * @author Faris P
 * @license MIT
 * @description a basic tip calculator
 */

import { inputs, results } from './inputsOutputObj'
import { updateBill } from './bill'
import { updatePeople } from './people'
import { resetInputs, disableResetBtnIfInputsAreInvalid } from './resetBtn'
import { prependDollarSign } from './utils/utils';
import { calculateTip, calculateTipPerPerson, showTipPerPerson } from './calculation/calculateTip';
import { calculateTotalBillPerPerson, showTotalBillPerPerson } from './calculation/calculateTotalBill';
import { showResults } from './showResult'
import { updateCustomTipPercent, updateTipPercent } from './tip'
import { isBillAmountValid } from './validation/billInput'
import { hideErrorMsg, isPeopleInputValid, validatePeopleInput } from './validation/peopleInput'
import { isTipAmountValid } from './validation/tipIntput'

showTipPerPerson();
showTotalBillPerPerson();