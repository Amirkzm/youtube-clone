import { Container } from "@mui/material";
import React from "react";

const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container
      sx={{
        position: "absolute",
        top: "56px",
        left: 0,
        width: "100vw",
        height: "92vh",
        p: 0,
        pt: 2,
      }}
      id="pageContainer"
    >
      {children}
    </Container>
  );
};

export default PageContainer;
