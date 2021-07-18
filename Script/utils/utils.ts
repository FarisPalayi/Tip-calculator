function prependDollarSign(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

function setBtnActive(element: Element, active: boolean): void {
  const btnActiveClass = 'card__section__btns-wrapper__btn--active'
  element.classList.toggle(btnActiveClass, active);
}

function removeBtnActive(elements: NodeListOf<HTMLElement>): void {
  elements?.forEach((percentBtn: Element): void => {
    setBtnActive(percentBtn, false);
  });
}


export { prependDollarSign, setBtnActive, removeBtnActive }