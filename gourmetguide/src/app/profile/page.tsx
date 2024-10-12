"use client"
import React, { Component } from 'react'
import logoAcc from '../image/logoaccount.png';

export default class page extends Component {
render(){
    return(
    <div className=" flex justify-left">
      <div className="bg-gray-200 border w-44 min-h-screen">
        <h1>facebook</h1>
      </div>
      <div className="bg-yellow-100 flex-grow flex space-x-4 space-y-6 items-start">
        <div>
          <img src="logoAcc" alt="Account Logo" width="200" height="200"></img>
        </div>
        <div className="flex flex-col items-start space-x-4">
          <h1 className="text-4xl text-yellow-700">Gordon Ramzy</h1>
          <h1 className="text-xl text-yellow-700">Chef  and restaurateur</h1>
          <p className ="text-yellow-600">ดิชั้นอยากจะแชร์สูตรอาหารที่ค้นพบขึ้นจากโลกกรูเม่
          ให้ทุกๆคนได้ลองนำไปทำดูค่ะ</p>
          <div className="justify-left space-x-4 space-y-5">
            <button className="bg-white text-yellow-700 py-2 px-6 ml-10 rounded-l-3xl rounded-r-3xl">
              Profile
            </button>
            <button className="bg-white text-yellow-700 py-2 px-6 ml-10 rounded-l-3xl rounded-r-3xl">
              Edit
            </button>
            <button className="bg-white text-yellow-700 py-2 px-6 ml-10 rounded-l-3xl rounded-r-3xl">
            +
            </button>
          </div>
          <br></br>
          <div>
            <button className="bg-white text-yellow-700 py-2 px-20 ml-10 rounded-l-3xl rounded-r-3xl">
              Most view
          </button>
          </div>
        </div>
      </div>
    </div>)
}
    
  }