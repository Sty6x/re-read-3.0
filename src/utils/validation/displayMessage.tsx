function displayMessage(
  targetInput: HTMLInputElement,
  {
    message,
    isValid,
  }: {
    message: string;
    isValid: boolean;
  },
) {
  const errorPopup = document.querySelector(".invalid-popup") as HTMLElement;
  errorPopup.textContent = message;
  targetInput.classList.remove("invalid-input");
  targetInput.classList.remove("valid-input");

  if (!isValid) {
    targetInput.classList.add("invalid-input");
    return;
  }
  targetInput.classList.add("valid-input");
}

export default displayMessage;
