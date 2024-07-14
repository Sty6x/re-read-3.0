import globalStateInstance from "../globalState";
import displayMessage from "./displayMessage";

function checkEmailValidity(): boolean {
  const emailInput = document.getElementById("email") as HTMLInputElement;
  console.log(emailInput)
  console.log("called")
  let validity: { message: string; isValid: boolean, value: string } = {
    message: "",
    isValid: false,
    value: emailInput.value
  };
  if (emailInput.validity.typeMismatch) {
    validity.message = "*Please enter a valid email address.";
  } else if (emailInput.value !== "" && !emailInput.validity.typeMismatch) {
    validity = { ...validity, message: "", isValid: true };
  }
  globalStateInstance.set("error-input", { message: validity.message });
  displayMessage(emailInput, validity);
  return validity.isValid;
}

export default checkEmailValidity;
