export const BILL_INPUT: HTMLInputElement | null = document.querySelector('input[name=bill]');

export const TIP_PERCENT_BTNS: NodeListOf<HTMLButtonElement> | null = document.querySelectorAll('.card__section__btns-wrapper__btn');
export const CUSTOM_TIP_PERCENT_INPUT: HTMLInputElement | null = document.querySelector('input[name=custom]');

export const PEOPLE_INPUT: HTMLInputElement | null = document.querySelector('input[name=people]');

export const TIP_AMT: HTMLSpanElement | null = document.querySelector('.card__section__container--tip .card__section__container__amount');
export const TOTAL_BILL_AMT: HTMLSpanElement | null = document.querySelector('.card__section__container--total .card__section__container__amount');

export const RESET_BTN: HTMLButtonElement | null = document.querySelector('.card__section__reset-btn');

export const ERROR: HTMLSpanElement | null = document.querySelector('.card__section__error');