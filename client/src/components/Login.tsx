import { LoadingButton } from "@mui/lab";
import { TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import http from "../utils/http.mts";
import ILoginResponse from "../interfaces/ILoginResponse.mts";
import { AxiosError, AxiosResponse } from "axios";
import debug from "debug";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const logger = debug("plan-verifier:login");

  const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const genericErrorMessage = "Something went wrong, try again later.";

    http
      .post<ILoginResponse>("login", {
        username: email,
        password: password,
      })
      .then((response: AxiosResponse<ILoginResponse>) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        navigate("/verifier");
      })
      .catch((error: AxiosError) => {
        logger(error);
        if (error.response?.status === 400) {
          setError("Fill all the fields in correctly.");
        } else if (error.response?.status === 401) {
          setError("Invalid email or password.");
        } else if (error.response?.status === 402) {
          setError("Your account is not approved yet.");
        } else {
          setError(genericErrorMessage);
        }
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <>
      <form onSubmit={formSubmitHandler}>
        <TextField
          id="email"
          name="email"
          label="Email"
          autoComplete="email"
          required={true}
          variant="outlined"
          type="email"
          margin="normal"
          fullWidth
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        />
        <TextField
          id="password"
          name="password"
          label="Password"
          autoComplete="current-password"
          required={true}
          variant="outlined"
          margin="normal"
          fullWidth
          type="password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        />
        {error && <Typography color="error">{error}</Typography>}
        <LoadingButton
          variant="contained"
          color="primary"
          loading={isSubmitting}
          fullWidth
          type="submit"
        >
          Sign in
        </LoadingButton>
      </form>
    </>
  );
};

export default Login;
