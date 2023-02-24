import { Box } from "@mui/material";
import React from "react";

const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: "56px",
        left: 0,
        width: "100vw",
        p: 0,
        pt: 2,
        bgcolor: "common.black",
        minHeight: "100vh",
      }}
    >
      {children}
    </Box>
  );
};

export default PageContainer;
