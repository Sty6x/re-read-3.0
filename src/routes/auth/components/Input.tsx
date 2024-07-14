import { Input } from "@chakra-ui/react";
import { KeyboardEvent } from "react";
export default function FormInput({
  pl,
  value,
  type,
  inputHandler,
  id,
}: {
  pl: string;
  value: string;
  type: string;
  inputHandler: (e: KeyboardEvent<HTMLInputElement>) => void;
  id: string;
}): React.ReactElement {
  return (
    <Input
      id={id}
      onKeyUp={inputHandler}
      placeholder={pl}
      focusBorderColor="gray.700"
      required
      type={type}
      // _hover={{ boxShadow: "base" }}
      className="!text-sm !border-none !bg-lw-400 !text-dk-400 !rounded-input-radius"
      size={"lg"}
    />
  );
}
