import { Stack, Button } from "@chakra-ui/react";
import FormInput from "./Input";
import { FormEvent } from "react";
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
    if (target.id === "password") checkPasswordValidity();
    if (target.id === "email") checkEmailValidity();
  }


  return (
    <form
      noValidate
      onSubmit={(e: FormEvent) => {
        const form = e.currentTarget;
        e.preventDefault();
        console.log(form);
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
