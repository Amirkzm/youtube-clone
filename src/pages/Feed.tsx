import { Box, Grid, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useCategoryContext } from "../context/CategoryContext";
import useLazyFetch from "../hooks/useLazyFetch";
import PageContainer from "../components/PageContainer";
import Sidebar from "../components/layouts/Sidebar";
import VideoFeed from "../components/videos/VideoFeed";
import { usePagination } from "../hooks";
import { Pagination } from "../components";

const Feed = () => {
  const { selectedCategory, setSelectedCategory } = useCategoryContext();
  const { sendRequest, isLoading, isError, result } =
    useLazyFetch(selectedCategory);

  const { currentPage, pageToken, pageHandler } = usePagination(result);

  useEffect(() => {
    if (currentPage === 1) {
      sendRequest(`search?part=snippet&maxResults=20&q=${selectedCategory}`);
    } else {
      sendRequest(
        `search?part=snippet&maxResults=20&q=${selectedCategory}&pageToken=${result?.nextPageToken}`
      );
    }
  }, [pageToken, currentPage, selectedCategory]);

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
                selectedCategory={selectedCategory}
                result={result}
                isLoading={isLoading}
              />
            )}
          </Grid>
        </Grid>
        <Pagination page={currentPage} onChangePage={pageHandler} />
      </Stack>
    </PageContainer>
  );
};

export default Feed;
