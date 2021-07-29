import React from "react";

type Props = {
  handleCancelClick: () => void;
};

const ConfModal: React.FC<Props> = ({ children, handleCancelClick }) => {
  return (
    <div className="w-full flex justify-center absolute z-10">
      <div
        className="fixed top-0 left-0 h-full w-full bg-gray-500 bg-opacity-40 flex items-center justify-center"
        onClick={handleCancelClick}
      >
        <div
          className="w-[80%] md:w-1/3 bg-white rounded-lg py-8 shadow-lg flex flex-col items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default ConfModal;
