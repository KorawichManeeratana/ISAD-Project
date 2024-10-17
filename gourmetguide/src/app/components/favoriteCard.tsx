"use client";

import React, { Component } from "react";
import Heart from "./heart";
import Link from "next/link";

export default class FavoriteCard extends Component<{
  ac_id?: number;
  rep_name?: string;
  rep_des?: string;
  calories?: number;
  rep_time?: number;
  rep_img?: string;
  rep_id?: number;
}> {
    state = {
        cookTime: "",
    }
    constructor(props : any){
        super(props)
    }
    public setCookTIme(value : string){
        this.setState({
            cookTime : value
        })
    }
    componentDidMount(): void {
        this.checkCalories(this.props.rep_time ?? 0);
    }

    public async removeFav(){
      if (this.props.rep_id) {console.log("rep_id:", this.props.rep_id)}
      console.log("ac_id:", this.props.ac_id)
        let res = await fetch("http://localhost:3000/attractions/api_removeFav/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              rep_id: this.props.rep_id,
              ac_id: this.props.ac_id
            }),
          });
          if(res.ok){
            console.log("Remove Favourite Success");
          }else {
            console.log("Error Removing favourite")
          }
          window.location.reload()
      }

    public checkCalories = (value: number) =>{
        if (value > 60){
          let keep = Math.round(value / 60) + " ชั่วโมง : " + (value % 60)
          this.setCookTIme(keep)
        }else{
          this.setCookTIme(value.toString())
        }
      }

  render() {
    return (
      <div className="border-black border-solid border-[1px] w-[25rem] h-[23rem] rounded-2xl p-[0.5%] shadow-md mb-[5vh] object-cover object-center">
        <div className="bg-yellow-100 w-[100%] h-[100%] rounded-2xl p-[5%] relative">
          <Link
            href={{
              pathname: `/recipe/${this.props.rep_id}/`,
              query: {
                rep_id: this.props.rep_id,
              },
            }}
          >
            <div className="h-[40%] aspect-square flex justify-center items-center drop-shadow-2xl mb-[5%]">
              <img
                className="rounded-full h-[100%] w-full object-cover"
                src={this.props.rep_img}
              ></img>
            </div>
          </Link>

          <div className="h-[45%]">
            <h1 className="mb-[3%]">{this.props.rep_name}</h1>
            <p className="h-[79%] overflow-hidden text-gray-400">
              {this.props.rep_des}
            </p>
          </div>
          <div className="h-[15%] flex flex-col justify-start items-start">
            <p>แคลอรี่: {this.props.calories} kcal</p>
            <p>เวลาในการทำ: {this.state.cookTime} นาที</p>
          </div>
          <div className="">
          <button onClick={this.removeFav} className="bg-red-400 px-[0.7em] py-[0.2em] rounded-xl text-white absolute right-0 bottom-0">
              remove
            </button>
          </div>
          <button className="absolute top-0 right-0 mt-[5%] mr-[5%]">
            <Heart rep_id={this.props.rep_id} width={16} height={16} />
          </button>
        </div>
      </div>
    );
  }
}
