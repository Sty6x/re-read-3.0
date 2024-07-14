import { Stack, Button } from "@chakra-ui/react";
import { useOutletContext } from "react-router-dom";
import FormInput from "./Input";
import { FormEvent, KeyboardEvent, useEffect, useState } from "react";
import checkEmailValidity from "../../../utils/validation/checkEmailValidity";
import {
  checkPasswordConfirmationValidity,
  checkPasswordValidity,
  isTheSame,
} from "../../../utils/validation/checkPasswordValidity";
import globalStateInstance from "../../../utils/globalState";

export default function FormComponent({
  children,
  inputs,
  buttonText = "Sign in",
}: {
  buttonText?: string;
  inputs: Array<{ pl: string; value: string; type: string; id: string }>;
  children: React.ReactElement;
}): React.ReactElement {
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const { form } = useOutletContext<{
    form: {
      formData: { [key: string]: string; name: string };
      setFormData: React.Dispatch<React.SetStateAction<string>>;
    };
  }>();

  function keyUpHandler(e: KeyboardEvent<HTMLInputElement>) {
    const target = e.currentTarget;
    if (target.id === "password") setPassword((_) => target.value);
    if (target.id === "confPassword") setConfPassword((_) => target.value);
    if (target.id === "email") {
      setIsFormValid(checkEmailValidity(target));
    }
  }

  useEffect(() => {
    // does not check when confPassword input is blank in login route
    if (location.pathname.includes("/login")) {
      if (password === "") return;
      setIsFormValid(checkPasswordValidity());
      return;
    }

    if (password === "" || confPassword == "") return;
    setIsFormValid(
      checkPasswordConfirmationValidity(isTheSame(password, confPassword)),
    );
  }, [confPassword, password]);

  return (
    <form
      noValidate
      onSubmit={(e: FormEvent) => {
        const form = e.currentTarget;
        e.preventDefault();
        if (!isFormValid) {
          const formValidity = globalStateInstance.get<{ message: string }>(
            "error-input",
          );
          console.log(formValidity.message);
          return;
        }
        console.log(form);
      }}
    >
      {children}
      <Stack spacing={4}>
        {inputs.map((input, i) => (
          <FormInput
            id={input.id}
            inputHandler={keyUpHandler}
            key={i}
            pl={input.pl}
            value={input.value}
            type={input.type}
          />
        ))}
        <Button
          type="submit"
          className="!font-bold mb-2 !text-sm !rounded-input-radius !bg-black !text-lt-200"
          size={"lg"}
          boxShadow={"base"}
          _hover={{ boxShadow: "lg" }}
        >
          {buttonText}
        </Button>
      </Stack>
    </form>
  );
}
