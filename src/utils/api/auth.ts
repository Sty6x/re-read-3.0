import apiRoutes from "./apiRoutes";

// IMPROVE ERROR HANDLING

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

  // I WANT TO ISOLATE ERROR HANDLING WITHIN THESE METHODS

  async loginRequest(): Promise<t_authResponse> {
    try {
      const login = await fetch(apiRoutes.auth.login, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({ email: this.email, password: this.password }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const loginData = await login.json();
      if (loginData.validityError) throw new Error(loginData.message);
      localStorage.setItem("userID", loginData.userData._id);
      return loginData;
    } catch (err: any) {
      console.error(err.message);
      return { ...returnError, message: err.message };
    }
  }
  async registerRequest(): Promise<t_authResponse> {
    try {
      const register = await fetch(apiRoutes.auth.register, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({ email: this.email, password: this.password }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const registeredData = await register.json();
      console.log(registeredData);
      if (registeredData.validityError) throw new Error(registeredData.message);
      localStorage.setItem("userID", registeredData.userData._id);
      return registeredData;
    } catch (err: any) {
      console.error(err.message);
      return { ...returnError, message: err.message };
    }
  }
}

export default AuthClient;
