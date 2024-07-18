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

const returnError = {
  message: "Something went wrong with your request.",
  userData: undefined,
  redirect: { canNavigate: false, route: "" },
};

class AuthClient {
  email: string;
  password: string;
  constructor({ email, password }: { email: string; password: string }) {
    this.email = email;
    this.password = password;
  }

  private async authApi(
    route: string,
    config: {
      method: "POST" | "GET" | "DELETE" | "PUT";
      props?: { [key: string]: any };
      headers?: { [key: string]: any };
    },
  ): Promise<t_authResponse> {
    const confHeaders = config.headers || {};
    const confProps = config.props || {};
    console.log(config);
    const request = await fetch(route, {
      method: config.method.toUpperCase(),
      mode: "cors",
      body: JSON.stringify({ email: this.email, password: this.password }),
      ...confProps,
      headers: {
        "Content-Type": "application/json",
        ...confHeaders,
      },
    });
    return await request.json();
  }
  async loginRequest(): Promise<t_authResponse> {
    try {
      const response: t_authResponse = await this.authApi(
        apiRoutes.auth.login,
        { method: "POST", props: { credentials: "include" } },
      );
      return response;
    } catch (err: any) {
      console.error(err.message);
      return returnError;
    }
  }
  async registerRequest(): Promise<t_authResponse> {
    try {
      const response: t_authResponse = await this.authApi(
        apiRoutes.auth.register,
        {
          method: "POST",
          props: { credentials: "include" },
          headers: { Accept: "application/json" },
        },
      );
      return response;
    } catch (err: any) {
      console.error(err.message);
      return returnError;
    }
  }
}

export default AuthClient;
