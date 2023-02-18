import { Avatar, Stack, Typography } from "@mui/material";
import DOMPurify from "dompurify";
import { useRef } from "react";

interface CommentItemProps {
  authorAvatar: string;
  authorName: string;
  children: string;
}
const CommentItem = ({
  authorAvatar,
  authorName,
  children,
}: CommentItemProps) => {
  const sanitizedData = () => ({
    __html: DOMPurify.sanitize(children),
  });

  return (
    <Stack
      direction={"row"}
      justifyContent="flex-start"
      gap={2}
      sx={{ mt: 1, p: 2, borderRadius: 4 }}
      id="commentItemRoot"
    >
      <Avatar alt={authorName} src={authorAvatar} />
      <Typography
        variant="body1"
        component={"div"}
        sx={{ ml: 5, color: "common.white" }}
        dangerouslySetInnerHTML={sanitizedData()}
      ></Typography>
    </Stack>
  );
};

export default CommentItem;
