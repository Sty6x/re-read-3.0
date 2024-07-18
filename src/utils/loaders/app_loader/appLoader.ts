import { redirect } from "react-router-dom";
import apiRoutes from "../../api/apiRoutes";

export default async () => {
  try {
    const request = await fetch(apiRoutes.resources.all, {
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
    console.log(err.message);
    return redirect("/auth/login");
  }
};
