"use client";
import React from "react";
import Link from "next/link";
import { useState } from "react";
import Modal from "./modal";

function Header() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <ul className="flex items-center justify-center py-4 text-yellow-500 font-bold bg-white space-x-6">
        <li className="hover:underline">
          <Link href="/">logo</Link>
        </li>
        <li className="hover:underline">
          <Link href="/">หน้าหลัก</Link>
        </li>
        <li className="hover:underline">
          <Link href="/recipe">สูตรอาหาร</Link>
        </li>
        <p className="hover:underline" onClick={() => setShowModal(true)}>
          เข้าสู่ระบบ
        </p>
      </ul>
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <div>
          <div>
            <h3 className="text-black font-bold text-xl mt-5 flex justify-center items-center">
              เข้าสู่ระบบ
            </h3>
            <div className='flex flex-row items-center justify-center py-4 text-yellow-500 font-bold bg-white space-x-6"'>
              <h3 className="text-black font-bold text-l mb-5 flex justify-center items-center mt-6">
                ชื่อผู้ใช้งาน:
              </h3>
              <input
                type="text"
                placeholder="กรอกชื่อผู้ใช้งาน"
                className="text-black w-96 px-4 py-2 border border-black rounded-l-3xl rounded-r-3xl focus:outline-none focus:ring-2 focus:ring-yellow-500 flex justify-center items-center ml-6"
              ></input>
            </div>
            <div className="flex flex-row items-center justify-center py-4 text-yellow-500 font-bold bg-white space-x-10 w-full">
              <h3 className="text-black font-bold text-l mb-5 flex justify-center items-center mt-6">
                รหัสผ่าน:
              </h3>
              <input
                type="text"
                placeholder="กรอกรหัสผ่าน"
                className="border border-black text-black w-96 px-6 py-2 rounded-l-3xl rounded-r-3xl focus:outline-none focus:ring-2 focus:ring-yellow-500 flex justify-center items-center"
              ></input>
            </div>
            <div className="flex flex-row items-center justify-center py-4 font-normal bg-white">
              <input type="checkbox"></input>
              <p className="ml-2">จำฉันไว้</p>
              <p className="hover:underline ml-40">ลืมรหัสผ่าน?</p>
            </div>
          </div>
          <div className="space-x-10 my-8">
            <button className="bg-yellow-500 text-white border border-black rounded-full px-4 py-1">เข้าสู่ระบบ</button>
            <button className="bg-white text-black border-2 border-yellow-500 rounded-full px-4 py-1">ลงทะเบียน</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Header;
