import { Box, Grid, Pagination, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useCategoryContext } from "../context/CategoryContext";
import useLazyFetch from "../hooks/useLazyFetch";
import PageContainer from "./PageContainer";
import Sidebar from "./Sidebar";
import VideoFeed from "./VideoFeed";

const Feed = () => {
  const { selectedCategory, setSelectedCategory } = useCategoryContext();
  const [pagitnationCount, setPagitnationCount] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageToken, setPageToken] = useState<string>("");

  const { sendRequest, isLoading, isError, result } =
    useLazyFetch(selectedCategory);

  useEffect(() => {
    if (currentPage === 1) {
      sendRequest(`search?part=snippet&maxResults=20&q=${selectedCategory}`);
    } else {
      sendRequest(
        `search?part=snippet&maxResults=20&q=${selectedCategory}&pageToken=${result?.nextPageToken}`
      );
    }
  }, [pageToken, currentPage, selectedCategory]);

  useEffect(() => {
    if (result) {
      setPagitnationCount(
        Math.floor(
          result?.pageInfo?.totalResults / result?.pageInfo?.resultsPerPage
        )
      );
    }
  }, [result]);

  const PageHandler = (event: React.ChangeEvent<unknown>, page: number) => {
    if (page > currentPage) {
      setPageToken(result?.nextPageToken);
    } else if (page < currentPage) {
      setPageToken(result?.prevPageToken);
    }
    setCurrentPage(page);
  };

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
          page={currentPage}
          onChange={PageHandler}
        />
      </Stack>
    </PageContainer>
  );
};

export default Feed;
