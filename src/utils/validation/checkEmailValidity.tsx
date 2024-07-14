function checkEmailValidity(emailInput: HTMLInputElement) {
  const errorPopup = document.querySelector(".invalid-popup") as HTMLElement;
  const value = emailInput.value;
  if (value === "") {
    errorPopup.textContent = "";
    emailInput.classList.remove("invalid-input");
    emailInput.classList.remove("valid-input");
  }
  if (emailInput.validity.typeMismatch) {
    errorPopup.textContent = "*Please enter a valid email address.";
    emailInput.classList.add("invalid-input");
    emailInput.classList.remove("valid-input");
    console.log(emailInput.value);
  } else if (value !== "" && !emailInput.validity.typeMismatch) {
    console.log("valid");
    emailInput.classList.add("valid-input");
    emailInput.classList.remove("invalid-input");
    errorPopup.textContent = "";
  }
}

export default checkEmailValidity;
