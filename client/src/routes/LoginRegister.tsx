import { Container, Card, Tabs, Tab, Box } from "@mui/material";
import Register from "../components/Register";
import Login from "../components/Login";
import { Link, useMatches } from "react-router-dom";

const LoginRegister: React.FC = () => {
  const currentTab = useMatches()[0]!.id;

  return (
    <Box
      sx={{
        position: "absolute",
        top: "40px",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      <Container maxWidth="xs">
        <Card>
          <Tabs value={currentTab} indicatorColor="primary" textColor="primary" centered>
            <Tab label="Login" value="login" component={Link} to={"/login"} />
            <Tab label="Register" value="register" component={Link} to={"/register"} />
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
