import { Container, Stack } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useLazyFetch from "../hooks/useLazyFetch";
import VideoFeed from "./VideoFeed";

const SearchFeed = () => {
  const { sendRequest, isError, isLoading, result } = useLazyFetch();
  const { searchTerm: query } = useParams();
  console.log(query);

  useEffect(() => {
    sendRequest(
      `search?q=${query}&part=snippet%2Cid&regionCode=US&maxResults=50&order=date`
    );
  }, []);
  if (result) {
    console.log(result);
  }
  return (
    <Container>
      <VideoFeed result={result} isLoading={isLoading} />
    </Container>
  );
};

export default SearchFeed;
