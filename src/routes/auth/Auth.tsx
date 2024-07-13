import { useEffect, } from "react";
import { Outlet, useNavigate } from "react-router-dom";
const userTest = false;
export default function Auth(): React.ReactElement {
  const navigate = useNavigate();
  useEffect(() => {
    // check if user is logged in or not, navigate accordingly
    if (!userTest) {
      navigate("login");
      console.log("redirect")
    }
  }, []);

  return <div>
    Auth Route
    <Outlet />
  </div>
};
