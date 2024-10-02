"use client"
import React, { Component } from 'react'
import Modal from "../components/modal";

export default class page extends Component {
    state = {
        showModal2 : true,
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
      private async handleSubmitRegister(e:any){
        e.preventDefault();
        let abc:any = document.querySelector(".name")
        let name = abc.value
        abc = document.querySelector(".email")
        let email = abc.value
        abc = document.querySelector(".password")
        let password = abc.value
        abc = document.querySelector(".confirmPassword")
        let confirmPassword = abc.value
        if (password != confirmPassword){
          this.setErrorRegister("Password does not match!")
          return;
        }
    
        if (!name || !email || !password || !confirmPassword){
          this.setErrorRegister("Please commit all form first!");
          return;
        }
        
        try {
            const resCheckUser = fetch("http://localhost:3000/attractions/api_checkUser",{
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({email})
            })
    
            const {user} = await (await resCheckUser).json();
    
            if (user){
              this.setErrorRegister("This account is already exists!");
              return;
            }
            let res = await fetch("http://localhost:3000/attractions/api_register", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                name: name, email: email, password: password
              })
            })
            if (res.ok) {
              const form = e.target;
              this.setErrorRegister("");
              form.reset();
            }else {
              console.log("User registration failed.");
            }
        }catch(error) {
          console.log("Error during registration.", error);
        }
      }
  render() {
    return (
      <div><Modal isVisible={this.state.showModal2} onClose={() => this.setShowModal2(false)}> {/*เนื้อหาของหน้า register*/}
      <div>
        <form onSubmit={this.handleSubmitRegister.bind(this)}>
          <div>
            <h3 className="text-black font-normal text-2xl mb-3 flex justify-center items-center">
              ลงทะเบียน
            </h3>
            <div className="flex flex-col items-center justify-center">
              <div className='flex flex-row items-center justify-center py-2 text-yellow-500 font-normal bg-white space-x-6"'>
                <h3 className="text-black font-normal text-xl mb-5 flex justify-center items-center mt-6 mr-20">
                  อีเมล:
                </h3>
                <input
                  onChange={() => {this.setErrorRegister("")}}
                  type="email"
                  placeholder="กรอกอีเมล (example@gmail.com)"
                  className="email text-black w-96 px-4 py-2 border border-black rounded-l-3xl rounded-r-3xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent flex justify-center items-center ml-6"
                ></input>
              </div>
              <div className='flex flex-row items-center justify-center py-2 text-yellow-500 font-normal bg-white space-x-6"'>
                <h3 className="text-black font-normal text-xl mb-5 flex justify-center items-center mt-6 mr-8">
                  ชื่อผู้ใช้งาน:
                </h3>
                <input
                  onChange={() => {this.setErrorRegister("")}}
                  type="text"
                  placeholder="กรอกชื่อผู้ใช้งาน"
                  className="name text-black w-96 px-4 py-2 border border-black rounded-l-3xl rounded-r-3xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent flex justify-center items-center ml-6"
                ></input>
              </div>
              <div className="flex flex-row items-center justify-center py-2 text-yellow-500 font-normal bg-white space-x-10 w-full">
                <h3 className="text-black font-normal text-xl mb-5 flex justify-center items-center mt-6 mr-8">
                  รหัสผ่าน:
                </h3>
                <div className="flex flex-col items-end mt-6">
                <input
                  onChange={() => {this.setErrorRegister("")}}
                  type="password"
                  placeholder="กรอกรหัสผ่าน (อย่างน้อย 8 หรือ 12 ตัวอักษร)"
                  className="password border border-black text-black w-96 px-4 py-2 rounded-l-3xl rounded-r-3xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent flex justify-center items-center"
                ></input>
                <p className="text-normal text-gray-500 text-sm">ต้องมีตัวเลข, ตัวพิมพ์เล็ก, ตัวพิมพ์ใหญ่</p>
                </div>
              </div>
              <div className='flex flex-row items-center justify-center py-2 text-yellow-500 font-normal bg-white space-x-6"'>
                <h3 className="text-black font-normal text-xl mb-5 flex justify-center items-center mt-6">
                  ยินยันรหัสผ่าน:
                </h3>
                <input
                  onChange={() => {this.setErrorRegister("")}}
                  type="password"
                  placeholder="กรอกรหัสผ่าน"
                  className="confirmPassword text-black w-96 px-4 py-2 border border-black rounded-l-3xl rounded-r-3xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent flex justify-center items-center ml-6"
                ></input>
              </div>
            </div>
          </div>
            {this.state.errorRegister && (
              <div className="flex justify-center items-center bg-red-500 w-fit text-white text-sm py-1 px-3 rounded-md">{this.state.errorRegister}</div>
            )}
          <div className="justify-center items-center my-8">
            <button className="text-xl bg-yellow-500 text-white border border-black rounded-full px-12 py-1">ลงทะเบียน</button>
            <div className="flex flex-row space-x-4 justify-center items-center">
              <p className="">มีบัญชีอยู่แล้ว?</p>
              <a href="/login" className="hover:underline hover:text-blue-400" onClick={() => {this.setErrorRegister("")}}>เข้าสู่ระบบ</a> {/* ตั้งกดแล้วปิดหน้า register เปิดหน้า login */}
            </div>
          </div>
          </form>
      </div>
      </Modal></div>
    )
  }
}
