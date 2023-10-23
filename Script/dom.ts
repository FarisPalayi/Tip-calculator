const BILL_INPUT = document.querySelector<HTMLInputElement>('input[name=bill]')!

const TIP_PERCENT_BTNS: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.card__section__btns-wrapper__btn')!
const CUSTOM_TIP_PERCENT_INPUT = document.querySelector<HTMLInputElement>('input[name=custom]')!

const PEOPLE_INPUT = document.querySelector<HTMLInputElement>('input[name=people]')!

const TIP_AMT = document.querySelector<HTMLSpanElement>('.card__section__container--tip .card__section__container__amount')!
const TOTAL_BILL_AMT = document.querySelector<HTMLSpanElement>('.card__section__container--total .card__section__container__amount')!

const RESET_BTN = document.querySelector<HTMLButtonElement>('.card__section__reset-btn')!

const ERROR = document.querySelector<HTMLSpanElement>('.card__section__error')!

export {
  BILL_INPUT,
  TIP_PERCENT_BTNS,
  CUSTOM_TIP_PERCENT_INPUT,
  PEOPLE_INPUT,
  TIP_AMT,
  TOTAL_BILL_AMT,
  RESET_BTN,
  ERROR
}