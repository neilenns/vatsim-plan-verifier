import { ActionFunction, redirect } from "react-router-dom";
import { serverUrl } from "../configs/planVerifierServer.mjs";
import debug from "debug";
import http from "../utils/http.mts";

const logger = debug("plan-verifier:signupAction");

export const signupAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  await http
    .post(
      new URL("signup", serverUrl).toString(),
      {
        username: formData.get("email"),
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        password: formData.get("password"),
      },
      {
        withCredentials: true,
      }
    )
    .then(() => {
      logger("Success!");
    })
    .catch((error) => {
      logger(error);
    });

  return redirect("/");
};
