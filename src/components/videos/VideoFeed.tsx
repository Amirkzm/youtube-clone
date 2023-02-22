import { Box, Pagination, Skeleton, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useLazyFetch from "../../hooks/useLazyFetch";
import ChannelCard from "../channels/ChannelCard";
import VideoItem from "./VideoItem";

interface VideoFeedProps {
  selectedCategory?: string;
  // externalData?: any;
  // externalLoading?: boolean;
  result: any;
  isLoading: boolean;
  showChannels?: boolean;
  // useExternalData?: boolean;
  // parentPageHandler?: (page: number) => void;
}

const VideoFeed = (props: VideoFeedProps) => {
  const {
    selectedCategory,
    showChannels = true,
    // externalData = null,
    // externalLoading = true,
    // useExternalData = false,
    // parentPageHandler,
    result,
    isLoading,
  } = props;

  // const [pagitnationCount, setPagitnationCount] = useState<number>(10);
  // const [currentPage, setCurrentPage] = useState<number>(1);
  // const [pageToken, setPageToken] = useState<string>("");
  // const { sendRequest, isLoading, isError, result } =
  //   useLazyFetch(selectedCategory);

  // useEffect(() => {
  //   if (!useExternalData) {
  //     if (currentPage === 1) {
  //       sendRequest(`search?part=snippet&maxResults=20&q=${selectedCategory}`);
  //     } else {
  //       sendRequest(
  //         `search?part=snippet&maxResults=20&q=${selectedCategory}&pageToken=${pageToken}`
  //       );
  //     }
  //   }
  // }, [pageToken, currentPage, selectedCategory]);

  // const data = useExternalData ? externalData : result;
  // const reqIsLoading = useExternalData ? externalLoading : isLoading;

  // const PageHandler = (event: React.ChangeEvent<unknown>, page: number) => {
  //   if (!useExternalData) {
  //     if (page > currentPage) {
  //       setPageToken(data?.nextPageToken);
  //     } else if (page < currentPage) {
  //       setPageToken(data?.prevPageToken);
  //     }
  //   } else {
  //     parentPageHandler!(page);
  //   }
  //   setCurrentPage(page);
  // };

  const displayChannels = !showChannels
    ? "none"
    : isAnyChannel(result)
    ? "block"
    : "none";

  return (
    <Stack sx={{ mt: 10 }}>
      <Stack sx={{ display: displayChannels }}>
        <Typography variant="h1" sx={{ alignSelf: "start", pl: 5 }}>
          <Typography
            component={"span"}
            variant="h1"
            sx={{ color: "primary.main" }}
          >
            {selectedCategory}
          </Typography>
          {" Channels"}
        </Typography>

        <Stack
          direction={"row"}
          flexWrap="wrap"
          sx={{ mt: 10, gap: 4, justifyContent: "center" }}
        >
          {!isLoading &&
            result?.items.map(
              (item: any, index: number) =>
                item?.id?.channelId && (
                  <Box key={index}>
                    <Link to={`/channel/${item?.id?.channelId}`}>
                      <ChannelCard channelInfo={item} />
                    </Link>
                  </Box>
                )
            )}
          {isLoading &&
            new Array(20).fill(1).map((item, index) => {
              return (
                <Stack sx={{ width: 340, height: 300, gap: 4 }} key={index}>
                  <Skeleton variant="rectangular" width={340} height={300} />
                  <Skeleton />
                  <Skeleton width="60%" />
                </Stack>
              );
            })}
        </Stack>
      </Stack>
      <Stack>
        <Typography variant="h1" sx={{ alignSelf: "start", pl: 5 }}>
          <Typography
            component={"span"}
            variant="h1"
            sx={{ color: "primary.main" }}
          >
            {selectedCategory}
          </Typography>
          {" Videos"}
        </Typography>

        <Stack
          direction={"row"}
          flexWrap="wrap"
          sx={{ mt: 10, gap: 4, justifyContent: "center" }}
        >
          {!isLoading &&
            result?.items.map(
              (item: any, index: number) =>
                item?.id?.videoId && (
                  <Box key={index}>
                    <Link to={`/video/${item?.id?.videoId}`}>
                      <VideoItem key={item?.id.videoId} videoDetail={item} />
                    </Link>
                  </Box>
                )
            )}
          {isLoading &&
            new Array(20).fill(1).map((item, index) => {
              return (
                <Stack sx={{ width: 340, height: 300, gap: 4 }} key={index}>
                  <Skeleton variant="rectangular" width={340} height={300} />
                  <Skeleton />
                  <Skeleton width="60%" />
                </Stack>
              );
            })}
        </Stack>
      </Stack>
      {/* <Pagination
        count={pagitnationCount}
        color="primary"
        sx={{ alignSelf: "center", m: "40px" }}
        page={currentPage}
        onChange={PageHandler}
      /> */}
    </Stack>
  );
};

const isAnyChannel = (data: any) => {
  const hasAny = data?.items?.some((item: any) => {
    if (item?.id?.channelId) {
      return true;
    }
  });
  return hasAny;
};

export default VideoFeed;

// AIzaSyBUGsiwwA5aodDhJ78NyCvYKKJJ-tEPZNA
{
  /* <Skeleton variant="rectangular" width={210} height={118} /> */
}
