import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

import {
  demoThumbnailUrl,
  demoVideoUrl,
  demoVideoTitle,
  demoChannelUrl,
  demoChannelTitle,
} from "../utils/constants";

const VideoItem = ({ videoDetail }: any) => {
  const { id, snippet } = videoDetail;

  const title =
    snippet.title.length > 50
      ? snippet.title.slice(0, 50) + "..."
      : snippet.title.slice(0, 50);

  return (
    <Card
      sx={{
        maxWidth: 345,
        width: 340,
        borderRadius: 4,
        transition: "all 0.7",
        "&:hover": { zIndex: 100, transform: "scale(1.1)" },
      }}
    >
      <CardActionArea sx={{ height: "100%" }}>
        <CardMedia
          component="img"
          height="140"
          image={snippet?.thumbnails?.high?.url || demoThumbnailUrl}
          alt={snippet?.title}
        />
        <CardContent>
          <Link to={id.videoId ? `/video/${id.videoId}` : demoVideoUrl}>
            <Typography
              gutterBottom
              variant="subtitle1"
              component="div"
              sx={{
                fontsize: "clamp(18px,5vw,20px)",
                fontWeight: "bold",
                color: "text.primary",
              }}
            >
              {title}
            </Typography>
          </Link>
          <Link
            to={
              snippet?.channelId
                ? `/channel/${snippet?.channelId}`
                : demoChannelUrl
            }
          >
            <Typography variant="subtitle2" color="text.secondary">
              {snippet?.channelTitle}
            </Typography>
          </Link>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default VideoItem;
