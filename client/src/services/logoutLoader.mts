import axios from "axios";
import { serverUrl } from "../configs/planVerifierServer.mts";
import ILoginResponse from "../interfaces/ILoginResponse.mts";
import debug from "debug";
import { LoaderFunction, redirect } from "react-router-dom";

const logger = debug("plan-verifier:logoutLoader");

export const logoutLoader: LoaderFunction = async () => {
  await axios
    .get<ILoginResponse>(new URL("logout", serverUrl).toString(), {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
      },
    })
    .catch(() => {
      logger("User is already logged out.");
    }) // We don't have to do anything on errors.
    .finally(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.setItem("logout", Date.now().toString());
    });

  return redirect("/login");
};
