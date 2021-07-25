import React, { useEffect, useState } from "react";
import { CommentData } from "../../interfaces";
type Props = {
  commentData: CommentData[];
};

export default function CommentList({ commentData }: Props) {
  return (
    <div className="bg-blue-300 rounded-md shadow-md">
      <h3 className="font-bold">コメント一覧</h3>
      {commentData.length == 0 ? (
        <p>コメントはありません</p>
      ) : (
        commentData.map((comment, i) => (
          <div className="mb-3 ml-2" key={i}>
            <p>{comment.userName}</p>
            <p>{comment.message}</p>
            <p>{comment.createdAt}</p>
          </div>
        ))
      )}
    </div>
  );
}
