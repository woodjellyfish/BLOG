import React, { useState } from "react";
import { db } from "../../firebase/clientApp";
import { formatToTimeZone } from "date-fns-timezone";
import { CommentData } from "../../interfaces";

type Props = {
  postId: string;
};
export default function CreateCommentForm({ postId }: Props) {
  const [userName, setUserName] = useState("");
  const [commentMessage, setCommentMessage] = useState("");

  const createCommentData = (
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

    dbRef.add(sendCommentData);

    console.log(`sendCommentData`, sendCommentData);
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };
  const handleChangeCommentMessage = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setCommentMessage(e.target.value);
  };

  const handleSubmitCommentData = () => {
    createCommentData(userName, commentMessage, postId);
  };
  return (
    <div className="w-full">
      <div className="bg-blue-300 p-2 rounded-md shadow-md">
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2">
            ユーザー名
          </label>
          <input
            className="bg-gray-100 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="userName"
            type="text"
            placeholder="ユーザー名"
            onChange={(e) => handleChangeName(e)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2">
            コメント内容
          </label>
          <textarea
            rows={4}
            cols={50}
            className="bg-gray-100 p-1 appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="commentMessage"
            onChange={(e) => handleChangeCommentMessage(e)}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleSubmitCommentData}
          >
            コメントする
          </button>
        </div>
      </div>
    </div>
  );
}
