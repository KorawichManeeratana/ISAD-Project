import React, { Component } from "react";
import logoAccount from "../image/logoaccount.png";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Modal from "./modal";

export default class SearchResultCard extends Component<{
  ac_id?: number;
  rep_id?: number;
  rep_name?: string;
  name?: string;
  Img?: string;
  userPFP?: string;
  descriptions?: string;
  calories?: number;
  cookTimes?: number;
  likes?: number;
  calculatefunction?: Function;
  showButton: boolean;
}> {
  state = {
    changeColor: false,
    changeColorBookMark: false,
    showReport: false,
    description: "",
    check1: false,
    check2: false,
    check3: false,
  };
  constructor(props: any) {
    super(props);
  }
  public setChangeColor(turn: boolean) {
    this.setState({
      changeColor: turn,
    });
  }
  public setChangeColorBookMark(turn: boolean) {
    this.setState({
      changeColorBookMark: turn,
    });
    console.log("");
  }

  public handleColor() {
    this.setChangeColor(!this.state.changeColor);
  }

  public handleColorBookMark() {
    this.setChangeColorBookMark(!this.state.changeColorBookMark);
  }
  public setShowReport(check: boolean) {
    this.setState({
      showReport: check,
    });
  }

  public setDescription(value: string) {
    this.setState({
      description: value,
    });
  }

  public setCheck1(turn: boolean) {
    this.setState({
      check1: turn,
    });
  }

  public setCheck2(turn: boolean) {
    this.setState({
      check2: turn,
    });
  }

  public setCheck3(turn: boolean) {
    this.setState({
      check3: turn,
    });
  }

  handleChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({ description: e.target.value });
  };

  handleChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [e.target.name]: e.target.checked });
  };

  private static formatDate(date: Date) {
    let output: string;
    output = [
      date.getFullYear(),
      (date.getMonth() + 1).toString().padStart(2, "0"),
      date.getDate().toString().padStart(2, "0"),
    ].join("-");
    return output;
  }

  handleSunmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission

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
        ac_id: this.props.ac_id,
        report_type: rep_type,
        report_des: description, // Use the current state value
        date: SearchResultCard.formatDate(new Date()),
      }),
    });
    if (res.ok) {
      this.setDescription("");
      this.setCheck1(false);
      this.setCheck2(false);
      this.setCheck3(false);
      this.setShowReport(false);
      console.log("Report Success!!");
    } else {
      console.log("Report Failed!!");
    }
  };

  render() {
    return (
      <div className="font-kanit">
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
                <button className="text-xl bg-yellow-500 text-white border border-black rounded-full px-12 py-1">
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
        <div className="flex p-4">
          <Link
            href={{
              pathname: `/recipe/${this.props.rep_id}/`,
            query: {
              rep_id : this.props.rep_id
            }}}
          >
            <div className="w-auto cursor-pointer">
              {" "}
              {/* กดอันนี้ละไปหน้าแต่ละอัน */}
              <img
                src={this.props.Img}
                alt="NAN"
                className="w-600 h-64 object-cover object-center"
              />
              <div className="bg-white h-10 px-8 flex justify-end items-center shadow-md">
                <span className="text-gray-600 text-sm">
                  สร้างโดย {this.props.name}
                </span>
                <img
                  src={this.props.userPFP}
                  alt="profile"
                  className="w-6 h-6 rounded-full ml-2"
                />
              </div>
            </div>
          </Link>
          <div className=" bg-white w-[600px] h-[260px] shadow-md">
            <div className="grid grid-cols-3 justify-center">
              <button
                className="pl-6 pb-8"
                onClick={this.handleColorBookMark.bind(this)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  fill={`${
                    this.state.changeColorBookMark === true
                      ? "yellow"
                      : "currentcolor"
                  }`}
                  viewBox="0 0 16 16"
                >
                  <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z" />
                </svg>
              </button>

              <h2 className="text-2xl font-normal tracking-tight text-gray-800 pt-4">
                {this.props.rep_name}
              </h2>
              <div className="flex justify-end items-end px-4 pb-10">
                <span className="text-gray-600 text-sm">15/9/2024</span>
              </div>
            </div>
            <p className=" mx-4 text-gray-800"> คำอธิบาย</p>
            <p className="my-2 mx-4 text-gray-700">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {this.props.descriptions}
            </p>
            <div className="mt-4 mx-4 flex justify-between border-t border-gray-200 pt-4">
              <div className="flex space-x-2">
                <span className="text-gray-600">แคลอรี่</span>
                <span className="text-gray-500 font-medium">
                  {this.props.calories} cal
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <div>
                  <span className="text-gray-600 mr-2">เวลาในการทำ</span>
                  <span className="text-gray-500 font-medium">
                    {this.props.cookTimes} นาที
                  </span>
                </div>
                <div className="flex justify-center pr-4">
                  <button onClick={this.handleColor.bind(this)}>
                    <svg
                      className={`heart mt-1  ${
                        this.state.changeColor === true ? "text-red-600" : ""
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill={`${
                        this.state.changeColor === true ? "red" : "currentcolor"
                      }`}
                      color={`${
                        this.state.changeColor === true ? "red" : "currentcolor"
                      }`}
                    >
                      <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                    </svg>
                  </button>
                  <span className="text-gray-500 font-medium ml-1">
                    {this.props.likes}
                  </span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 p-2">
              <div className="flex p-4 justify-start space-x-4 mt-2 ">
                {this.props.showButton && (
                  <button
                    className="shadow-lg bg-yellow-200 rounded-sm p-2 text-yellow-800"
                    onClick={() => {
                      this.props.calculatefunction!({
                        rep_name: this.props.rep_name,
                        caloreis: this.props.calories,
                      });
                    }}
                  >
                    นำไปคำนวณ
                  </button>
                )}
              </div>
              <div className="flex p-4 justify-end space-x-4 mt-2">
                <button
                  onClick={() => this.setShowReport(true)}
                  className="shadow-lg bg-red-600 rounded-sm p-2 flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="white"
                    viewBox="0 0 16 16"
                  >
                    <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12 12 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A20 20 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a20 20 0 0 0 1.349-.476l.019-.007.004-.002h.001" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
