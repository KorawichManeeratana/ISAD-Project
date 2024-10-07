"use client"
import React, { Component, useState } from 'react';

//รับ data มาจาก หน้าหลัก เป็น data ของ data.json มี ข้อมูลเป็น key, value
export const Search = ({data} : any) => {
  const [ state , setState] = useState([]);
  //function search
  const handleSearch = (e:any) => {
    const searching = e.target.value;
    //เป็นตัว filter ข้อมูล กำหนดข้อมูลให้เป็นตัวเล็กไว้ก่อน
    const searched = data.filter((value: { text: string | any[]; })=>{
      if (typeof value.text === 'string') {
        return value.text.toLowerCase().includes(searching.toLowerCase());
      }
      return false;
      //return value.text.toLowerCase().includes(searching);
    })
    //เวลา input เป็นช่องว่างจะไม่แสดงค่า
    if(searching==""){
      setState([]);
    }else{
      setState(searched);
    }
  };
    return (
      <div>
        <div>
          <input
            type="text"
            placeholder="ค้นหาสูตรอาหาร"
            className="text-black w-96 px-4 py-2 rounded-l-3xl rounded-r-3xl border border-gray-400px focus:outline-none focus:ring-2 focus:ring-yellow-500"
            onChange={handleSearch} />
        </div>
        <div className='result flex items-center justify-center mt-8 '>
          <div className='bg-zinc-800	text-neutral-50 justify-center w-64 text-left pl-4'>
            {/*เป็น contrainer โชว์ ข้อมูลที่ดึงมากจากไฟล์ data.json ไอ textตัวแดงเป็นไรไม่รู้แต่มันรันได้กูงง*/}
            {state.map((value) =>{
                return <div>{value.text}</div>
              })}
          </div>
        </div>
      </div>
    );
  };

export default Search;
