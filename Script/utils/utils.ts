/**
 * Prepends dollar sign to a number
 */
function prependDollarSign(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

/**
 * Sets argument button element active/inactive by adding/removing a css class. 
 * @param  {HTMLButtonElement} btn
 * @param  {boolean} active Controls if the css active class should be added or removed
 */

function setBtnActive(btn: HTMLButtonElement, active: boolean): void {
  const btnActiveClass = 'card__section__btns-wrapper__btn--active'
  btn.classList.toggle(btnActiveClass, active);
}

/**
 * Removes a css active class from a list of buttons (passed as an argument)
 * With the help of the {@link setBtnActive} function
 */
function removeBtnActive(btns: NodeListOf<HTMLButtonElement>): void {
  btns?.forEach((percentBtn): void => setBtnActive(percentBtn, false) );
}

/**
 * Checks if a string contains valid integer
 */
function isInteger(str: string): boolean {
  return parseFloat(str) === parseInt(str);
}


export { prependDollarSign, setBtnActive, removeBtnActive, isInteger }