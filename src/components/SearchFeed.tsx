import { Box, Pagination, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useLazyFetch from "../hooks/useLazyFetch";
import VideoFeed from "./VideoFeed";

const SearchFeed = () => {
  const { sendRequest, isError, isLoading, result } = useLazyFetch();
  const [pagitnationCount, setPagitnationCount] = useState<number>(10);

  const { searchTerm: query } = useParams();

  useEffect(() => {
    sendRequest(
      `search?q=${query}&part=snippet%2Cid&regionCode=US&maxResults=50&order=date`
    );
  }, [sendRequest, query]);

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
    <Stack sx={{ width: "100vw", alignItems: "center" }}>
      <Box sx={{ width: "80vw" }}>
        <VideoFeed result={result} isLoading={isLoading} />
      </Box>
      <Pagination
        count={pagitnationCount}
        color="primary"
        sx={{ alignSelf: "center", m: "40px" }}
      />
    </Stack>
  );
};

export default SearchFeed;
