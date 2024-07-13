import { Input } from "@chakra-ui/react";
export default function FormInput({
  pl,
  value,
  type,
}: {
  pl: string;
  value: string;
  type: string;
}): React.ReactElement {
  return (
    <Input
      placeholder={pl}
      focusBorderColor="gray.700"
      required
      type={type}
      // _hover={{ boxShadow: "base" }}
      className="!text-sm my-1 !border-none !bg-lw-400 !text-dk-400 !rounded-input-radius"
      size={"lg"}
    />
  );
}
