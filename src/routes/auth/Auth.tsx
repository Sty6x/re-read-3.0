import "./style.css";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ORIGIN_URL } from "../../utils/api/apiRoutes";

export default function Auth(): React.ReactElement {
  const navigate = useNavigate();

  async function checkExistingUser() {

    try {
      // to check if session cookie exists
      const request = await fetch(`${ORIGIN_URL}/api/v1/`, {
        method: "GET",
        mode: "cors",
        credentials: "include",
      });
      const { sessionExpired, message, redirect } = await request.json();
      console.log(message)
      if (sessionExpired) throw new Error(message);
      return navigate("/app");
    } catch (err: any) {
      console.log(err)
      return navigate("/auth/login");
    }
  }

  useEffect(() => {
    checkExistingUser()
  }, []);
  return (
    <main className="main-container justify-center items-center text-3xl bg-light text text-dk-100">
      <Outlet />
    </main>
  );
}
