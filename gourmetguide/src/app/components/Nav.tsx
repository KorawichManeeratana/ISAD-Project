"use client";
import Link from "next/link";
import Modal from "./modal";
import Image from "next/image";
import React, { Component } from 'react'
import Logo from "../image/real logo.png"

class Header extends React.Component {
  state = {
    showModal : false,
    showModal2 : false,
    errorLogin : "",
    errorRegister : "",
  }
  constructor(props : any){
    super(props)
  }
  public setErrorLogin(word : string){
    this.setState({
      errorLogin : word 
    })
  }
  public setErrorRegister(word : string){
    this.setState({
      errorRegister : word
    })
  }
  public setShowModal2(check : boolean){
    this.setState({
      showModal2 : check,
    })
  }
  public setShowModal(check : boolean){
    this.setState({
      showModal : check,
    })
  }
  render(){
    return (
      <div>
        <div className="grid grid-cols-2"> {/* div นี้สำหรับกด nav bar */}
          <div className="flex items-center justify-start py-4 text-yellow-500 ml-10">
              <p className="hover:underline">
                <Link href="/"><Image src={Logo} alt=""></Image></Link>
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
              <p className="hover:underline " onClick={() => this.setShowModal(true)}>
                <Link href="/login">เข้าสู่ระบบ</Link>
              </p>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
