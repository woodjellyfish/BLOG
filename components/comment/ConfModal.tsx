import React from "react";

type Props = {
  CancelProcess: () => void;
  OKProcess: () => void;
};

const ConfModal: React.FC<Props> = ({ children, CancelProcess, OKProcess }) => {
  const handleButtonClick = (type: "OK" | "CANCEL") => {
    if (type == "CANCEL") CancelProcess();
    if (type == "OK") OKProcess();
  };

  return (
    <div className="w-full flex justify-center absolute z-10">
      <div
        className="fixed top-0 left-0 h-full w-full bg-gray-500 bg-opacity-40 flex items-center justify-center"
        onClick={() => handleButtonClick("CANCEL")}
      >
        <div
          className="w-[80%] md:w-1/3 bg-white rounded-lg py-8 shadow-lg flex flex-col items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          {children}

          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6 mx-8"
              onClick={() => handleButtonClick("OK")}
            >
              OK
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-6"
              onClick={() => handleButtonClick("CANCEL")}
            >
              CANCEL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfModal;
