import { useEffect } from "react";
import useLazyFetch from "../../hooks/useLazyFetch";
import { useParams } from "react-router-dom";
import { Stack } from "@mui/system";
import ReactPlayer from "react-player";
import { Box, Paper, Typography } from "@mui/material";
import RelatedVideosSidebar from "./RelatedVideosSidebar";
import ShowLessOrMore from "../ShowLessOrMore";
import PageContainer from "../PageContainer";
import CommentList from "./CommentList";

const VideoDetails = () => {
  const { sendRequest, isLoading, isError, result } = useLazyFetch();

  const { id: videoId } = useParams();

  useEffect(() => {
    sendRequest(
      `videos?part=contentDetails%2Csnippet%2Cstatistics&id=${videoId}`
    );
  }, [sendRequest]);

  const VIDEO_URL = `https://www.youtube.com/watch?v=${videoId}`;

  return (
    <PageContainer>
      {!isLoading && (
        <Stack sx={{ width: "100vw" }} direction={"row"}>
          <Stack sx={{ justifySelf: "center" }}>
            <Box
              sx={{
                position: "relative",
                overflow: "hidden",
                width: { xs: "95%", lg: "100%" },
                pt: "56.25%",
                ml: 2,
              }}
            >
              <ReactPlayer
                url={VIDEO_URL}
                controls
                width={"100%"}
                height={"100%"}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                }}
              />
            </Box>
            <Stack sx={{ pt: 5, gap: 2, px: 2 }}>
              <Typography
                variant="h1"
                fontFamily={"youtube sans"}
                sx={{
                  fontSize: { xs: "clamp(16px,5vw,19px)" },
                  display: { xs: "none", md: "initial" },
                }}
              >
                {result?.items[0]?.snippet?.title}
              </Typography>

              <ShowLessOrMore useCase="description">
                <Box sx={{ height: "fit-content" }}>
                  {result?.items[0]?.snippet?.description}
                </Box>
              </ShowLessOrMore>

              <Paper
                sx={{ display: "flex", gap: 4, p: 2, maxWidth: "max-content" }}
              >
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
            <CommentList videoId={videoId} />
          </Stack>
          <Box sx={{ px: 5, display: { xs: "none", lg: "initial" } }}>
            <RelatedVideosSidebar videoId={videoId} />
          </Box>
        </Stack>
      )}
    </PageContainer>
  );
};

export default VideoDetails;
