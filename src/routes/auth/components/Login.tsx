import { NavLink } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import FormComponent from "./Form";

export default function Login(): React.ReactElement {
  return (
    <div className="auth-form-login max-w-[700px] w-80">
      <FormComponent>
        <h1 className="mb-4 font-bold text-center">Sign In to Re:Read</h1>
      </FormComponent>
      <div
        id="auth-footer"
        className=" flex flex-col justify-center items-center mt-1"
      >
        <NavLink className="text-xs " to={"/auth/sign-up"}>
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
            className="!text-sm my-2 !bg-lt-100 !text-black w-full !rounded-input-radius"
            _hover={{ boxShadow: "base" }}
            size={"lg"}
          >
            Create a new account
          </Button>
        </div>
      </div>
    </div>
  );
}
