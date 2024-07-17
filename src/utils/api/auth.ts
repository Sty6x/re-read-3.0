import apiRoutes from "./apiRoutes";

type t_authResponse = {
  message: string;
  redirect: {
    canNavigate: boolean;
    route: string;
  };
  userData: any | undefined;
};

// HANDLE ERRORS ON SUBMITTER

class AuthClient {
  email: string;
  password: string;
  constructor({ email, password }: { email: string; password: string }) {
    this.email = email;
    this.password = password;
  }

  private async authApi(route: string): Promise<t_authResponse> {
    const request = await fetch(route, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ email: this.email, password: this.password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await request.json();
  }
  async loginRequest(): Promise<t_authResponse> {
    try {
      const response: t_authResponse = await this.authApi(apiRoutes.auth.login);
      return response;
    } catch (err: any) {
      console.error(err.message);
      return {
        message: "Something went wrong with your request.",
        userData: undefined,
        redirect: { canNavigate: false, route: "" },
      };
    }
  }
  async registerRequest(): Promise<t_authResponse> {
    try {
      const response: t_authResponse = await this.authApi(
        apiRoutes.auth.register,
      );
      return response;
    } catch (err: any) {
      console.error(err.message);
      return {
        message: "Something went wrong with your request.",
        userData: undefined,
        redirect: { canNavigate: false, route: "" },
      };
    }
  }
}

export default AuthClient;
