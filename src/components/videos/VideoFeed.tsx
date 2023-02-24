import { Box, Skeleton, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ChannelCard from "../channels/ChannelCard";
import VideoItem from "./VideoItem";

interface VideoFeedProps {
  selectedCategory?: string;
  result: any;
  isLoading: boolean;
  showChannels?: boolean;
}

const VideoFeed = (props: VideoFeedProps) => {
  const { selectedCategory, showChannels = true, result, isLoading } = props;

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
