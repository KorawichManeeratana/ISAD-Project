"use client"
import React from "react";
import Seacrh from "./components/Seacrh";
// หน้า homepage หลักเลย
class Home extends React.Component {
  render() {
    return (
      <div className="font-kanit bg-gray-200">
        <div className="bg-grey-900 text-white" id="background"> {/* รูปพื้นหลังในหน้า home หลัง search */}
          <div className="container mx-auto px-4 py-16">
            <div className="text-center">
              <h1
                className="text-amber-100 text-5xl font-bold mb-4"
                id="gourment"
              >
                GOURMET GUIDE
              </h1>
              <p className="text-lg text-gray-100">ค้นหาสูตรตามที่ใจคุณต้องการ</p>
            </div>
            <div className="flex items-center justify-center mt-8">
              <svg
                className="bi bi-search mr-10 t"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="#FFB443"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>
              <Seacrh /> {/* เรียกใช้ search bar จาก folder components */}
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-6 ml-10 rounded-l-3xl rounded-r-3xl">
                ค้นหาแบบละเอียด
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white w-1920px py-10 text-white"></div> {/* พท.สีขาว */}
        <div className="overflow-y-auto"></div> {/* scroll bar */}
          <div className="w-[90vw] m-auto border-20 border-x-gray-400 bg-yellow-200">  {/* เนื้อหา */}
            <h1 className="text-red text-3xl font-bold mb-4">เมนูยอดนิยม</h1>
            <br></br>
            <br></br>
            <div className="bg-white w-1920px h-1680px py-4 text-white"></div> {/* พท.สีขาว */}
            <div>
              <h1>เกี่ยวกับเรา</h1>
              <p className="description">
                ที่ Gourmet Guide เรามุ่งมั่นสร้างพื้นที่สําหรับคนรักการทําอาหาร
                ให้สามารถค้นหา แบ่งปัน และเรียนรู้สูตรใหม่ ๆ ได้ง่ายดาย
                ไม่ว่าคุณจะเป็นเชฟ มืออาชีพหรือผู้ที่ชอบทําอาหารที่บ้าน
                คุณจะพบสูตรอาหารหลากหลายที่ครอบ
                คลุมทั้งอาหารพื้นเมืองและอาหารนานาชาติ ทุกสูตรถูกคัดเลือกอย่างดี
                เพื่อให้ มั่นใจว่าใช้งานได้จริง
                นอกจากนี้เรายังเป็นชุมชนสําหรับผู้ที่หลงใหลในอาหาร
                ที่นี่คุณจะได้แรงบันดาลใจและสร้างสรรค์เมนูที่สมบูรณ์แบบ
              </p>
            </div>
            <div className="bg-white w-1920px h-1680px py-10 text-white"></div> {/* พท.สีขาว */}
          </div>
        <br></br>
        <br></br>
      </div>
    );
  }
}
export default Home;
