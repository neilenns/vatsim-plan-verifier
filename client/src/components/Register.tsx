import { LoadingButton } from "@mui/lab";
import { FormHelperText, TextField, Typography } from "@mui/material";

import React, { useState } from "react";
import { Form, useNavigation } from "react-router-dom";

const Register = () => {
  const navigation = useNavigation();
  const [error] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerSuccess] = useState(false);

  return (
    <>
      {registerSuccess && (
        <Typography color="success">
          Registration successful! You'll be notified once your registration is approved.
        </Typography>
      )}
      {!registerSuccess && (
        <Form>
          <FormHelperText error={error !== ""}>{error}</FormHelperText>
          <TextField
            label="First Name"
            variant="outlined"
            required={true}
            margin="normal"
            fullWidth
            value={firstName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            required={true}
            margin="normal"
            fullWidth
            value={lastName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
          />
          <TextField
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
            loading={navigation.state === "submitting"}
            variant="contained"
          >
            Register
          </LoadingButton>
        </Form>
      )}
    </>
  );
};

export default Register;
