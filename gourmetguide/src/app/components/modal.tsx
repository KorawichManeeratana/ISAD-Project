import React from "react";

const modal = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null;

  const handleClose = (e) => {
    if (e.target.id === "wrapper") onClose();
  };
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
      id="wrapper"
      onClick={handleClose}
    >
      <div className="w-[1200px] h-[600px] flex justify-center items-center" id="loginbg">
        <div className="w-[600px] flex flex-col ">
          <button
            className="text-white text-xl place-self-end"
            onClick={() => onClose()}
          >
            X
          </button>
          <div className="bg-white text-black rounded">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default modal;
