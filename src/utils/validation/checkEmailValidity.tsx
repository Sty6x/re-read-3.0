import globalStateInstance from "../globalState";
import displayMessage from "./displayMessage";

function checkEmailValidity(emailInput: HTMLInputElement): boolean {
  let validity: { message: string; isValid: boolean } = {
    message: "",
    isValid: false,
  };
  if (emailInput.validity.typeMismatch) {
    validity.message = "*Please enter a valid email address.";
  } else if (emailInput.value !== "" && !emailInput.validity.typeMismatch) {
    validity = { message: "", isValid: true };
  }
  globalStateInstance.set("error-input", { message: validity.message });
  displayMessage(emailInput, validity);
  return validity.isValid;
}

export default checkEmailValidity;
