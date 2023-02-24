import { Box, Stack } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useLazyFetch from "../hooks/useLazyFetch";
import PageContainer from "../components/PageContainer";
import VideoFeed from "../components/videos/VideoFeed";
import { usePagination } from "../hooks";
import { Pagination } from "../components";

const SearchFeed = () => {
  const { sendRequest, isError, isLoading, result } = useLazyFetch();
  // const [pagitnationCount, setPagitnationCount] = useState<number>(1);
  // const [currentPage, setCurrentPage] = useState<number>(1);
  // const [pageToken, setPageToken] = useState<string>("");

  const { searchTerm: query } = useParams();
  const { currentPage, pageToken, pageHandler } = usePagination(result);

  useEffect(() => {
    if (currentPage === 1) {
      sendRequest(
        `search?q=${query}&part=snippet%2Cid&regionCode=US&maxResults=50&order=date`
      );
    } else {
      sendRequest(
        `search?q=${query}&part=snippet%2Cid&regionCode=US&maxResults=50&order=date&pageToken=${pageToken}`
      );
    }
  }, [sendRequest, query, pageToken, currentPage]);

  // useEffect(() => {
  //   if (result) {
  //     setPagitnationCount(
  //       Math.floor(
  //         result?.pageInfo?.totalResults / result?.pageInfo?.resultsPerPage
  //       )
  //     );
  //   }
  // }, [result]);

  // const PageHandler = (event: React.ChangeEvent<unknown>, page: number) => {
  //   if (page > currentPage) {
  //     setPageToken(result?.nextPageToken);
  //   } else if (page < currentPage) {
  //     setPageToken(result?.prevPageToken);
  //   }
  //   setCurrentPage(page);
  // };

  return (
    <PageContainer>
      <Stack sx={{ width: "100%", alignItems: "center" }}>
        <Box sx={{ width: "80vw" }}>
          <VideoFeed result={result} isLoading={isLoading} />
        </Box>
        {/* <Pagination
          count={paginationCount}
          color="primary"
          sx={{ alignSelf: "center", m: "40px" }}
          page={currentPage}
          onPageChange={pageHandler}
        /> */}
        <Pagination page={currentPage} onChangePage={pageHandler} />
      </Stack>
    </PageContainer>
  );
};

export default SearchFeed;
