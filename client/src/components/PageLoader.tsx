import { Box, CircularProgress } from "@mui/material";

export const PageLoader = () => {
  // This method of centering on the page comes from https://timmousk.com/blog/react-center/
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <CircularProgress />
    </Box>
  );
};
