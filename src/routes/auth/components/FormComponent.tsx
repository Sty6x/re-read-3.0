import { Stack, Button } from "@chakra-ui/react";
import { useOutletContext } from "react-router-dom";
import FormInput from "./Input";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import checkEmailValidity from "../../../utils/validation/checkEmailValidity";
import {
  checkPasswordValidity,
  isTheSame,
} from "../../../utils/validation/checkPasswordValidity";

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
    if (target.id === "email") checkEmailValidity(target);
  }

  useEffect(() => {
    checkPasswordValidity(isTheSame(password, confPassword));
  }, [confPassword, password]);

  return (
    <form
      onSubmit={(e: any) => {
        console.log(e);
        e.preventDefault();
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
