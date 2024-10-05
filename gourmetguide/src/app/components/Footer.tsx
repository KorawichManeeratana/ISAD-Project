import React, { Component } from "react";
import Image from "next/image";
import footLogo from "../image/footer logo.png";
export default class Footer extends Component {
  render() {
    return (
      <div className="flex justify-center font-kanit bg-yellow-100">
        <div className="flex justify-center items-center space-x-32 px-32">
          <Image src={footLogo} alt="" className="w-auto h-[400px]"></Image>
          <div className="pr-64">
            <h1 className="text-yellow-950 text-xl">เกี่ยวกับเรา</h1>
            <p className="text-yellow-600 description">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ที่
              Gourmet Guide เรามุ่งมั่นสร้างพื้นที่สําหรับคนรักการทําอาหาร
              ให้สามารถค้นหา แบ่งปัน และเรียนรู้สูตรใหม่ ๆ ได้ง่ายดาย
              ไม่ว่าคุณจะเป็นเชฟ มืออาชีพหรือผู้ที่ชอบทําอาหารที่บ้าน
              คุณจะพบสูตรอาหารหลากหลายที่ครอบ
              คลุมทั้งอาหารพื้นเมืองและอาหารนานาชาติ ทุกสูตรถูกคัดเลือกอย่างดี
              เพื่อให้ มั่นใจว่าใช้งานได้จริง
              นอกจากนี้เรายังเป็นชุมชนสําหรับผู้ที่หลงใหลในอาหาร
              ที่นี่คุณจะได้แรงบันดาลใจและสร้างสรรค์เมนูที่สมบูรณ์แบบ
            </p>
            <br></br>
            <h1 className="text-yellow-950 text-xl">
              เข้าครัวกับเราและเริ่มต้นการผจญภัยในโลกแห่งรสชาติ!
            </h1>
          </div>
        </div>
      </div>
    );
  }
}
