
import React from "react";


//หน้า template login และ register
const modal = ( {isVisible , onClose, children} : {isVisible:any, onClose:any, children:any}) => {
  if (!isVisible) return null;
  const handleClose = (e:any) => {
    if (e.target.id === "wrapper") onClose(); {/*ตรวจสอบจุดที่คลิกว่าอยู่ด้านนอกกล่องเนื้อหา login และ register หรือป่าว*/}
  };
  return (
    <div // div คลุมทั้งหมด
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center font-abrilfatface z-50"
      id="wrapper" onClick={handleClose}>{/* div รูป bg ของหน้า login และ register*/}
          <div className="bg-transparent text-black rounded font-abrilfatface">{children}</div> {/* เนื้อหาภายในกล่องขาว เนื้อหาอยู่ในไฟล์ nav.tsx*/}
    </div>
  );
};

export default modal;
