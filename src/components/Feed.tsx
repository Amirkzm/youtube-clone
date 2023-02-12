import { Grid, Pagination, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import useLazyFetch from "../hooks/useLazyFetch";
import Sidebar from "./Sidebar";
import VideoFeed from "./VideoFeed";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("New");
  const [pagitnationCount, setPagitnationCount] = useState<number>(10);

  const changeCategory = (categoryName: string) => {
    setSelectedCategory(categoryName);
  };

  const { sendRequest, isLoading, isError, result } =
    useLazyFetch(selectedCategory);

  useEffect(() => {
    sendRequest(`search?part=snippet&q=${selectedCategory}&maxResults=20`);
  }, [sendRequest]);

  useEffect(() => {
    if (result) {
      setPagitnationCount(
        Math.floor(
          result?.pageInfo?.totalResults / result?.pageInfo?.resultsPerPage
        )
      );
    }
    console.log(pagitnationCount);
  }, [result]);

  return (
    <Stack>
      <Grid container id="gridcontainerfeed" sx={{ width: "100vw" }}>
        <Grid item xs={2} id="gridSidebar">
          <Sidebar changeCategory={changeCategory} />
        </Grid>
        <Grid item xs={10} sx={{ justifyContent: "center", width: "100%" }}>
          {!isError && (
            <VideoFeed
              category={selectedCategory}
              result={result}
              isLoading={isLoading}
            />
          )}
        </Grid>
      </Grid>
      <Pagination
        count={pagitnationCount}
        color="primary"
        sx={{ alignSelf: "center", m: "40px" }}
      />
    </Stack>
  );
};

export default Feed;
