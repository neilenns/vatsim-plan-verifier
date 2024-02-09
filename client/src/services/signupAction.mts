import debug from "debug";
import { ActionFunction, redirect } from "react-router-dom";
import { ENV } from "../env.mjs";
import http from "../utils/http.mts";

const logger = debug("plan-verifier:signupAction");

export const signupAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  await http
    .post(
      new URL("signup", ENV.VITE_SERVER_URL).toString(),
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
