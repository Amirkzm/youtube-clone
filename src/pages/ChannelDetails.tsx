import { Box, styled } from "@mui/material";
import { Stack } from "@mui/system";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useLazyFetch from "../hooks/useLazyFetch";
import ChannelLogo from "../components/channels/ChannelLogo";
import VideoFeed from "../components/videos/VideoFeed";
import { usePagination } from "../hooks";
import { Pagination } from "../components";

const ChannelCardWrapper = styled(Box)((theme) => ({
  position: "absolute",
  top: "5%",
  left: "50%",
  transform: "translateX(-50%)",
}));

const ChannelDetails = () => {
  const { sendRequest, isLoading, isError, result } = useLazyFetch();

  const {
    sendRequest: sendRequestVids,
    isLoading: isLoadingVid,
    isError: isErrorVid,
    result: vidResult,
  } = useLazyFetch();
  const { id: channelId } = useParams();

  const { currentPage, pageToken, pageHandler } = usePagination(vidResult);

  useEffect(() => {
    sendRequest(`channels?part=snippet&id=${channelId}`);
    if (currentPage === 1) {
      sendRequestVids(
        `search?channelId=${channelId}&part=snippet%2Cid&order=date&maxResults=20`
      );
    } else {
      sendRequestVids(
        `search?channelId=${channelId}&part=snippet%2Cid&order=date&maxResults=20&pageToken=${pageToken}`
      );
    }
  }, [sendRequest, sendRequestVids, channelId, pageToken]);

  return (
    <Stack
      sx={{
        justifyContent: "space-between",
        position: "relative",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          background: "linear-gradient(to right,#e66465, #9198e5);",
          width: "100vw",
          height: "200px",
        }}
      ></Box>
      <ChannelCardWrapper>
        <ChannelLogo channelInfo={result?.items[0]} />
      </ChannelCardWrapper>
      <Box sx={{ mt: 20 }}>
        <VideoFeed
          result={vidResult}
          isLoading={isLoadingVid}
          showChannels={false}
        />
      </Box>
      <Pagination page={currentPage} onChangePage={pageHandler} />
    </Stack>
  );
};

export default ChannelDetails;
