import React from "react";

type Props = {
  userName: string;
  commentMessage: string;
  setIsModalOpen: (value: React.SetStateAction<boolean>) => void;
  setIsVerification: (value: React.SetStateAction<boolean>) => void;
};

export default function VerificationModal({
  userName,
  commentMessage,
  setIsModalOpen,
  setIsVerification,
}: Props) {
  const handleOKonClick = () => {
    setIsVerification(true);
    setIsModalOpen(false);
  };
  const handleCancelClick = (e) => {
    setIsVerification(false);
    setIsModalOpen(false);
  };
  return (
    <div
      className="fixed top-0 left-0 h-full w-full bg-gray-500 bg-opacity-40 flex items-center justify-center"
      onClick={() => handleCancelClick}
    >
      <div
        className="relative w-[80%] md:w-1/3 bg-white rounded-lg py-8 shadow-lg flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div>ユーザー名</div>
        <div>{userName}</div>
        <div>コメント内容</div>
        <div>{commentMessage}</div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6"
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
    </div>
  );
}
