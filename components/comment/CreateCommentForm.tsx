import React, { useState } from "react";
import { useEffect } from "react";
import { CommentData } from "../../interfaces";
import ConfModal from "./ConfModal";
import { mutate } from "swr";

type Props = {
  postId: string;
};
export default function CreateCommentForm({ postId }: Props) {
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

    // const resMessage = await res.json();

    mutate(`/api/comment/?id=${postId}`);
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

  //モーダル用イベントハンドラとモーダルのボディコンポーネント
  const handleOKonClick = () => {
    setIsVerification(true);
    setIsModalOpen(false);
  };
  const handleCancelClick = () => {
    setIsVerification(false);
    setIsModalOpen(false);
  };

  const ModalBody = () => {
    return (
      <>
        <div className="">ユーザー名</div>
        <div className="px-3 py-1 border-4 border-gray-300 rounded-lg">
          {userName}
        </div>
        <div>コメント内容</div>
        <div className="px-3 py-1 border-4 border-gray-300 rounded-lg">
          {commentMessage}
        </div>
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6 mx-8"
            onClick={handleOKonClick}
          >
            OK
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6"
            onClick={handleCancelClick}
          >
            CANCEL
          </button>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="w-full">
        {isModalOpen && (
          <ConfModal handleCancelClick={handleCancelClick}>
            <ModalBody />
          </ConfModal>
        )}
      </div>

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
            onFocus={() => setUserNameErrorMessage("")}
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
            onFocus={() => setCommentErrorMessage("")}
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
    </>
  );
}
