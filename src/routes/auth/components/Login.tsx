import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import FormComponent from "./FormComponent";

export default function Login(): React.ReactElement {
  const navigate = useNavigate();
  const inputs: Array<{ pl: string; value: string; type: string }> = [
    { pl: "Email", value: "", type: "mail" },
    { pl: "Password", value: "", type: "password" },
  ];
  return (
    <div className="auth-form-login max-w-[700px] w-80">
      <FormComponent inputs={inputs}>
        <h1 className="mb-4 font-extrabold text-center">Sign In to Re:Read</h1>
      </FormComponent>
      <div
        id="auth-footer"
        className=" flex flex-col justify-center items-center mt-1"
      >
        <NavLink className="text-xs " to={"#"}>
          Forgot your password?
        </NavLink>
        <div
          id="auth-footer-btn"
          className="border-t-2 pt-3 border-t-lw-400 min-w-full mt-4 "
        >
          <p className="!text-lw-100 text-xs text-center">
            Don't have an account?
          </p>
          <Button
            type="button"
            className="!font-bold !text-sm my-2 !bg-lt-100 !text-black w-full !rounded-input-radius"
            boxShadow={"base"}
            _hover={{ boxShadow: "lg" }}
            size={"lg"}
            onClick={() => navigate("/auth/register")}
          >
            Create a new account
          </Button>
        </div>
      </div>
    </div>
  );
}
