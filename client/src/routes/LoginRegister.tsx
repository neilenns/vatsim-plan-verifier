import { Container, Card, Tabs, Tab, Box } from "@mui/material";
import Register from "../components/Register";
import Login from "../components/Login";
import { useState } from "react";

const LoginRegister: React.FC = () => {
  const [currentTab, setCurrentTab] = useState("login");

  function handleTabChange(_event: React.SyntheticEvent, newValue: string) {
    setCurrentTab(newValue);
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Container maxWidth="xs">
        <Card>
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Login" value="login" />
            <Tab label="Register" value="register" />
          </Tabs>
          <Box p={3}>
            {currentTab === "login" && <Login />}
            {currentTab === "register" && <Register />}
          </Box>
        </Card>
      </Container>
    </Box>
  );
};

export default LoginRegister;
