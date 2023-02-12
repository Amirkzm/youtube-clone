import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface ChannelCardProps {
  channelInfo: any;
}

const ChannelCard = ({ channelInfo }: ChannelCardProps) => {
  return (
    <Card sx={{ width: 340 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={channelInfo?.snippet?.thumbnails?.high?.url}
          alt={channelInfo?.snippet?.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {channelInfo?.snippet?.title}{" "}
            <CheckCircleIcon
              sx={{ fontSize: "14px", color: "gray", ml: "5px" }}
            />
          </Typography>
          {channelInfo?.statistics && (
            <Typography variant="body2" color="text.secondary">
              {parseInt(
                channelInfo?.statistics?.subscriberCount
              ).toLocaleString("en-US")}{" "}
              Subscribers
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ChannelCard;
