import React, { useEffect, useState } from "react";
import { db } from "../../firebase/clientApp";
import { CommentData } from "../../interfaces";
import CommentList from "./CommentList";
import CreateCommentForm from "./CreateCommentForm";

type Props = {
  postId: string;
};

export default function CommentBase({ postId }: Props) {
  const [commentData, setCommentData] = useState<CommentData[]>(undefined);

  const postComment = async (
    userName: string,
    commentMessage: string,
    postId: string
  ) => {
    const body = {
      postId: postId,
      userName: userName,
      commentMessage: commentMessage,
    };

    const res = await fetch("/api/comment/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const resMessage = await res.json();
    //CommentListコンポーネントの再描画

    const newCommentData = Array.from(commentData);
    newCommentData.unshift(resMessage);
    setCommentData(newCommentData);
  };

  useEffect(() => {
    //コメントデータのフェッチとセット
    fetch(`/api/comment/?id=${postId}`)
      .then((res) => res.json())
      .then((result) => {
        setCommentData(result);
      })
      .catch((error) => {
        console.log("error :>> ", error);
      });
  }, []);

  return (
    <>
      <CreateCommentForm postId={postId} postComment={postComment} />
      {commentData != undefined && <CommentList commentData={commentData} />}
    </>
  );
}
