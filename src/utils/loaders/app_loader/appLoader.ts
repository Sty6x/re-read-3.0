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
    const {
      tokenInvalid,
      userQueryError,
      message,
      userData,
      redirect: { route },
    } = await request.json();
    console.log({ route, message });
    // dont need to handle errors if cookie expired,
    // browser will handle the checking if the cookie is expired or not
    // the server will then route users back to `auth/login` route.

    // just check if token is tampered when requesting `/all`
    // or any after `/app`api route since it passes through an
    // authentication middleware.
    if (tokenInvalid) {
      throw new Error(
        JSON.stringify({
          message: "Invalid Token",
          name: "JWTTokenError",
          route: route,
        }),
      );
    }
    if (userQueryError) {
      throw new Error(
        JSON.stringify({
          message: "User query error.",
          name: "UserQueryError",
          route: route,
        }),
      );
    }
    return "";
  } catch (err: any) {
    console.log(err);
    const parsedErr = JSON.parse(err.message);
    console.error(parsedErr.message);
    return redirect(parsedErr.route);
  }
};
