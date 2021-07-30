import React, { useEffect, useState } from "react";
import { CommentData } from "../../interfaces";
import CommentList from "./CommentList";
import CreateCommentForm from "./CreateCommentForm";
import useSWR from "swr";

type Props = {
  postId: string;
};

export default function CommentBase({ postId }: Props) {
  const fetcher = async (url: string): Promise<CommentData[] | null> => {
    const res = await fetch(url);
    return await res.json();
  };
  const { data, error } = useSWR(`/api/comment/?id=${postId}`, fetcher);

  return (
    <>
      <CreateCommentForm postId={postId} />
      {data ? <CommentList commentData={data} /> : "loading..."}
      {error && <div>{error}</div>}
    </>
  );
}
