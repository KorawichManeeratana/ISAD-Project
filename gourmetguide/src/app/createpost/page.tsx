"use client"
import React, { Component } from 'react'

export default class page extends Component {
    public async uploadPic() {
        const file = document.querySelector("input")!;
        const button = document.querySelector(".change");
        const img: HTMLImageElement = document.querySelector('.image')!;
        
        let a = new FormData();

        let c:any = document.querySelector(".repName");
        let repName = c.value;
        // c = document.querySelector(".repIng");
        // let repIng = c.value;
        c = document.querySelector(".repStep");
        let repStep = c.value;
        c = document.querySelector(".repCal");
        let repCal = c.value;
        c = document.querySelector(".repHour");
        let repHour = c.value;
        c = document.querySelector(".repMin");
        let repMin = c.value;
        let time = repHour+":"+repMin;
        c = document.querySelector(".repDes");
        let repDes = c.value;
        let repImg:any = document.querySelector(".repImg")!;
        let repDate = new Date();
        
        a.append("rep_name", repName);
        a.append("rep_step", repStep);
        a.append("calories", repCal);
        a.append("rep_time", time);
        a.append("rep_des", repDes);
        a.append("rep_img", repImg.files[0]);
        a.append("rep_date", repDate.toString());



        let req = await fetch("http://localhost:3000/attractions/api_Recipes", {
            method: "POST",
            body: a
        });
        let b = await req.json();
        console.log(b.message);
        img.src = b.message;
    }
  render() {
    return (
      <div className='bg-gray-200'>
        <div className="overflow-y-auto"></div> {/* scroll bar */}
          <div className="w-[90vw] h-auto m-auto border-20 border-x-gray-400 bg-yellow-100 px-8">  {/* เนื้อหา */}
            <h1 className="text-yellow-950 text-3xl font-bold mb-4 pl-16 pt-16">สร้างสูตรอาหาร</h1>
            <div className="flex flex-center justify-center items-center space-x-8">
              <div className="flex flex-col p-6 space-y-14">
              </div>
            </div>
            <h1 className="text-xl text-yellow-400 grid px-40 pt-2">ชื่ออาหาร</h1>
            <input type="text" className='mt-3 ml-44 w-900 h-10 border border-gray-300 rounded-xl px-6 repName' placeholder='ระบุชื่ออาหาร'></input>
            <h1 className="text-xl text-yellow-400 grid px-40 pt-6">วัตถุดิบ</h1>
            <textarea className='mt-3 ml-44 w-900 h-52 border border-gray-300 rounded-xl px-6 pt-4 repIng' placeholder='ระบุวัตถุดิบ(รวมทั้งปริมาณ)'></textarea>
            <h1 className="text-xl text-yellow-400 grid px-40 pt-6">วิธีทำ</h1>
            <textarea className='mt-3 ml-44 w-900 h-60 border border-gray-300 rounded-xl px-6 pt-4 repStep' placeholder='ระบุวิธีทำ(เป็นขั้นตอน)'></textarea>
            <h1 className="text-xl text-yellow-400 grid px-40 pt-6">แคลอรี่</h1>
            <input type="text" className='mt-3 ml-44 w-900 h-10 border border-gray-300 rounded-xl px-6 repCal' placeholder='ระบุจำนวนแคลอรี่'></input>
            <h1 className="text-xl text-yellow-400 grid px-40 pt-6">เวลาในการทำ</h1>
            <div>
                <input type="text" className='mt-3 ml-44 w-450 h-10 border border-gray-300 rounded-xl px-6 repHour' placeholder='ชั่วโมง'></input>
                <span className='ml-5 text-gray-500'>-</span>
                <input type="text" className='mt-3 ml-5 w-450 h-10 border border-gray-300 rounded-xl px-6 repMin' placeholder='นาที'></input>
            </div>
            <h1 className="text-xl text-yellow-400 grid px-40 pt-6">คำอธิบาย</h1>
            <textarea className='mt-3 ml-44 w-900 h-40 border border-gray-300 rounded-xl px-6 pt-4 repDes' placeholder='ระบุคำอธิบาย(ไม่จำเป็นต้องระบุ)'></textarea>
            <h1 className="text-xl text-yellow-400 grid px-40 pt-6">เลือกรูปภาพ</h1>
            <input type='file' id='imageUpload' className='ml-44 pt-6 file:rounded-full file:px-4 file:border-gray-400 file:text-yellow-600 file:mr-4 repImg'></input>
            {/* <h1 className="text-xl text-yellow-400 grid px-40 pt-6">เลือกวิดีโอ</h1>
            <input type='file' id='imageUpload' className='ml-44 pt-6 file:rounded-full file:px-4 file:border-gray-400 file:text-yellow-600 file:mr-4'></input> */}
            <div className='justify-end flex pb-10 pt-6'>
                <button onClick={()=>this.uploadPic()} className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-6 ml-10 rounded-l-3xl rounded-r-3xl">สร้างสูตรอาหาร</button>
            </div>
          </div>
      </div>
    )
  }
}
