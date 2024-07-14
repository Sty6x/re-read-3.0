function isTheSame(password: string, conf: string): boolean {
  return password === conf;
}
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
  console.log({ message, isValid });
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

function checkPasswordValidity(isSame: boolean) {
  const target = document.getElementById("password") as HTMLInputElement;
  let validity = { message: "", isValid: false };
  if (!isSame) {
    validity.message = "Password does not match.";
  } else if (target.validity.tooLong) {
    validity.message = "Password is too long.";
  } else if (target.validity.tooShort) {
    validity.message = "Password is too short.";
  } else {
    validity.isValid = true;
    validity.message = "";
    console.log("Proceed");
  }
  displayMessage(target, validity);
}

export { checkPasswordValidity, isTheSame };
