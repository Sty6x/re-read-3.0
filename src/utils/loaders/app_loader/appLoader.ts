import { redirect } from "react-router-dom";
import { ORIGIN_URL } from "../../api/apiRoutes";

export default async () => {
  console.log("Called");
  const userID = localStorage.getItem("userID");
  try {
    const request = await fetch(`${ORIGIN_URL}/api/v1/${userID}/all`, {
      method: "GET",
      mode: "cors",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    const { tokenInvalid, message, userData } = await request.json();
    console.log(message);
    // dont need to handle errors if cookie expired,
    // browser will handle the checking if the cookie is expired or not
    // the server will then route users back to `auth/login` route.

    // just check if token is tampered when requesting `/all`
    // or any after `/app`api route since it passes through an
    // authentication middleware.
    if (tokenInvalid) throw new Error("Invalid Token.");
    console.log(userData);
    return { data: "Data" };
  } catch (err: any) {
    console.error(err.message);
    return redirect("/auth/login");
  }
};
