"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import LogoAccount from "../image/logoaccount.png"
import Link from "next/link";
import Modal from "./modal";
import Image from "next/image";
import React, { Component } from "react";
import Logo from "../image/real logo.png";


class Header extends React.Component {
  state = {
    showReport: false,
  };
  constructor(props: any) {
    super(props);
  }

  public setShowReport(check: boolean) {
    this.setState({
      showReport: check,
    });
  }

  render() {
    return (
      <div>
        <div className="grid grid-cols-2">
          {" "}
          {/* div นี้สำหรับกด nav bar */}
          <div className="flex items-center justify-start py-4 text-yellow-500 ml-10">
            <p className="hover:underline">
              <Link href="/">
                <Image src={Logo} alt=""></Image>
              </Link>
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
              <p
                className="hover:underline "
              >
                <Link href="/login">เข้าสู่ระบบ</Link>
              </p>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>โปรไฟล์</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => this.setShowReport(true)}>รายงานปัญหา</DropdownMenuItem>
                  <DropdownMenuItem>รายการโปรด</DropdownMenuItem>
                  <DropdownMenuItem>ล็อคเอ้าท์</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </ul>
          </div>
        </div>
        <Modal isVisible={this.state.showReport} onClose={() => this.setShowReport(false)}><div className="w-[1260px] h-[620px]  bg-white rounded-lg p-8">
          <div className="flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold mb-4">รายงานปัญหา</h2>
        <div className="space-y-2"> {/* checkbox */}
          <div>
          <input type="checkbox"></input>
          <span className="ml-2">การแสดงความคิดเห็นที่ไม่เหมาะสม</span>
          </div>
          <div>
          <input type="checkbox"></input>
          <span className="ml-2">ภาพ/เนื้อหาที่ไม่เหมาะสม</span>
          </div>
          <div>
          <input type="checkbox"></input>
          <span className="ml-2">ข้อความสแปม</span>
          </div>
          <div>
          <input type="checkbox"></input>
          <span className="ml-2">ฉันแค่ไม่ชอบโพสต์นี้</span>
          </div>
        </div>
        <div className="space-y-4">
          <h1>คำอธิบายเพิ่มเติม</h1>
          <textarea className="w-[893px] h-[199px] px-4 pt-2 border border-black rounded-md" placeholder="ต้องการอธิบายอะไรเพิ่มเติมเกี่ยวกับการรายงาน"></textarea>
        </div>
        </div>
        <div className="flex justify-end items-end space-x-4 mt-4"><button className="text-xl bg-yellow-500 text-white border border-black rounded-full px-12 py-1">
                  ยินยัน
           </button>
           <button onClick = {() => this.setShowReport(false)} className="text-xl bg-white text-black border-2 border-yellow-500 rounded-full px-12 py-1">
                  ยกเลิก
          </button></div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Header;
