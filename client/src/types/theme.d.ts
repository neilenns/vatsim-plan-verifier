import { Theme, ThemeOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface CustomTheme extends Theme {
    status: {
      ok: string;
      warning: string;
      error: string;
    };
  }
  // allow configuration using `createTheme`
  interface CustomThemeOptions extends ThemeOptions {
    status?: {
      ok?: string;
      warning?: string;
      error?: string;
    };
  }
  export function createTheme(options?: CustomThemeOptions): CustomTheme;
}
