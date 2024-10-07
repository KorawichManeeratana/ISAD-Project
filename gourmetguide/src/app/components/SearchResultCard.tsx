import React, { Component } from "react";
import logoAccount from "../image/logoaccount.png";
import Image from "next/image";


export default class SearchResultCard extends Component<{rep_name?: string, name?: string,  Img?: string , userPFP?: string, descriptions?: string, calories? : number, cookTimes?: number, likes?: number}> {
    state = {
        changeColor : false,
        changeColorBookMark : false
    }
    constructor(props : any){
        super(props)
    }
    public setChangeColor(turn : boolean){
        this.setState({
            changeColor : turn
        })
    }
    public setChangeColorBookMark(turn : boolean){
        this.setState({
            changeColorBookMark : turn
        })
        console.log("")
    }

    public handleColor(){
        this.setChangeColor(!this.state.changeColor)
    }

    public handleColorBookMark(){
        this.setChangeColorBookMark(!this.state.changeColorBookMark)
    }

  render() {
    return (
      <div className="font-kanit">
        <div className="flex p-4">
          <div className="w-auto">
            <img src={this.props.Img} alt="NAN" className="w-600 h-64 object-cover object-center"/>
            <div className="bg-white h-10 px-8 flex justify-end items-center shadow-md">
              <span className="text-gray-600 text-sm">สร้างโดย {this.props.name}</span>
              <img
                src={this.props.userPFP}
                alt="profile"
                className="w-6 h-6 rounded-full ml-2"
              />
            </div>
          </div>
          <div className=" bg-white w-[600px] h-[260px] shadow-md">
            <div className="grid grid-cols-3 justify-center">
                <button className="pl-6 pb-8"onClick={this.handleColorBookMark.bind(this)}><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill={`${(this.state.changeColorBookMark === true)? "yellow" : "currentcolor"}`} viewBox="0 0 16 16">
                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z"/>
            </svg></button>
            
              <h2 className="text-2xl font-normal tracking-tight text-gray-800 pt-4">
                {this.props.rep_name}
              </h2>
              <div className="flex justify-end items-end px-4 pb-10">
                <span className="text-gray-600 text-sm">
                  15/9/2024
                </span>
              </div>
            </div>
            <p className=" mx-4 text-gray-800"> คำอธิบาย</p>
            <p className="my-2 mx-4 text-gray-700">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.props.descriptions}
            </p>
            <div className="mt-4 mx-4 flex justify-between border-t border-gray-200 pt-4">
              <div className="flex space-x-2">
                <span className="text-gray-600">แคลอรี่</span>
                <span className="text-gray-500 font-medium">{this.props.calories} cal</span>
              </div>
              <div className="flex items-center space-x-4">
                <div>
                  <span className="text-gray-600 mr-2">เวลาในการทำ</span>
                  <span className="text-gray-500 font-medium">{this.props.cookTimes} นาที</span>
                </div>
                <div className="flex justify-center pr-4">
                    <button onClick={this.handleColor.bind(this)}><svg
                    className={`heart mt-1  ${(this.state.changeColor === true)? "text-red-600" : ""}`}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill={`${(this.state.changeColor === true)? "red" : "currentcolor"}`}
                    color={`${(this.state.changeColor === true)? "red" : "currentcolor"}`}
                  >
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                  </svg></button>
                  <span className="text-gray-500 font-medium ml-1">{this.props.likes}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
