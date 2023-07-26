import { ActionFunction, redirect } from "react-router-dom";
import { serverUrl } from "../configs/planVerifierServer.mjs";
import axios, { AxiosResponse } from "axios";
import ILoginResponse from "../interfaces/ILoginResponse.mts";

export const loginAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  await axios
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
      console.log(error);
      return redirect("/");
    });

  return redirect("/verifier");
};
