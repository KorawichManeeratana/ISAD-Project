"use client"
// import React, { useEffect, useState } from 'react'
// import { recipes } from '../utils/storage/tabledb';

// //รับ data มาจาก หน้าหลัก เป็น data ของ data.json มี ข้อมูลเป็น key, value
// export const Search = ({data} : any) => {
//   const [ state , setState] = useState([]);
//   //function search
//   const handleSearch = (e:any) => {
//     const searching = e.target.value;
//     //เป็นตัว filter ข้อมูล กำหนดข้อมูลให้เป็นตัวเล็กไว้ก่อน
//     const searched = data.filter((value: { text: string | any[]; })=>{
//       if (typeof value.text === 'string') {
//         return value.text.toLowerCase().includes(searching.toLowerCase());
//       }
//       return false;
//       //return value.text.toLowerCase().includes(searching);
//     })
//     //เวลา input เป็นช่องว่างจะไม่แสดงค่า
//     if(searching==""){
//       setState([]);
//     }else{
//       setState(searched);
//     }
//   };


//   return (
//     <div className='search'>
//       <div className='search container gap'>
//           <div id='search input' className='flex items-center justify-center mt-8'>
//               <input type='text' className='ring ring-pink-500 bg-green rounded-full	' placeholder='search...' onChange={handleSearch}></input> 
//           </div>
//           <div className='result flex items-center justify-center mt-8 '>
//             <div className='bg-zinc-800	text-neutral-50 justify-center w-64 text-left pl-4'>
//               {/*เป็น contrainer โชว์ ข้อมูลที่ดึงมากจากไฟล์ data.json*/}
//               {state.map((value) =>{
//                   return <div>{value.text}</div>
//                 })}
//             </div>
//           </div>
//       </div>
//     </div>
//   )
// }







// function setQuery(recipes:any): void {
//   throw new Error('Function not implemented.');
// }



{/* <div className='search container'>
<div>
</div>
<div>
  </div>
  <br/>
  <div className='flex items-center justify-center mt-8'>
      <input className='ring ring-pink-500 bg-green rounded-full	' placeholder='search...' onChange={searchInput} ></input> 
      <hr/>
      <button onClick={handleClick} className="bg-gradient-to-r from-cyan-500 to-blue-500 text-center h-10 w-20 border-solid rounded-full">search</button>
  </div>
  <div className='flex items-center justify-center mt-8'>
      <ul className="list">
          <li className="listitem">
            John
          </li>       
      </ul>
  </div>
</div> */}





