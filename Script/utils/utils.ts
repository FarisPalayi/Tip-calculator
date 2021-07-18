export function prependDollarSign(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

export function setBtnActive(element: Element, active: boolean): void {
  const btnActiveClass = 'card__section__btns-wrapper__btn--active'
  element.classList.toggle(btnActiveClass, active);
}

export function removeBtnActive(elements: NodeListOf<HTMLElement>): void {
  elements?.forEach((percentBtn: Element): void => {
    setBtnActive(percentBtn, false);
  });
}