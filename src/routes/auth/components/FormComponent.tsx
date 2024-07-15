import { Stack, Button } from "@chakra-ui/react";
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
  //const { form } = useOutletContext<{
  //  form: {
  //    formData: { [key: string]: string; name: string };
  //    setFormData: React.Dispatch<React.SetStateAction<string>>;
  //  };
  //}>();
  //


  function inputOnChangeHandler(e: FormEvent<HTMLInputElement>) {
    const target = e.currentTarget;
    if (location.pathname.includes("/register")) {
      if (target.id === "password" || target.id === "confPassword") checkPasswordConfirmationValidity()
      if (target.id === "email") checkEmailValidity();
      return
    }
    //if (target.id === "password") checkPasswordValidity();
    //if (target.id === "email") checkEmailValidity();
  }

  function evaluateValidityOnSubmit(): boolean {
    if (!location.pathname.includes("/register")) {
      if (checkEmailValidity() && checkPasswordValidity()) {
        console.log("submit")
        return true
      } else {
        console.log("invalid")
        return false;
      }
    }
    if (checkEmailValidity() && checkPasswordValidity()
      && checkPasswordConfirmationValidity()) {
      console.log("submit")
      return true
    }
    return false;
  }

  function animateButton() {
    const submitBtn = document.getElementById("auth-submit") as HTMLButtonElement;
    submitBtn.textContent = "Check your creds";
    setTimeout(() => {
      submitBtn.textContent = "Sign in";
      submitBtn.style.backgroundColor = "#33333";
      submitBtn.classList.remove("auth-submit-invalid");
      setIsValidSubmit(true);
    }, 800)


  }


  useEffect(() => {
    if (!isValidSubmit)
      animateButton();
  }, [isValidSubmit])

  return (
    <form
      noValidate
      onSubmit={(e: FormEvent) => {
        //const form = e.currentTarget;
        setIsValidSubmit(evaluateValidityOnSubmit());
        e.preventDefault();
      }}
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
          type="submit"
          id="auth-submit"
          className={`${!isValidSubmit ? "auth-submit-invalid" : ""} auth-submit-default  !font-bold mb-2 !text-sm !rounded-input-radius !bg-black !text-lt-200`}
          size={"lg"}
          boxShadow={"base"}
          _hover={{ boxShadow: "lg" }}
        >
          {buttonText}
        </Button>
      </Stack>
    </form >
  );
}
