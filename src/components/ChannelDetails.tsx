import { Box, Pagination, styled } from "@mui/material";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useLazyFetch from "../hooks/useLazyFetch";
import ChannelLogo from "./ChannelLogo";
import VideoFeed from "./VideoFeed";

const ChannelCardWrapper = styled(Box)((theme) => ({
  position: "absolute",
  top: "5%",
  left: "50%",
  transform: "translateX(-50%)",
}));

const ChannelDetails = () => {
  const { sendRequest, isLoading, isError, result } = useLazyFetch();
  const [pagitnationCount, setPagitnationCount] = useState<number>(10);
  const {
    sendRequest: sendRequestVids,
    isLoading: isLoadingVid,
    isError: isErrorVid,
    result: vidResult,
  } = useLazyFetch();
  const { id: channelId } = useParams();

  useEffect(() => {
    sendRequest(`channels?part=snippet&id=${channelId}`);
    sendRequestVids(
      `search?channelId=${channelId}&part=snippet%2Cid&order=date&maxResults=20`
    );
  }, [sendRequest, sendRequestVids]);

  useEffect(() => {
    if (vidResult) {
      setPagitnationCount(
        Math.floor(
          vidResult?.pageInfo?.totalResults /
            vidResult?.pageInfo?.resultsPerPage
        )
      );
    }
  }, [vidResult]);

  return (
    <Stack
      sx={{
        justifyContent: "space-between",
        position: "relative",
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
        <VideoFeed result={vidResult} isLoading={isLoadingVid} />
      </Box>
      <Pagination
        count={pagitnationCount}
        color="primary"
        sx={{ alignSelf: "center", m: "40px" }}
      />
    </Stack>
  );
};

export default ChannelDetails;
