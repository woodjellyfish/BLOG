import React, { useEffect, useState } from "react";
import { db } from "../../firebase/clientApp";
import { CommentData } from "../../interfaces";
import { fetchCommentData } from "../../lib/comment";
import CommentList from "./CommentList";
import CreateCommentForm from "./CreateCommentForm";
import { formatToTimeZone } from "date-fns-timezone";

type Props = {
  postId: string;
};

export default function CommentBase({ postId }: Props) {
  const [commentData, setCommentData] = useState<CommentData[]>(undefined);

  const postCommentData = (
    userName: string,
    commentMessage: string,
    postId: string
  ) => {
    const dbRef = db.collection("comments");
    const id = dbRef.doc().id;
    const date = new Date();
    const jpDate = formatToTimeZone(date, "YYYY-MM-DD HH:mm:ss", {
      timeZone: "Asia/Tokyo",
    });

    const sendCommentData: CommentData = {
      id: id,
      postId: postId,
      message: commentMessage,
      createdAt: jpDate,
      userName: userName,
    };

    dbRef.add(sendCommentData).catch((error) => {
      console.log("error :>> ", error);
      return false;
    });

    const newCommentMessage = Array.from(commentData);
    newCommentMessage.unshift(sendCommentData);

    setCommentData(newCommentMessage);
  };

  useEffect(() => {
    (async () => {
      const resCommentData: CommentData[] = await fetchCommentData(postId);
      setCommentData(resCommentData);
    })();
  }, []);

  useEffect(() => {
    console.log("commentData :>> ", commentData);
  });

  return (
    <>
      <CreateCommentForm postId={postId} postCommentData={postCommentData} />
      <CommentList commentData={commentData} />
    </>
  );
}
