import { Box, Skeleton, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ChannelCard from "./ChannelCard";
import VideoItem from "./VideoItem";

interface VideoFeedProps {
  category?: string;
  result: any;
  isLoading: boolean;
}

const VideoFeed = (props: VideoFeedProps) => {
  const { category, result, isLoading } = props;

  return (
    <Stack sx={{ mt: 10 }}>
      <Typography variant="h1" sx={{ alignSelf: "start", pl: 5 }}>
        <Typography
          component={"span"}
          variant="h1"
          sx={{ color: "primary.main" }}
        >
          {category}
        </Typography>
        {" Videos"}
      </Typography>
      <Stack
        direction={"row"}
        flexWrap="wrap"
        sx={{ mt: 10, gap: 4, justifyContent: "center" }}
      >
        {!isLoading &&
          result?.items.map((item: any, index: number) => {
            return (
              <Box key={index}>
                {item?.id?.channelId && (
                  <Link to={`/channel/${item?.id?.channelId}`}>
                    <ChannelCard channelInfo={item} />
                  </Link>
                )}
                {item?.id?.videoId && (
                  <Link to={`/video/${item?.id?.videoId}`}>
                    <VideoItem key={item?.id.videoId} videoDetail={item} />
                  </Link>
                )}
              </Box>
            );
          })}
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
  );
};

export default VideoFeed;

// AIzaSyBUGsiwwA5aodDhJ78NyCvYKKJJ-tEPZNA
{
  /* <Skeleton variant="rectangular" width={210} height={118} /> */
}
