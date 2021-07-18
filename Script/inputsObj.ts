import { BILL_INPUT, PEOPLE_INPUT } from './dom'

interface inputsInterface {
  bill: number,
  tipInPercent: number,
  noOfPeople: number,
}

let inputsObj: inputsInterface = {
  bill: parseFloat(BILL_INPUT!.value),
  tipInPercent: .15,
  noOfPeople: parseInt(PEOPLE_INPUT!.value),
}

export default inputsObj