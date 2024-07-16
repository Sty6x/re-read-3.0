import { Stack, Button, Spinner } from "@chakra-ui/react";
import FormInput from "./Input";
import { FormEvent, useEffect, useState } from "react";
import {
  checkEmailValidity,
  checkPasswordConfirmationValidity,
  checkPasswordValidity,
} from "../../../utils/validation/authInputValidation";

export default function FormComponent({
  children,
  inputs,
  buttonText = "Sign in",
}: {
  buttonText?: string;
  inputs: Array<{ pl: string; value: string; type: string; id: string }>;
  children: React.ReactElement;
}): React.ReactElement {
  const [isValidSubmit, setIsValidSubmit] = useState<boolean>(true); // to set inital style
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false); // to set inital style
  //const { form } = useOutletContext<{
  //  form: {
  //    formData: { [key: string]: string; name: string };
  //    setFormData: React.Dispatch<React.SetStateAction<string>>;
  //  };
  //}>();
  //



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


  // VALIDATES ON SUMBIT FOR SIGN IN AND SIGN UP
  function evaluateValidityOnSubmit(): boolean {
    if (!location.pathname.includes("/register")) {
      if (checkEmailValidity() && checkPasswordValidity()) {
        console.log("valid")
        return true
      } else {
        console.log("invalid")
        return false;
      }
    }
    if (checkEmailValidity() && checkPasswordValidity()
      && checkPasswordConfirmationValidity()) {
      console.log("valid")
      return true
    }
    console.log("invalid")
    return false;
  }

  // VALIDATES INPUTS FOR REGISTER ROUTE
  // DONT NEED TO VALIDATE INPUTS FOR SIGN IN
  function inputOnChangeHandler(e: FormEvent<HTMLInputElement>) {
    const target = e.currentTarget;
    if (location.pathname.includes("/register")) {
      if (target.id === "password" || target.id === "confPassword") checkPasswordConfirmationValidity()
      if (target.id === "email") checkEmailValidity();
      return
    }
  }

  // VALIDATE ON SUBMIT
  async function submitUser() {
    let valid: boolean = true;
  }


  async function submitHandler(e: FormEvent) {
    const form = e.currentTarget;
    const isValidSubmit = evaluateValidityOnSubmit();
    e.preventDefault();
    if (isValidSubmit) {
      try {
        setIsSubmiting(true);
        setTimeout(() => {
          setIsSubmiting(false);
        }, 2000);
        //await submitUser();
        console.log("sent")
      } catch (err: any) {
        console.log(err.message)
        setIsSubmiting(false);
      }
    }
  }


  useEffect(() => {
    console.log(isSubmiting)
  }, [isSubmiting])

  useEffect(() => {
    if (!isValidSubmit) {
      animateErrorButton("Check your credentials.");
      return;
    }
  }, [isValidSubmit])

  return (
    <form
      noValidate
      onSubmit={submitHandler}
    >
      {children}
      <Stack spacing={4}>
        {inputs.map((input, i) => (
          <FormInput
            id={input.id}
            inputHandler={inputOnChangeHandler}
            key={i}
            pl={input.pl}
            value={input.value}
            type={input.type}
          />
        ))}
        <Button
          isLoading={isSubmiting}
          type="submit"
          id="auth-submit"
          className={`${!isValidSubmit ? "auth-submit-invalid" : ""} auth-submit-default  !font-bold mb-2 !text-sm !rounded-input-radius !bg-black !text-lt-200`}
          size={"lg"}
          boxShadow={"base"}
          _hover={{ boxShadow: "lg" }}
        >{buttonText}</Button>

      </Stack>
    </form >
  );
}
