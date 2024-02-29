import { CssBaseline } from "@mui/material";
import { grey } from "@mui/material/colors";
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendTheme,
} from "@mui/material/styles";

interface Props {
  children: React.ReactNode;
}

declare module "@mui/material/styles" {
  interface PaletteOptions {
    blockqoute: {
      background: string;
    };
  }
  interface Palette {
    blockqoute: {
      background: string;
    };
  }
}

// Seems like this is the only way to get the theme to work with the css vars provider.
// No matter how I follow the example from the MUI documentation I get unsafe assignment
// errors, so I assume it is a bug in their current experimental stuff.
const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        blockqoute: {
          background: grey[200],
        },
      },
    },
    dark: {
      palette: {
        blockqoute: {
          background: grey[900],
        },
      },
    },
  },
  typography: {
    fontFamily: "Inter Variable",
  },
});

const AppTheme = ({ children }: Props) => {
  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      {children}
    </CssVarsProvider>
  );
};

export default AppTheme;
