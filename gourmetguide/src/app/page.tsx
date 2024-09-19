"use client"
import React, { useState } from 'react';
import Seacrh from './components/Seacrh';

function Home() {
  return (
    <div className="bg-gray-900 text-white font-sans" id="background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-amber-100 text-5xl font-bold mb-4" id="gourment">GOURMET GUIDE</h1>
          <p className="text-lg opacity-60">ค้นหาสูตรตามที่ใจคุณต้องการ</p>
        </div>
        <div className="flex items-center justify-center mt-8">
        <svg className="bi bi-search mr-10 t" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#FFB443"  viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
        </svg>
          <Seacrh />
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-6 ml-10 rounded-l-3xl rounded-r-3xl">ค้นหาแบบละเอียด</button>
        </div>
      </div>
    </div>
  );
}
export default Home;
