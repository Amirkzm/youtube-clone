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
  asChannelLogo?: boolean;
}

const ChannelCard = ({
  channelInfo,
  asChannelLogo = false,
}: ChannelCardProps) => {
  return (
    <Card
      sx={{
        width: 340,
        bgcolor: asChannelLogo ? "common.black" : "Background.paper",
      }}
    >
      <CardMedia
        component="img"
        height={asChannelLogo ? 240 : 140}
        image={channelInfo?.snippet?.thumbnails?.high?.url}
        alt={channelInfo?.snippet?.title}
        sx={{
          borderRadius: asChannelLogo ? "50%" : "0",
          width: asChannelLogo ? 240 : "100%",
        }}
      />
      <CardContent sx={{ mt: asChannelLogo ? 10 : 0 }}>
        <Typography gutterBottom variant="h5" component="div">
          {channelInfo?.snippet?.title}{" "}
          <CheckCircleIcon
            sx={{ fontSize: "14px", color: "gray", ml: "5px" }}
          />
        </Typography>
        {channelInfo?.statistics && (
          <Typography variant="body2" color="text.secondary">
            {parseInt(channelInfo?.statistics?.subscriberCount).toLocaleString(
              "en-US"
            )}{" "}
            Subscribers
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default ChannelCard;
