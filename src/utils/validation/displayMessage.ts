function displayMessage(
  targetInput: HTMLInputElement,
  {
    message,
    isValid,
    value
  }: {
    message: string;
    isValid: boolean;
    value: string
  },
) {
  const errorPopup = document.querySelector(".invalid-popup") as HTMLElement;
  errorPopup.textContent = message;
  targetInput.classList.remove("invalid-input");
  targetInput.classList.remove("valid-input");
  if (value === "") {
    targetInput.classList.remove("invalid-input");
    targetInput.classList.remove("valid-input");
    return
  }

  if (!isValid) {
    targetInput.classList.add("invalid-input");
    return;
  }
  targetInput.classList.add("valid-input");
}

export default displayMessage;
