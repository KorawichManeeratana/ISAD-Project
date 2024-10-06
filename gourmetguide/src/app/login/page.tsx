"use client";
import React, { Component } from "react";
import Modal from "../components/modal";
import Link from "next/link";
import { redirect } from "next/navigation";
import { checkLoginAction } from "../utils/Account/ServerActionUser";
import Loading from "../components/loading";

export default class page extends Component {
  state = {
    email: "",
    password: "",
    showModal: true,
    errorLogin: "",
    loading: false,
  };
  constructor(props: any) {
    super(props);
  }
  public setLoading(check: boolean) {
    this.setState({
      loading: check,
    });
  }
  public setErrorLogin(word: string) {
    this.setState({
      errorLogin: word,
    });
  }
  public setErrorRegister(word: string) {
    this.setState({
      errorRegister: word,
    });
  }
  public setShowModal2(check: boolean) {
    this.setState({
      showModal2: check,
    });
  }
  public setShowModal(check: boolean) {
    this.setState({
      showModal: check,
    });
  }

  private async handleSubmitLogin(e: any) {
    e.preventDefault();
    this.setLoading(true);
    console.log("handlesumitcall");
    let abc: any = document.querySelector(".name");
    let name = abc.value;
    abc = document.querySelector(".password");
    let password = abc.value;
    if (!name || !password) {
      this.setErrorLogin("Please commit all form first!");
      return;
    }
    try {
      this.setErrorLogin("");
      if (!name && !password) {
        this.setErrorLogin("Please Commits all form first!!");
      } else {
        if (
          !(await checkLoginAction(
            JSON.stringify(name),
            JSON.stringify(password)
          ))
        ) {
          this.setErrorLogin("Login Failed");
        }
      }
      this.setLoading(true);
      name = "";
      password = "";
    } catch (error) {
      this.setLoading(true);
      console.log("Login Failed", error);
    }
  }
  render() {
    return (
      <div
        className="w-full h-[843px] flex justify-center items-center font-abrilfatface"
        id="loginbg"
      >
        <div className="w-[800px] h-[843px] container flex items-center justify-center bg-white">
          <div>
            <form onSubmit={this.handleSubmitLogin.bind(this)}>
              <Modal
                isVisible={this.state.loading}
                onClose={() => this.setShowModal2(false)}
              >
                <>
                  <Loading />
                </>
              </Modal>
              <div>
                <h3 className="text-black font-normal text-2xl mt-16 mb-5 flex justify-center items-center">
                  เข้าสู่ระบบ
                </h3>
                <div className='flex flex-row items-center justify-center py-4 text-yellow-500 font-normal bg-white space-x-6"'>
                  <h3 className="text-black font-normal text-xl mb-5 flex justify-center items-center mt-6">
                    ชื่อผู้ใช้งาน:
                  </h3>
                  <input
                    onChange={() => {
                      this.setErrorLogin("");
                    }}
                    type="text"
                    placeholder="กรอกชื่อผู้ใช้งาน"
                    className="name text-black w-96 px-4 py-2 border border-black rounded-l-3xl rounded-r-3xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent flex justify-center items-center ml-6"
                  ></input>
                </div>
                <div className="flex flex-row items-center justify-center py-4 text-yellow-500 font-normal bg-white space-x-10 w-full">
                  <h3 className="text-black font-normal text-xl mb-5 flex justify-center items-center mt-6">
                    รหัสผ่าน:
                  </h3>
                  <input
                    onChange={() => {
                      this.setErrorLogin("");
                    }}
                    type="password"
                    placeholder="กรอกรหัสผ่าน"
                    className="password border border-black text-black w-96 px-6 py-2 rounded-l-3xl rounded-r-3xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent flex justify-center items-center"
                  ></input>
                </div>
                <div className="flex flex-row items-center justify-center py-4 font-normal bg-white">
                  <input type="checkbox"></input>
                  <p className="ml-2">จำฉันไว้</p>
                  <p className="hover:underline ml-40 text-gray-500">
                    ลืมรหัสผ่าน?
                  </p>
                </div>
              </div>
              {this.state.errorLogin && (
                <div className="flex justify-center items-center bg-red-500 w-fit text-white text-sm py-1 px-3 rounded-md">
                  {this.state.errorLogin}
                </div>
              )}
              <div className="space-x-14 my-8">
                <button className="text-xl bg-yellow-500 text-white border border-black rounded-full px-12 py-1">
                  เข้าสู่ระบบ
                </button>
                <a
                  href="/register"
                  type="button"
                  className="text-xl bg-white text-black border-2 border-yellow-500 rounded-full px-12 py-1"
                  onClick={() => {
                    this.setErrorLogin("");
                  }}
                >
                  ลงทะเบียน
                </a>{" "}
                {/* ตั้งกดแล้วเปิดหน้า register ปิดหน้า login */}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
