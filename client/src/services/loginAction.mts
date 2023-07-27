import { ActionFunction, redirect } from "react-router-dom";
import { serverUrl } from "../configs/planVerifierServer.mjs";
import { AxiosResponse } from "axios";
import ILoginResponse from "../interfaces/ILoginResponse.mts";
import http from "../utils/http.mts";
import debug from "debug";

const logger = debug("plan-verifier:loginAction");

export const loginAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  await http
    .post<ILoginResponse>(
      new URL("login", serverUrl).toString(),
      {
        username: formData.get("email"),
        password: formData.get("password"),
      },
      {
        withCredentials: true,
      }
    )
    .then((response: AxiosResponse<ILoginResponse>) => {
      localStorage.setItem("token", response.data.token);
    })
    .catch((error) => {
      logger(error);
      return redirect("/");
    });

  return redirect("/verifier");
};
