import { redirect } from "react-router-dom";
import { ORIGIN_URL } from "../../api/apiRoutes";

export default async () => {
  const userID = localStorage.getItem("userID");
  try {
    const request = await fetch(`${ORIGIN_URL}/app/${userID}/all`, {
      method: "GET",
      mode: "cors",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    const toJson = await request.json();
    console.log(toJson);
    if (toJson.sessionExpired) throw new Error(toJson.message);
    return toJson;
  } catch (err: any) {
    console.error(err.message);
    return redirect("/auth/login");
  }
};
