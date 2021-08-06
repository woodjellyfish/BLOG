import React, { useState } from "react";
import ConfModal from "./ConfModal";
import { mutate } from "swr";
import { functions } from "../../firebase/clientApp";

type Props = {
  postId: string;
};
export default function CreateCommentForm({ postId }: Props) {
  const [userName, setUserName] = useState("");
  const [commentMessage, setCommentMessage] = useState("");
  const [userNameErrorMessage, setUserNameErrorMessage] = useState("");
  const [commentErrorMessage, setCommentErrorMessage] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

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

    return res.status;
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

    if (userName == "") {
      setUserNameErrorMessage("ユーザ名が入力されていません。");
    }
    if (commentMessage == "") {
      setCommentErrorMessage("コメント内容が入力されていません。");
    }

    if (userName && commentMessage) {
      //確認ダイアログ
      setIsModalOpen(true);
    }
  };

  //モーダル用イベントハンドラ
  const handleOKClick = async () => {
    const stats = await postComment(userName, commentMessage, postId);
    if (stats === 200) {
      setUserName("");
      setCommentMessage("");

      const body = {
        postId: postId,
        userName: userName,
        commentMessage: commentMessage,
      };

      fetch("/api/sendmail/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      mutate(`/api/comment/?id=${postId}`);
    } else {
      console.log("コメントの投稿に失敗しました。");
    }

    setIsModalOpen(false);
  };
  const handleCancelClick = () => {
    setIsModalOpen(false);
  };

  //モーダルのボディコンポーネント
  const ModalBody = () => {
    return (
      <>
        <div className="text-center font-bold">
          以下の内容で投稿します、よろしいですか？
        </div>
        <div className="">ユーザー名</div>
        <div className="px-3 py-1 border-4 border-gray-300 rounded-lg">
          {userName}
        </div>
        <div>コメント内容</div>
        <div className="px-3 py-1 border-4 border-gray-300 rounded-lg">
          {commentMessage}
        </div>
      </>
    );
  };

  return (
    <>
      <div className="w-full">
        {isModalOpen && (
          <ConfModal
            CancelProcess={handleCancelClick}
            OKProcess={handleOKClick}
          >
            <ModalBody />
          </ConfModal>
        )}
      </div>

      <div className="bg-white p-2 rounded-md shadow-md">
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2">
            ユーザー名
          </label>
          <input
            className="bg-gray-100 appearance-none border rounded w-full py-2 px-1 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-600"
            id="userName"
            type="text"
            placeholder="ユーザー名"
            value={userName}
            onChange={(e) => handleChangeName(e)}
            onFocus={() => setUserNameErrorMessage("")}
          />
          <a className="ml-1.5 text-red-500">{userNameErrorMessage}</a>
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
          <a className="ml-1.5 text-red-500">{commentErrorMessage}</a>
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-700"
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
