import { Box, Skeleton, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import ChannelCard from "./ChannelCard";
import VideoItem from "./VideoItem";

interface VideoFeedProps {
  category: string;
  result: any;
  isLoading: boolean;
}

const VideoFeed = (props: VideoFeedProps) => {
  const { category, result, isLoading } = props;

  console.log(isLoading);
  return (
    <Stack
      direction={"row"}
      flexWrap="wrap"
      sx={{ mt: 10, gap: 4, justifyContent: "center" }}
    >
      {!isLoading &&
        result?.items.map((item: any) => {
          return (
            <>
              {item?.id?.channelId && (
                <Link to={`/channel/${item?.id?.channelId}`}>
                  <ChannelCard channelInfo={item} />
                </Link>
              )}
              {item?.id?.videoId && (
                <VideoItem key={item?.id.videoId} videoDetail={item} />
              )}
            </>
          );
        })}
      {isLoading &&
        new Array(20).fill(1).map(() => {
          return (
            <Stack sx={{ width: 340, height: 300, gap: 4 }}>
              <Skeleton variant="rectangular" width={340} height={300} />
              <Skeleton />
              <Skeleton width="60%" />
            </Stack>
          );
        })}
    </Stack>
  );
};

export default VideoFeed;

// AIzaSyBUGsiwwA5aodDhJ78NyCvYKKJJ-tEPZNA
{
  /* <Skeleton variant="rectangular" width={210} height={118} /> */
}
