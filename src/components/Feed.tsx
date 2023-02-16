import { Box, Grid, Pagination, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useCategoryContext } from "../context/CategoryContext";
import useLazyFetch from "../hooks/useLazyFetch";
import PageContainer from "./PageContainer";
import Sidebar from "./Sidebar";
import VideoFeed from "./VideoFeed";

const Feed = () => {
  // const [selectedCategory, setSelectedCategory] = useState<string>("New");
  const { selectedCategory, setSelectedCategory } = useCategoryContext();
  const [pagitnationCount, setPagitnationCount] = useState<number>(10);

  console.log(selectedCategory);

  // const changeCategory = (categoryName: string) => {
  //   setSelectedCategory(categoryName);
  // };

  const { sendRequest, isLoading, isError, result } =
    useLazyFetch(selectedCategory);

  useEffect(() => {
    sendRequest(`search?part=snippet&maxResults=20&q=${selectedCategory}`);
  }, [sendRequest]);

  useEffect(() => {
    if (result) {
      setPagitnationCount(
        Math.floor(
          result?.pageInfo?.totalResults / result?.pageInfo?.resultsPerPage
        )
      );
    }
  }, [result]);

  return (
    <PageContainer>
      <Stack>
        <Grid container id="gridcontainerfeed" sx={{ width: "100vw" }}>
          <Box
            sx={{ display: { xs: "none", lg: "block" } }}
            component={Grid}
            item
            lg={2}
          >
            <Sidebar />
          </Box>
          <Grid item xs={12} lg={10} sx={{ justifyContent: "center" }}>
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
    </PageContainer>
  );
};

export default Feed;
