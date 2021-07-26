import React, { useEffect, useState } from "react";
import { CommentData } from "../../interfaces";
import CommentList from "./CommentList";
import CreateCommentForm from "./CreateCommentForm";
import useSWR from "swr";

type Props = {
  postId: string;
};

export default function CommentBase({ postId }: Props) {
  const [commentData, setCommentData] = useState<CommentData[]>(undefined);

  const fetcher = async (url: string): Promise<CommentData[] | null> => {
    const res = await fetch(url);
    return res.json();
  };
  const { data, error } = useSWR(`/api/comment/?id=${postId}`, fetcher);

  useEffect(() => {
    if (data) {
      setCommentData(data);
    }
  }, [data]);

  return (
    <>
      <CreateCommentForm postId={postId} setCommentData={setCommentData} />
      <CommentList commentData={commentData} />
      {error && <div>{error}</div>}
    </>
  );
}
