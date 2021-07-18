import * as DOM from './dom'

interface inputsInterface {
  bill: number,
  tipInPercent: number,
  noOfPeople: number,
}

interface resultsInterface {
  tipInDollar: string,
  totalBillInDollar: string,
}

export let inputs: inputsInterface = {
  bill: parseFloat(DOM.BILL_INPUT!.value),
  tipInPercent: .15,
  noOfPeople: parseInt(DOM.PEOPLE_INPUT!.value),
}

export let results: resultsInterface = {
  tipInDollar: '$0.00',
  totalBillInDollar: '$0.00',
}
