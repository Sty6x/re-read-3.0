import globalStateInstance from "../globalState";
import displayMessage from "./displayMessage";
function isTheSame(password: string, conf: string): boolean {
  return password === conf;
}

function checkPasswordValidity(): boolean {
  const target = document.getElementById("password") as HTMLInputElement;
  const validity = { message: "", isValid: false };
  if (target.validity.tooLong) {
    validity.message = "Password is too long.";
  } else if (target.validity.tooShort) {
    validity.message = "Password is too short.";
  } else {
    validity.isValid = true;
    validity.message = "";
    console.log("Proceed");
  }
  globalStateInstance.set("error-input", { message: validity.message });
  displayMessage(target, validity);
  return validity.isValid;
}

function checkPasswordConfirmationValidity(isSame: boolean): boolean {
  const target = document.getElementById("password") as HTMLInputElement;
  const validity = { message: "", isValid: false };
  if (target.validity.tooLong) {
    validity.message = "Password is too long.";
  } else if (target.validity.tooShort) {
    validity.message = "Password is too short.";
  } else if (!isSame) {
    validity.message = "Password does not match.";
  } else {
    validity.isValid = true;
    validity.message = "";
    console.log("Proceed");
  }

  globalStateInstance.set("error-input", { message: validity.message });
  displayMessage(target, validity);
  return validity.isValid;
}

export { checkPasswordConfirmationValidity, checkPasswordValidity, isTheSame };
