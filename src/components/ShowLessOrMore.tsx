import { Box, Button, Collapse, Stack } from "@mui/material";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";

interface ShowLessOrMoreProps {
  children: ReactNode;
  useCase: "comment" | "description";
}

const ShowLessOrMore = (props: ShowLessOrMoreProps) => {
  const { children, useCase } = props;
  const [showMore, setShowMore] = useState<boolean>(false);
  const [showCollapse, setShowCollapse] = useState<boolean>(true);
  const [childrenHeight, setChildrenHeight] = useState<number>(0);

  const measureRef = useCallback((node: HTMLDivElement) => {
    if (node) {
      const height = node.getBoundingClientRect().height;
      setChildrenHeight(height);
    }
  }, []);
  //Second-approach
  // useEffect(() => {
  //   if (divRef.current) {
  //     const height = divRef.current.getBoundingClientRect().height;
  //     if (useCase === "description" && height !== 0 && height < 54) {
  //       setShowCollapse(false);
  //     }
  //     if (useCase === "comment" && height < 80) {
  //       setShowCollapse(false);
  //     }
  //   }
  // }, [useCase]);

  useEffect(() => {
    if (
      useCase === "description" &&
      childrenHeight !== 0 &&
      childrenHeight < 45
    ) {
      setShowCollapse(false);
    }
    if (useCase === "comment" && childrenHeight !== 0 && childrenHeight < 80) {
      console.log("children height inside useEffect = ", childrenHeight);
      setShowCollapse(false);
    }
  }, [useCase, childrenHeight]);

  return (
    <Stack
      sx={{
        alignItems: "flex-start",
      }}
    >
      {showCollapse && (
        <>
          <Collapse
            in={showMore}
            collapsedSize={useCase === "comment" ? 74 : 45}
          >
            <div
              // ref={(node: HTMLDivElement) => {
              //   return setChildrenHeight(node?.getBoundingClientRect().height);
              // }}
              ref={measureRef}
              // ref={divRef}
            >
              {children}
            </div>
          </Collapse>
          <Button
            onClick={() => setShowMore((prev) => !prev)}
            sx={{ pl: useCase === "comment" ? 14 : 0 }}
          >
            {showMore ? "Show less" : "Show more"}
          </Button>
        </>
      )}
      {!showCollapse && <Box>{children}</Box>}
    </Stack>
  );
};

export default ShowLessOrMore;
