import { Box, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface ChannelLogoProps {
  channelInfo: any;
}
const ChannelLogo = ({ channelInfo }: ChannelLogoProps) => {
  console.log(channelInfo);
  return (
    <Stack>
      <Box
        sx={{
          width: 140,
          background: "transparent",
          alignSelf: "center",
        }}
      >
        <CardMedia
          component="img"
          height={140}
          image={channelInfo?.snippet?.thumbnails?.high?.url}
          alt={channelInfo?.snippet?.title}
          sx={{ borderRadius: "50%", width: 140, alignSelf: "center" }}
        />
      </Box>
      <Box sx={{ alignSelf: "center" }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {channelInfo?.snippet?.title}{" "}
            <CheckCircleIcon
              sx={{ fontSize: "14px", color: "blue", ml: "5px" }}
            />
          </Typography>
          {channelInfo?.statistics && (
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign={"center"}
            >
              {parseInt(
                channelInfo?.statistics?.subscriberCount
              ).toLocaleString("en-US")}{" "}
              Subscribers
            </Typography>
          )}
        </CardContent>
      </Box>
    </Stack>
  );
};

export default ChannelLogo;
