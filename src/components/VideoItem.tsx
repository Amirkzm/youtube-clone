import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import DOMPurify from "dompurify";

import {
  demoThumbnailUrl,
  demoVideoUrl,
  demoChannelUrl,
} from "../utils/constants";

const VideoItem = ({ videoDetail, bgColor }: any) => {
  const { id, snippet } = videoDetail;

  const title =
    snippet.title.length > 50
      ? snippet.title.slice(0, 50) + "..."
      : snippet.title.slice(0, 50);

  return (
    <Card
      sx={{
        // maxWidth: 345,
        width: 345,
        height: 256,
        borderRadius: 4,
        transition: "all 0.7",
        "&:hover": { zIndex: 100, transform: "scale(1.1)" },
      }}
    >
      <CardActionArea sx={{ height: "100%", bgcolor: bgColor }}>
        <CardMedia
          component="img"
          height="140"
          image={snippet?.thumbnails?.high?.url || demoThumbnailUrl}
          alt={snippet?.title}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="subtitle1"
            component="div"
            sx={{
              fontsize: "clamp(18px,5vw,20px)",
              fontWeight: "bold",
              color: "text.primary",
            }}
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(title) }}
          ></Typography>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(snippet?.channelTitle),
            }}
          ></Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default VideoItem;
