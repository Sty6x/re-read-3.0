import { useNavigate } from "react-router-dom";
import { Button, Stack } from "@chakra-ui/react";
import FormInput from "./Input";
import { FormEvent, useEffect, useState } from "react";
import displayMessage from "../../../utils/validation/displayMessage";
import { ORIGIN_URL } from "../../../utils/api/apiRoutes";

export default function SetUsername(): React.ReactElement {

  const [isValidSubmit, setIsValidSubmit] = useState<boolean>(true); // to set inital style
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false); // to set inital style
  const [usernameInput, setUsernameInput] = useState("");
  const navigate = useNavigate();
  const inputField = { pl: "John, Maria, Francis...", type: "text", id: "username", name: "username", value: "" };

  function validateUsername(): boolean {
    const target = document.getElementById("username") as HTMLInputElement;
    setUsernameInput(target.value);
    if (target.validity.valueMissing) {
      console.log("Set username to random id");
      displayMessage({ value: "", message: "Please enter a valid username.", isValid: false });
      return false;
    }
    displayMessage({ value: "", message: "", isValid: true });
    return true;
  }

  async function submitHandler(e: FormEvent) {
    e.preventDefault()
    setIsSubmiting(true);
    if (validateUsername()) {
      const userID = localStorage.getItem("userID")
      const setUsername = await fetch(`${ORIGIN_URL}/account/change?username=${usernameInput}&userID=${userID}`, { method: "POST", credentials: "include" });
      const fetchedData = await setUsername.json();
      navigate(fetchedData.redirect.route);
      setIsSubmiting(false);
      return;
    }
    console.log("Bruh enter your username");
    setIsValidSubmit(false);
    setIsSubmiting(false);
  }


  function animateErrorButton(errorMessage: string) {
    const submitBtn = document.getElementById("auth-submit") as HTMLButtonElement;
    const tmp = submitBtn.textContent;
    submitBtn.textContent = errorMessage;
    setTimeout(() => {
      submitBtn.textContent = tmp;
      submitBtn.style.backgroundColor = "#33333";
      submitBtn.classList.remove("auth-submit-invalid");
      setIsValidSubmit(true);
    }, 800)
  }


  useEffect(() => {
    console.log(isSubmiting)

  }, [isSubmiting])
  useEffect(() => {
    if (!isValidSubmit) {
      animateErrorButton("Enter your username");
      return;
    }
  }, [isValidSubmit])


  return <div className="auth-form-login max-w-[700px] w-80">
    <form
      noValidate
      onSubmit={submitHandler}
    >
      <div className="mb-4">
        <h1 className="font-extrabold text-center text-[1.5rem]">What shoule we call you?</h1>
        <span className="invalid-popup"></span>
      </div>

      <Stack spacing={4}>
        <FormInput
          name={inputField.name}
          id={inputField.id}
          inputHandler={validateUsername}
          key={42}
          pl={inputField.pl}
          value={usernameInput}
          type={inputField.type}
        />
        <Button
          isLoading={isSubmiting}
          type="submit"
          id="auth-submit"
          className={`${!isValidSubmit ? "auth-submit-invalid" : ""} auth-submit-default  !font-bold mb-2 !text-sm !rounded-input-radius !bg-black !text-lt-200`}
          size={"lg"}
          boxShadow={"base"}
          _hover={{ boxShadow: "lg" }}
        >Create</Button>

      </Stack>
    </form>
  </div>
}
