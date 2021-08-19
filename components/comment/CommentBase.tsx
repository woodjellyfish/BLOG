import React from "react";
import CommentList from "./CommentList";
import CreateCommentForm from "./CreateCommentForm";

type Props = {
  postId: string;
};

export default function CommentBase({ postId }: Props) {
  return (
    <>
      <CreateCommentForm postId={postId} />
      <CommentList postId={postId} />
    </>
  );
}
