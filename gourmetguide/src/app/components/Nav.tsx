"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import Modal from "./modal";
import Image from "next/image";
import React, { Component, FormEvent } from "react";
import Logo from "../image/real logo.png";
import {jwtDecode} from 'jwt-decode';
import LogoAccount from "../image/logoaccount.png"


class Header extends React.Component {
  state : any = {
    showReport: false,
    description: "", 
    check1: false, 
    check2: false, 
    check3: false,
    cookieValue: null,
  };

  constructor(props: any) {
    super(props);
  }

  public setShowReport(check: boolean) {
    this.setState({
      showReport: check,
    });
  }

  public setDescription(value : string){
    this.setState({
      description : value
    })
  }

  public setCheck1(turn : boolean){
    this.setState({
      check1: turn
    })
  }

  public setCheck2(turn : boolean){
    this.setState({
      check2: turn
    })
  }

  public setCheck3(turn : boolean){
    this.setState({
      check3: turn
    })
  }

  public setAccessData(data : string){
    this.setState({
      accessData : data
    })
  }

  handleChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({ description: e.target.value });
  };

  handleChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [e.target.name]: e.target.checked });
  };
  
  public setCookieValue(value : any){
    this.setState({
      cookieValue : value
    })
  }

  private static formatDate(date: Date) {
    let output: string;
    output = [
      date.getFullYear(),
      (date.getMonth() + 1).toString().padStart(2, "0"),
      date.getDate().toString().padStart(2, "0"),
    ].join("-");
    return output;
  }

  componentDidMount() {
    this.getCookieValue();
  }

  getCookie(name: string): string | null {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  getCookieValue() {
    const cookieValue = this.getCookie('token');
    if (cookieValue) {
      try {
        const decodedToken = jwtDecode(cookieValue); // Decode the JWT
        this.setCookieValue(decodedToken); // Update state with decoded data
      } catch (error) {
        console.error("Error decoding JWT:", error);
      }
    }
  }

  handleSunmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();  // Prevent default form submission

    const { description, check1, check2, check3 } = this.state; // Get current state values

    let rep_type = "";
    if (check1) {
      rep_type += ", การแสดงความคิดเห็นที่ไม่เหมาะสม";
    }
    if (check2) {
      rep_type += ", ภาพ/เนื้อหาที่ไม่เหมาะสม";
    }
    if (check3) {
      rep_type += ", ข้อความแสปม";
    }

    let res = await fetch("http://localhost:3000/attractions/api_Report/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ac_id: 13,
        report_type: rep_type,
        report_des: description, // Use the current state value
        date: Header.formatDate(new Date()),
      }),
    });
    if (res.ok){
      this.setDescription("");
      this.setCheck1(false);
      this.setCheck2(false);
      this.setCheck3(false);
      this.setShowReport(false);
      console.log("Report Success!!");
    }else{
      console.log("Report Failed!!");
    }
  }
  public reload(){
    window.location.reload()
  }
  public logout(){
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    window.location.reload()
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
                <Link
                  href={{
                    pathname: "/recipe",
                    query: {
                      searchResult: "",
                    },
                  }}
                >
                  สูตรอาหาร
                </Link>
              </li>
              {this.state.cookieValue ? (<DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage className="border rounded-full w-full h-full border-black" src={this.state.cookieValue.PFP}/>
                    <AvatarFallback ><Image  src={LogoAccount} alt="CN"/></AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link href={{
                    pathname: `/profile/'${this.state.cookieValue.id}'`,
                  query: {blahblah  : this.state.cookieValue.id}}}><DropdownMenuItem>โปรไฟล์</DropdownMenuItem></Link>
                  {this.state.cookieValue.role === "admin" && <DropdownMenuItem onClick={() => location.assign("http://localhost:3000/admin")}>Admin</DropdownMenuItem>}
                  <DropdownMenuItem onClick={() => location.assign("http://localhost:3000/favorite")}>รายการโปรด</DropdownMenuItem>
                  <DropdownMenuItem onClick={this.logout}>ล็อคเอ้าท์</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>):
              (<p className="hover:underline ">
                <Link href="/login">เข้าสู่ระบบ</Link>
              </p>)}
            </ul>
          </div>
        </div>
        <Modal
          isVisible={this.state.showReport}
          onClose={() => this.setShowReport(false)}
        >
          <div className="w-[1260px] h-[620px]  bg-white rounded-lg p-8">
            <form onSubmit={this.handleSunmit.bind(this)}>
              <div className="flex flex-col justify-center items-center">
                <h2 className="text-2xl font-bold mb-4">รายงานปัญหา</h2>
                <div className="space-y-2">
                  {" "}
                  {/* checkbox */}
                  <div>
                    <input
                      type="checkbox"
                      checked={this.state.check1}
                      onChange={this.handleChangeCheckbox}
                      name="check1"
                    ></input>
                    <span className="type1 ml-2">
                      การแสดงความคิดเห็นที่ไม่เหมาะสม
                    </span>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      checked={this.state.check2}
                      onChange={this.handleChangeCheckbox}
                      name="check2"
                    ></input>
                    <span className="type2 ml-2">ภาพ/เนื้อหาที่ไม่เหมาะสม</span>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      checked={this.state.check3}
                      onChange={this.handleChangeCheckbox}
                      name="check3"
                    ></input>
                    <span className="type3 ml-2">ข้อความสแปม</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <h1>คำอธิบายเพิ่มเติม</h1>
                  <textarea
                    className="description w-[893px] h-[199px] px-4 pt-2 border border-black rounded-md"
                    placeholder="ต้องการอธิบายอะไรเพิ่มเติมเกี่ยวกับการรายงาน"
                    name="description"
                    value={this.state.description}
                    onChange={(e) => this.setDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="flex justify-end items-end space-x-4 mt-4">
                <button
                  className="text-xl bg-yellow-500 text-white border border-black rounded-full px-12 py-1"
                >
                  ยินยัน
                </button>
                <button
                  onClick={() => this.setShowReport(false)}
                  className="text-xl bg-white text-black border-2 border-yellow-500 rounded-full px-12 py-1"
                >
                  ยกเลิก
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Header;
