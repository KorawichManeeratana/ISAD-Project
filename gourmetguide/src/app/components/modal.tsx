import { redirect } from "next/navigation";
import Link from "next/link";
import React from "react";

//หน้า template login และ register
const modal = ( {isVisible , onClose, children} : {isVisible:any, onClose:any, children:any}) => {
  if (!isVisible) return null;
  return (
    <div // div คลุมทั้งหมด
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center font-abrilfatface"
      id="wrapper"
    >
      <div className="w-[1200px] h-[600px] flex justify-center items-center font-abrilfatface" id="loginbg"> {/* div รูป bg ของหน้า login และ register*/}
        <div className="w-[600px] h-[600px] bg-white flex flex-col font-abrilfatface"> {/* div กล่องขาวไว้คลุมข้อความให้กรอก*/}
          <a href="/" className="place-self-end font-abrilfatface pr-4 pt-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/>
            </svg>
          </a>
          <div className="bg-white text-black rounded font-abrilfatface">{children}</div> {/* เนื้อหาภายในกล่องขาว เนื้อหาอยู่ในไฟล์ nav.tsx*/}
        </div>
      </div>
    </div>
  );
};

export default modal;
