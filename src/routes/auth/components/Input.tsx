import { Input } from "@chakra-ui/react";
import { KeyboardEvent, useEffect, useRef } from "react";
export default function FormInput({
  pl,
  name,
  type,
  inputHandler,
  id,
}: {
  name: string;
  pl: string;
  value: string;
  type: string;
  inputHandler: (e: KeyboardEvent<HTMLInputElement>) => void;
  id: string;
}): React.ReactElement {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const input = inputRef.current;
    if (input?.type === "password") {
      input.minLength = 8;
      input.maxLength = 16;
    }
  }, []);

  return (
    <Input
      ref={inputRef}
      id={id}
      name={name}
      onChange={inputHandler}
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
