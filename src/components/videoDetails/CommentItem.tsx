import { Avatar, Stack, Typography } from "@mui/material";

interface CommentItemProps {
  authorAvatar: string;
  authorName: string;
  children?: React.ReactNode;
}
const CommentItem = ({
  authorAvatar,
  authorName,
  children,
}: CommentItemProps) => {
  console.log("commentitemComponent");
  return (
    <Stack
      direction={"row"}
      justifyContent="flex-start"
      gap={2}
      sx={{ mt: 5, bgcolor: "background.paper", p: 2, borderRadius: 4 }}
    >
      <Avatar alt={authorName} src={authorAvatar} />
      <Typography variant="body1" sx={{ ml: 5 }}>
        {children}
      </Typography>
    </Stack>
  );
};

export default CommentItem;
