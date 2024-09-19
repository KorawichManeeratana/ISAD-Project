import React from "react";

//หน้า template login และ register
const modal = ( {isVisible , onClose, children} : {isVisible:any, onClose:any, children:any}) => {
  if (!isVisible) return null;

  const handleClose = (e:any) => {
    if (e.target.id === "wrapper") onClose(); {/*ตรวจสอบจุดที่คลิกว่าอยู่ด้านนอกกล่องเนื้อหา login และ register หรือป่าว*/}
  };
  return (
    <div // div คลุมทั้งหมด
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center font-abrilfatface"
      id="wrapper"
      onClick={handleClose}
    >
      <div className="w-[1200px] h-[600px] flex justify-center items-center font-abrilfatface" id="loginbg"> {/* div รูป bg ของหน้า login และ register*/}
        <div className="w-[600px] h-[600px] bg-white flex flex-col font-abrilfatface"> {/* div กล่องขาวไว้คลุมข้อความให้กรอก*/}
          <button
            className="text-black text-xl place-self-end font-abrilfatface pr-4 pt-2"
            onClick={() => onClose()} 
          >
            X
          </button> {/* ปุ่มกากาบาดปิด */}
          <div className="bg-white text-black rounded font-abrilfatface">{children}</div> {/* เนื้อหาภายในกล่องขาว เนื้อหาอยู่ในไฟล์ nav.tsx*/}
        </div>
      </div>
    </div>
  );
};

export default modal;
