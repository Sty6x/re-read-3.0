import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
const userTest = false;
export default function Auth(): React.ReactElement {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<{ name: string }>({ name: "User" });
  useEffect(() => {
    // check if user is logged in or not, navigate accordingly
    if (!userTest) {
      navigate("login");
      console.log("redirect");
      return;
    }
  });
  return (
    <main className="main-container justify-center items-center text-3xl bg-light text text-dk-100">
      <Outlet context={{ authForm: { formData, setFormData } }} />
    </main>
  );
}
