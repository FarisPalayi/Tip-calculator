import * as DOM from './dom'

interface inputsInterface {
  bill: number,
  tipInPercent: number,
  noOfPeople: number,
}

export let inputsObj: inputsInterface = {
  bill: parseFloat(DOM.BILL_INPUT!.value),
  tipInPercent: .15,
  noOfPeople: parseInt(DOM.PEOPLE_INPUT!.value),
}