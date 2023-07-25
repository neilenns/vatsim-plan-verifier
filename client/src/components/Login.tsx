import { LoadingButton } from "@mui/lab";
import { TextField } from "@mui/material";
import { useState } from "react";
import { Form, useNavigation } from "react-router-dom";

const Login = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [error] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <Form method="post">
        <TextField
          id="email"
          name="email"
          label="Email"
          required={true}
          variant="outlined"
          type="email"
          margin="normal"
          fullWidth
          value={email}
          error={error !== ""}
          helperText={error}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        />
        <TextField
          id="password"
          name="password"
          label="Password"
          required={true}
          variant="outlined"
          margin="normal"
          fullWidth
          type="password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        />
        <LoadingButton
          variant="contained"
          color="primary"
          loading={navigation.state === "submitting"}
          fullWidth
          type="submit"
        >
          Sign in
        </LoadingButton>
      </Form>
    </>
  );
};

export default Login;
