function displayMessage(
  targetInput: HTMLInputElement,
  {
    message,
    isValid,
    value,
  }: {
    message: string;
    isValid: boolean;
    value: string;
  },
) {
  const errorPopup = document.querySelector(".invalid-popup") as HTMLElement;
  errorPopup.textContent = message;

  // RESET STATES
  targetInput.classList.remove("invalid-input");
  targetInput.classList.remove("valid-input");
  errorPopup.classList.remove("active-err-popup");

  if (value === "") {
    errorPopup.classList.add("active-err-popup");
    targetInput.classList.remove("invalid-input");
    targetInput.classList.remove("valid-input");
    return;
  }

  if (!isValid) {
    errorPopup.classList.add("active-err-popup");
    targetInput.classList.add("invalid-input");
    return;
  }
  targetInput.classList.add("valid-input");
}

export default displayMessage;
