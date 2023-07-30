import { serverUrl } from "../configs/planVerifierServer.mts";
import ILoginResponse from "../interfaces/ILoginResponse.mts";
import debug from "debug";
import { LoaderFunction, redirect } from "react-router-dom";
import http from "../utils/http.mts";

const logger = debug("plan-verifier:logoutLoader");

export const logoutLoader: LoaderFunction = async () => {
  await http
    .get<ILoginResponse>(new URL("logout", serverUrl).toString())
    .catch(() => {
      logger("User is already logged out.");
    }) // We don't have to do anything on errors.
    .finally(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("darkMode");
      localStorage.setItem("logout", Date.now().toString());
    });

  return redirect("/");
};
