import { Box, Skeleton, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useLazyFetch from "../../hooks/useLazyFetch";
import ChannelCard from "../ChannelCard";
import VideoItem from "../VideoItem";

const RelatedVideosSidebar = ({ videoId }: { videoId: string | undefined }) => {
  const { sendRequest, isLoading, isError, result } = useLazyFetch();

  useEffect(() => {
    sendRequest(
      `search?part=snippet&relatedToVideoId=${videoId}&type=video&maxResults=20`
    );
  }, [sendRequest]);

  return (
    <Stack gap={2}>
      <Typography variant="h2">
        Related{" "}
        <Typography
          component={"span"}
          variant="h2"
          sx={{ color: "primary.main" }}
        >
          Videos
        </Typography>
      </Typography>
      {!isLoading &&
        result?.items.map((item: any, index: number) => {
          return (
            <Box key={index}>
              {item?.id?.videoId && (
                <Link to={`/video/${item?.id?.videoId}`}>
                  <VideoItem
                    key={item?.id.videoId}
                    videoDetail={item}
                    bgcolor={"common.black"}
                  />
                </Link>
              )}
            </Box>
          );
        })}
      {console.log(result)}
      {isLoading ||
        (isError &&
          new Array(20).fill(1).map((item, index) => {
            return (
              <Stack sx={{ width: 340, height: 300, gap: 4 }} key={index}>
                <Skeleton variant="rectangular" width={340} height={300} />
                <Skeleton />
                <Skeleton width="60%" />
              </Stack>
            );
          }))}
    </Stack>
  );
};

export default RelatedVideosSidebar;
