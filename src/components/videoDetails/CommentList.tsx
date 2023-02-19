import { Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import useLazyFetch from "../../hooks/useLazyFetch";
import ShowLessOrMore from "../ShowLessOrMore";
import CommentItem from "./CommentItem";

const CommentList = ({ videoId }: { videoId: string | undefined }) => {
  const { sendRequest, isLoading, result } = useLazyFetch();
  useEffect(() => {
    sendRequest(`commentThreads?part=snippet&maxResults=20&videoId=${videoId}`);
  }, [videoId]);

  return (
    <Stack sx={{ maxWidth: "fit-content", px: 5 }}>
      <Typography variant="h2">Comments:</Typography>
      {!isLoading &&
        result?.items.map((item: any) => {
          return (
            <ShowLessOrMore useCase="comment" key={item.id}>
              <CommentItem
                authorAvatar={
                  item?.snippet?.topLevelComment?.snippet?.authorProfileImageUrl
                }
                authorName={
                  item?.snippet?.topLevelComment?.snippet?.authorDisplayName
                }
              >
                {item?.snippet?.topLevelComment?.snippet?.textDisplay}
              </CommentItem>
            </ShowLessOrMore>
          );
        })}
    </Stack>
  );
};

export default CommentList;
