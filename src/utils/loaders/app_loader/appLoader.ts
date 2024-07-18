import apiRoutes from "../../api/apiRoutes";

export default async () => {
  try {
    const request = await fetch(apiRoutes.resources.app, {
      method: "GET",
      mode: "cors",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    const toJson = await request.json();
    console.log(toJson);
    return toJson;
  } catch (err: any) {}
};
