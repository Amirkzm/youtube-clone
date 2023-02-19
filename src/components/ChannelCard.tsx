import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface ChannelCardProps {
  channelInfo: any;
}

const ChannelCard = ({ channelInfo }: ChannelCardProps) => {
  return (
    <Stack
      sx={{
        width: 345,
        height: 256,
        // bgcolor: "primary.main",
        "&:hover": { zIndex: 100, transform: "scale(1.1)" },
        // p: 5,
        // borderRadius: "50%",
      }}
    >
      <CardActionArea
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <CardMedia
          component="img"
          height="140"
          image={channelInfo?.snippet?.thumbnails?.high?.url}
          alt={channelInfo?.snippet?.title}
          sx={{ borderRadius: "50%", width: 140 }}
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
              textAlign: "center",
            }}
          >
            {channelInfo?.snippet?.title}{" "}
            <CheckCircleIcon
              sx={{ fontSize: "14px", color: "red", ml: "5px" }}
            />
          </Typography>
          {channelInfo?.statistics && (
            <Typography variant="subtitle2" color="text.secondary">
              {parseInt(
                channelInfo?.statistics?.subscriberCount
              ).toLocaleString("en-US")}{" "}
              Subscribers
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Stack>
  );
};

export default ChannelCard;
