import { useEffect, useState } from "react";
import useLazyFetch from "../../hooks/useLazyFetch";
import { useParams } from "react-router-dom";
import { Stack } from "@mui/system";
import ReactPlayer from "react-player";

const VideoDetails = () => {
  const { sendRequest, isLoading, isError, result } = useLazyFetch();
  const [play, setPlay] = useState<boolean>(false);

  const { id: videoId } = useParams();
  // const { id: channelId } = useParams();

  useEffect(() => {
    sendRequest(
      `videos?part=contentDetails%2Csnippet%2Cstatistics&id=${videoId}`
    );
  }, [sendRequest]);

  const VIDEO_URL = `https://www.youtube.com/watch?v=${videoId}`;
  console.log(VIDEO_URL);

  return (
    <Stack>
      <ReactPlayer url={VIDEO_URL} playing={play} width={1200} height={800} />
      <button onClick={() => setPlay(!play)}>play</button>
    </Stack>
  );
};

export default VideoDetails;
