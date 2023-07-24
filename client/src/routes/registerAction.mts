import { ActionFunction, json } from "react-router-dom";
import { serverUrl } from "../configs/planVerifierServer.mjs";
import Result from "../types/result.mts";
import axios from "axios";

export type RegisterActionResult = Result<string, "UnknownError">;

export const registerAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  axios
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
      console.log("Success!");
    })
    .catch((error) => {
      console.log(error);
    });

  return json({ success: true, data: "Success!" } as RegisterActionResult);
};
