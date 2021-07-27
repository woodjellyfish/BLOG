import React, { useState } from "react";
import { useEffect } from "react";
import { CommentData } from "../../interfaces";
import ConfModal from "./ConfModal";

type Props = {
  postId: string;
  setCommentData: (value: React.SetStateAction<CommentData[]>) => void;
};
export default function CreateCommentForm({ postId, setCommentData }: Props) {
  const [userName, setUserName] = useState("");
  const [commentMessage, setCommentMessage] = useState("");
  const [userNameErrorMessage, setUserNameErrorMessage] = useState("");
  const [commentErrorMessage, setCommentErrorMessage] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVerification, setIsVerification] = useState(false);

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

    setCommentData((pre) => {
      const newCommentData = Array.from(pre);
      newCommentData.unshift(resMessage);
      return newCommentData;
    });
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
    setUserNameErrorMessage("");
    setCommentErrorMessage("");
    setIsVerification(false);

    if (userName == "") {
      setUserNameErrorMessage("ユーザ名が入力されていません。");
    }
    if (commentMessage == "") {
      setCommentErrorMessage("コメント内容が入力されていません。");
    }

    if (userName && commentMessage) {
      //確認ダイアログ
      setIsModalOpen(true);
      //コメントのポストはuseEffect[isModalOpen]で実行

      //todo コメント後に管理者への通知
    }
  };

  useEffect(() => {
    if (isVerification) {
      postComment(userName, commentMessage, postId);
      setIsVerification(false);
      setUserName("");
      setCommentMessage("");
    }
  }, [isModalOpen]);

  return (
    <>
      <div className="w-full">
        {isModalOpen && (
          <div className="w-full flex justify-center absolute z-10">
            <ConfModal
              userName={userName}
              commentMessage={commentMessage}
              setIsModalOpen={setIsModalOpen}
              setIsVerification={setIsVerification}
            />
          </div>
        )}
        <div className="bg-blue-300 p-2 rounded-md shadow-md">
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-semibold mb-2">
              ユーザー名
            </label>
            <input
              className="bg-gray-100 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-600"
              id="userName"
              type="text"
              placeholder="ユーザー名"
              value={userName}
              onChange={(e) => handleChangeName(e)}
            />
            <a className="ml-1.5 text-red-600">{userNameErrorMessage}</a>
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-semibold mb-2">
              コメント内容
            </label>
            <textarea
              rows={4}
              cols={50}
              className="bg-gray-100 p-1 appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-600"
              id="commentMessage"
              onChange={(e) => handleChangeCommentMessage(e)}
              value={commentMessage}
            />
            <a className="ml-1.5 text-red-600">{commentErrorMessage}</a>
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-700"
              type="button"
              onClick={handleSubmitCommentData}
            >
              コメントする
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
