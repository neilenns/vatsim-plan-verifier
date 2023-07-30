import { LoadingButton } from "@mui/lab";
import { TextField, Typography } from "@mui/material";
import debug from "debug";

import React, { useState } from "react";
import http from "../utils/http.mts";
import { AxiosError } from "axios";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const logger = debug("plan-verifier:signup");

  const genericErrorMessage = "Something went wrong, try again later.";

  const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    http
      .post("signup", {
        username: email,
        firstName: firstName,
        lastName: lastName,
        password: password,
      })
      .then(() => {
        setError("Account created successfully. You'll be notified once it is activated.");
        setIsSubmitting(false);
      })
      .catch((error: AxiosError) => {
        logger(error);
        setError(genericErrorMessage);
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <>
      <form onSubmit={formSubmitHandler}>
        <TextField
          id="firstName"
          name="firstName"
          label="First Name"
          variant="outlined"
          autoComplete="given-name"
          required={true}
          margin="normal"
          fullWidth
          value={firstName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
        />
        <TextField
          id="lastName"
          name="lastName"
          label="Last Name"
          variant="outlined"
          autoComplete="family-name"
          required={true}
          margin="normal"
          fullWidth
          value={lastName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
        />
        <TextField
          id="email"
          name="email"
          label="Email"
          variant="outlined"
          autoComplete="email"
          required={true}
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
          variant="outlined"
          autoComplete="new-password"
          required={true}
          margin="normal"
          fullWidth
          type="password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        />
        {error && <Typography color="error">{error}</Typography>}
        <LoadingButton type="submit" color="primary" loading={isSubmitting} variant="contained">
          Sign up
        </LoadingButton>
      </form>
    </>
  );
};

export default Signup;
