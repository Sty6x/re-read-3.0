import { Stack, Button, Spinner } from "@chakra-ui/react";
import FormInput from "./Input";
import { FormEvent, useEffect, useState } from "react";
import {
  checkEmailValidity,
  checkPasswordConfirmationValidity,
  checkPasswordValidity,
} from "../../../utils/validation/authInputValidation";
import globalStateInstance from "../../../utils/globalState";
import displayMessage from "../../../utils/validation/displayMessage";

export default function FormComponent({
  children,
  inputs,
  buttonText = "Sign in",
}: {
  buttonText?: string;
  inputs: Array<{ pl: string; value: string; type: string; id: string, name: string }>;
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

  async function submitUser(formData: { email: string; password: string }) {
    // evaluate route if login or register
    const userDatabase = globalStateInstance.get<Array<{ email: string; password: string }>>("users") || globalStateInstance.set<Array<{ email: string; password: string }>>("users", []);
    console.log(userDatabase);

    // login send POST OR GET??
    if (location.pathname.includes("/login")) {
      try {
        // this query happens on the server
        const user = userDatabase.find(u => u.email === formData.email)
        // what is sent to the client from server on register login handler;
        const { message, userData } = { message: "Email does not exist.", userData: user };
        // get error from server if a user does not exist
        if (userData === undefined) {
          throw new Error(message)
        }
      } catch (err: any) {
        displayMessage({ isValid: false, message: err.message, value: "" });
        console.log("Log: User does not exist");
      }
      return;
    }

    try {
      // register send POST
      // this query happens on the server
      const user = userDatabase.find(u => u.email === formData.email)
      // what is sent to the client from server on register route handler;
      const { message, userData } = { message: "Email already exists.", userData: user };
      if (userData !== undefined) {
        throw new Error(message);
      }
      const newUser = globalStateInstance.set("users", [...userDatabase, formData])
      console.log(newUser)
    } catch (err: any) {
      displayMessage({ isValid: false, message: err.message, value: "" });
    }

  }


  async function submitHandler(e: FormEvent) {
    const form = e.currentTarget as HTMLFormElement;
    const isValidSubmit = evaluateValidityOnSubmit();
    e.preventDefault();
    if (isValidSubmit) {
      try {
        setIsSubmiting(true);
        setTimeout(() => {
          const formData = new FormData(form);
          console.log(formData.entries());
          const data = Object.fromEntries(formData.entries())
          submitUser(data as { email: string; password: string }); // SHHH
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
            name={input.name}
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
