import { NavLink, useNavigate } from "react-router-dom";
import FormComponent from "./FormComponent";
import { Button } from "@chakra-ui/react";

export default function Register(): React.ReactElement {
  const inputs: Array<{ pl: string; value: string }> = [
    { pl: "Email", value: "" },
    { pl: "Password", value: "" },
    { pl: "Confirm Password", value: "" },
  ];
  const navigate = useNavigate();
  return (
    <div className="auth-form-login max-w-[700px] w-80">
      <FormComponent inputs={inputs} buttonText={"Create account"}>
        <h1 className="mb-4 font-bold text-center">Sign up to Re:Read</h1>
      </FormComponent>
      <div
        id="auth-footer"
        className=" flex flex-col justify-center items-center mt-1"
      >
        <div
          id="auth-footer-btn"
          className="border-t-2 pt-3 border-t-lw-400 min-w-full mt-4 "
        >
          <p className="!text-lw-100 text-xs text-center">
            Have an existing account?
          </p>
          <Button
            type="button"
            className="!text-sm my-2 !bg-lt-100 !text-black w-full !rounded-input-radius"
            _hover={{ boxShadow: "base" }}
            size={"lg"}
            onClick={() => navigate("/auth/login")}
          >
            Sign in
          </Button>
        </div>
      </div>
    </div>
  );
}
