// From https://github.com/mui/material-ui/blob/36523fa8232e5aaabf86dbfb682f5773d48a2321/packages/mui-system/src/cssVars/useCurrentColorScheme.ts#L8C1-L9C1
// As far as I can tell this isn't exported into the types file anywhere.
type Mode = "light" | "dark" | "system";

export interface IAuth0User {
  _id: string;
  sortByCreatedAt: boolean;
  autoHideImported: boolean;
  colorMode: Mode;
  email?: string;
  hideInformational: boolean;
  isPending: boolean;
  roles: string[];
  streamingMode: boolean;
  sub: string;
}
