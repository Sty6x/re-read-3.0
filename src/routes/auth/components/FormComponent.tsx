import { Stack, Button } from "@chakra-ui/react";
import { useOutletContext } from "react-router-dom";
import FormInput from "./Input";

export default function FormComponent({
  children,
  inputs,
  buttonText = "Sign in",
}: {
  buttonText?: string;
  inputs: Array<{ pl: string; value: string }>;
  children: React.ReactElement;
}): React.ReactElement {
  const { form } = useOutletContext<{
    form: {
      formData: { [key: string]: string; name: string };
      setFormData: React.Dispatch<React.SetStateAction<string>>;
    };
  }>();
  return (
    <form
      onSubmit={(e: any) => {
        console.log(e);
      }}
    >
      {children}
      <Stack spacing={4}>
        {inputs.map((input) => (
          <FormInput pl={input.pl} value={input.value} />
        ))}
        <Button
          className="mb-2 !text-sm !rounded-input-radius !bg-black !text-lt-200"
          size={"lg"}
          _hover={{ boxShadow: "base" }}
        >
          {buttonText}
        </Button>
      </Stack>
    </form>
  );
}
