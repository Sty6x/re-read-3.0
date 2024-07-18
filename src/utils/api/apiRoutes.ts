const ORIGIN = "https://192.168.1.71:8080";
const USERID = localStorage.getItem("userID") || "";
const APP = `${ORIGIN}/app/${USERID}`;

export default {
  auth: {
    login: `${ORIGIN}/auth/login`,
    register: `${ORIGIN}/auth/register`,
  },
  resources: {
    all: `${APP}/all`,
  },
};
