import { ThemeProvider } from "@emotion/react";
import { CssBaseline, createTheme } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

type Props = {
  children: React.ReactNode;
};

const defaultTheme = createTheme({
  typography: {
    fontFamily: "Inter Variable",
  },
});

const darkTheme = createTheme({
  typography: {
    fontFamily: "Inter Variable",
  },
  palette: {
    mode: "dark",
  },
});

const AppTheme = ({ children }: Props): JSX.Element => {
  const { darkMode } = useContext(AppContext);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : defaultTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default AppTheme;
