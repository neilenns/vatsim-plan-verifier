import { LoadingButton } from "@mui/lab";
import { TextField } from "@mui/material";
import { useFetcher } from "react-router-dom";

import React, { useState } from "react";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const fetcher = useFetcher();

  return (
    <>
      <fetcher.Form method="post">
        <TextField
          id="firstName"
          name="firstName"
          label="First Name"
          variant="outlined"
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
          required={true}
          margin="normal"
          fullWidth
          type="password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        />
        <LoadingButton
          type="submit"
          color="primary"
          loading={fetcher.state === "submitting"}
          variant="contained"
        >
          Sign up
        </LoadingButton>
      </fetcher.Form>
    </>
  );
};

export default Signup;
