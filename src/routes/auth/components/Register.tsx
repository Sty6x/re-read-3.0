import { useNavigate } from "react-router-dom";
import FormComponent from "./FormComponent";
import { Button } from "@chakra-ui/react";

export default function Register(): React.ReactElement {
  const inputs: Array<{ pl: string; value: string; type: string; id: string }> =
    [
      { pl: "Email", value: "", type: "email", id: "email" },
      { pl: "Password", value: "", type: "password", id: "password" },
      {
        pl: "Confirm Password",
        value: "",
        type: "password",
        id: "confPassword",
      },
    ];
  const navigate = useNavigate();
  return (
    <div className="auth-form-login max-w-[700px] w-80">
      <FormComponent inputs={inputs} buttonText={"Create account"}>
        <div className="mb-4">
          <h1 className=" font-extrabold text-center">Sign up to Re:Read</h1>
          <span className="invalid-popup"></span>
        </div>
      </FormComponent>
      <div
        id="auth-footer"
        className=" flex flex-col justify-center items-center mt-1"
      >
        <div
          id="auth-footer-btn"
          className="border-t-2 pt-3 border-t-lw-400 min-w-full mt-2 "
        >
          <p className="!text-lw-100 text-xs text-center">
            Have an existing account?
          </p>
          <Button
            type="button"
            className="!text-sm my-2 !bg-lt-100 !text-black w-full !rounded-input-radius"
            boxShadow={"base"}
            _hover={{ boxShadow: "lg" }}
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
