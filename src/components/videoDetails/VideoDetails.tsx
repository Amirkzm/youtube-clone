import { useEffect, useState } from "react";
import useLazyFetch from "../../hooks/useLazyFetch";
import { useParams } from "react-router-dom";
import { Stack } from "@mui/system";
import ReactPlayer from "react-player";
import { Box, Paper, Typography } from "@mui/material";
import CommentItem from "./CommentItem";
import RelatedVideosSidebar from "./RelatedVideosSidebar";

const VideoDetails = () => {
  const { sendRequest, isLoading, isError, result } = useLazyFetch();
  const { sendRequest: sendCommentRequest, result: commentResult } =
    useLazyFetch();

  // const [videos, setVideos] = useState<any[]>([]);
  const [showFullDescription, setshowFullDescription] =
    useState<boolean>(false);

  const { id: videoId } = useParams();

  useEffect(() => {
    sendRequest(
      `videos?part=contentDetails%2Csnippet%2Cstatistics&id=${videoId}`
    );
    sendCommentRequest(
      `commentThreads?part=snippet&maxResults=20&videoId=${videoId}`
    );
    // setVideos(result?.items);
  }, [sendRequest]);

  const VIDEO_URL = `https://www.youtube.com/watch?v=${videoId}`;

  // const {
  //   statistics: { viewCount, likeCount },
  // } = videos;

  return (
    <Stack sx={{ width: "100vw" }} direction={"row"}>
      <Stack sx={{ m: 10 }}>
        <Box sx={{ width: "60vw" }}>
          <ReactPlayer url={VIDEO_URL} controls width={"100%"} height={800} />
        </Box>
        <Stack sx={{ mt: 5, gap: 2 }}>
          <Typography
            variant="h1"
            fontFamily={"youtube sans"}
            sx={{ fontSize: { xs: "clamp(16px,5vw,19px)" } }}
          >
            {result?.items[0]?.snippet?.title}
          </Typography>
          {/* <Paper
            sx={{
              maxHeight: showFullDescription ? "max-content" : "60px",
              overflow: "hidden",
            }}
          >
            <Typography
              variant="h2"
              fontFamily={"youtube sans"}
              sx={{ fontSize: { xs: "clamp(16px,5vw,19px)" } }}
            >
              {result?.items[0]?.snippet?.description}
            </Typography>
          </Paper>
          <Button sx={{ display: "inline-block" }}>
            {showFullDescription ? "show less" : "show more"}
          </Button> */}
          <Paper sx={{ display: "flex", gap: 4, p: 2 }}>
            <Typography>
              {result?.items[0]?.statistics?.viewCount}{" "}
              <Typography component={"span"} sx={{ color: "primary.main" }}>
                Views
              </Typography>
            </Typography>
            <Typography>
              liked by{" "}
              <Typography component={"span"} sx={{ color: "primary.main" }}>
                {result?.items[0]?.statistics?.likeCount}
              </Typography>{" "}
              people
            </Typography>
          </Paper>
        </Stack>
        <Stack>
          <Typography variant="h2">Comments:</Typography>
          {commentResult?.items.map((item: any) => {
            return (
              <CommentItem
                authorAvatar={
                  item?.snippet?.topLevelComment?.snippet?.authorProfileImageUrl
                }
                authorName={
                  item?.snippet?.topLevelComment?.snippet?.authorDisplayName
                }
                key={item.id}
              >
                {item?.snippet?.topLevelComment?.snippet?.textDisplay}
              </CommentItem>
            );
          })}
        </Stack>
      </Stack>
      <Box sx={{ mt: 10, mr: 10 }}>
        <RelatedVideosSidebar videoId={videoId} />
      </Box>
    </Stack>
  );
};

export default VideoDetails;
