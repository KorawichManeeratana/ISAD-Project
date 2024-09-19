"use client";
import React from "react";
import Link from "next/link";
import { useState } from "react";
import Modal from "./modal";

function Header() {
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  return (
    <div>
      <div className="grid grid-cols-2"> {/* div นี้สำหรับกด nav bar */}
        <div className="flex items-center justify-start py-4 text-yellow-500 ml-10">
            <p className="hover:underline">
              <Link href="/">logo</Link>
            </p>
        </div>
        <div className="flex justify-end ">
          <ul className="flex items-center justify-center py-4 text-yellow-500 font-normal bg-white space-x-10 mr-10">
            <li className="hover:underline">
              <Link href="/">หน้าหลัก</Link>
            </li>
            <li className="hover:underline">
              <Link href="/recipe">สูตรอาหาร</Link>
            </li>
            <p className="hover:underline " onClick={() => setShowModal(true)}>
              เข้าสู่ระบบ
            </p>
          </ul>
        </div>
      </div>
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}> {/* เนื้อหาของหน้า login */}
        <div>
          <div>
            <h3 className="text-black font-normal text-2xl mt-5 mb-5 flex justify-center items-center">
              เข้าสู่ระบบ
            </h3>
            <div className='flex flex-row items-center justify-center py-4 text-yellow-500 font-normal bg-white space-x-6"'>
              <h3 className="text-black font-normal text-xl mb-5 flex justify-center items-center mt-6">
                ชื่อผู้ใช้งาน:
              </h3>
              <input
                type="text"
                placeholder="กรอกชื่อผู้ใช้งาน"
                className="text-black w-96 px-4 py-2 border border-black rounded-l-3xl rounded-r-3xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent flex justify-center items-center ml-6"
              ></input>
            </div>
            <div className="flex flex-row items-center justify-center py-4 text-yellow-500 font-normal bg-white space-x-10 w-full">
              <h3 className="text-black font-normal text-xl mb-5 flex justify-center items-center mt-6">
                รหัสผ่าน:
              </h3>
              <input
                type="password"
                placeholder="กรอกรหัสผ่าน"
                className="border border-black text-black w-96 px-6 py-2 rounded-l-3xl rounded-r-3xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent flex justify-center items-center"
              ></input>
            </div>
            <div className="flex flex-row items-center justify-center py-4 font-normal bg-white">
              <input type="checkbox"></input>
              <p className="ml-2">จำฉันไว้</p>
              <p className="hover:underline ml-40 text-gray-500">ลืมรหัสผ่าน?</p>
            </div>
          </div>
          <div className="space-x-14 my-8">
            <button className="text-xl bg-yellow-500 text-white border border-black rounded-full px-12 py-1">เข้าสู่ระบบ</button>
            <button className="text-xl bg-white text-black border-2 border-yellow-500 rounded-full px-12 py-1" onClick={() => {
              setShowModal2(true);
              setShowModal(false);
              }}>ลงทะเบียน</button> {/* ตั้งกดแล้วเปิดหน้า register ปิดหน้า login */}
          </div>
        </div>
      </Modal>
      <Modal isVisible={showModal2} onClose={() => setShowModal2(false)}> {/*เนื้อหาของหน้า register*/}
      <div>
          <div>
            <h3 className="text-black font-normal text-2xl mt-5 mb-5 flex justify-center items-center">
              ลงทะเบียน
            </h3>
            <div className="flex flex-col items-center justify-center">
              <div className='flex flex-row items-center justify-center py-2 text-yellow-500 font-normal bg-white space-x-6"'>
                <h3 className="text-black font-normal text-xl mb-5 flex justify-center items-center mt-6 mr-20">
                  อีเมล:
                </h3>
                <input
                  type="text"
                  placeholder="กรอกอีเมล (example@gmail.com)"
                  className="text-black w-96 px-4 py-2 border border-black rounded-l-3xl rounded-r-3xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent flex justify-center items-center ml-6"
                ></input>
              </div>
              <div className='flex flex-row items-center justify-center py-2 text-yellow-500 font-normal bg-white space-x-6"'>
                <h3 className="text-black font-normal text-xl mb-5 flex justify-center items-center mt-6 mr-8">
                  ชื่อผู้ใช้งาน:
                </h3>
                <input
                  type="text"
                  placeholder="กรอกชื่อผู้ใช้งาน"
                  className="text-black w-96 px-4 py-2 border border-black rounded-l-3xl rounded-r-3xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent flex justify-center items-center ml-6"
                ></input>
              </div>
              <div className="flex flex-row items-center justify-center py-2 text-yellow-500 font-normal bg-white space-x-10 w-full">
                <h3 className="text-black font-normal text-xl mb-5 flex justify-center items-center mt-6 mr-8">
                  รหัสผ่าน:
                </h3>
                <div className="flex flex-col items-end mt-6">
                <input
                  type="password"
                  placeholder="กรอกรหัสผ่าน (อย่างน้อย 8 หรือ 12 ตัวอักษร)"
                  className="border border-black text-black w-96 px-4 py-2 rounded-l-3xl rounded-r-3xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent flex justify-center items-center"
                ></input>
                <p className="text-normal text-gray-500 text-sm">ต้องมีตัวเลข, ตัวพิมพ์เล็ก, ตัวพิมพ์ใหญ่</p>
                </div>
              </div>
              <div className='flex flex-row items-center justify-center py-2 text-yellow-500 font-normal bg-white space-x-6"'>
                <h3 className="text-black font-normal text-xl mb-5 flex justify-center items-center mt-6">
                  ยินยันรหัสผ่าน:
                </h3>
                <input
                  type="password"
                  placeholder="กรอกรหัสผ่าน"
                  className="text-black w-96 px-4 py-2 border border-black rounded-l-3xl rounded-r-3xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent flex justify-center items-center ml-6"
                ></input>
              </div>
            </div>
          </div>
          <div className="justify-center items-center my-8">
            <button className="text-xl bg-yellow-500 text-white border border-black rounded-full px-12 py-1">ลงทะเบียน</button>
            <div className="flex flex-row space-x-4 justify-center items-center">
              <p className="">มีบัญชีอยู่แล้ว?</p>
              <p className="hover:underline hover:text-blue-400" onClick={() => {setShowModal2(false); setShowModal(true);}}>เข้าสู่ระบบ</p> {/* ตั้งกดแล้วปิดหน้า register เปิดหน้า login */}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Header;
