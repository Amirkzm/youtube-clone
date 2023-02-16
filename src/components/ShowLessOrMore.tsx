import { Box, Button, Card, Collapse, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";

const ShowLessOrMore = ({ children }: { children?: string }) => {
  const [showMore, setShowMore] = useState<boolean>(false);
  useEffect(() => {
    if (children && children.length > 250) {
      setShowMore(true);
    }
  }, [children]);

  const summarizedText = showMore ? children : children;

  const sanitizedData = () => ({
    __html: DOMPurify.sanitize(summarizedText as string),
  });

  return (
    <Stack
      sx={{
        alignItems: "flex-start",
      }}
    >
      <Collapse
        in={!showMore}
        collapsedSize={45}
        // sx={{
        //   maxHeight: showMore ? "3em" : "100em",
        //   overflow: "hidden",
        //   transition: "all 1s",
        // }}
        // dangerouslySetInnerHTML={sanitizedData()}
      >
        {children}
      </Collapse>
      <Button
        onClick={() => setShowMore((prev) => !prev)}
        sx={{ flex: "0 1 auto" }}
      >
        {showMore ? "Show more" : "Show less"}
      </Button>
    </Stack>
  );
};

export default ShowLessOrMore;
