function isTheSame(password: string, conf: string): boolean {
  return password === conf;
}
function displayMessage({
  message,
  isValid,
}: {
  message: string;
  isValid: boolean;
}) {
  console.log({ message, isValid });
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
  displayMessage(validity);
}

export { checkPasswordValidity, isTheSame };
