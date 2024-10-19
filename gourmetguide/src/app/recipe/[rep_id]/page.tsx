"use client";
import React, { Component } from "react";
import Heart from "@/app/components/heart";
import Link from "next/link";
import { jwtDecode, JwtPayload } from "jwt-decode";

export default class page extends Component<{ searchParams: any }> {
  state: any = {
    recipe: [],
    isLikeClick: false,
    displayedLikes: 0,
    cookTime: "",
    isClick : false,
    ac_id : "",
    cookieValue: null,
    cookieid : null,
  };

  constructor(props: any) {
    super(props);
  }
  public setCookieID(value : number){
    this.setState({
        cookieid : value
    })
  }
  public setCookieValue(value : JwtPayload){
    this.setState({
        cookieValue : value
    })
  }
  public setAc_ID(value : string){
    this.setState({
      ac_id : value
    })
  }
  public setIsLikeClick(turn : boolean){
    this.setState({
      isLikeClick : turn
    })
  }
  public setDisplayedLikes(value : number){
    this.setState({
      displayedLikes : value
    })
  }
  public AddDisplayedLikes(value : number){
    this.setState({
      displayedLikes: value + 1
    })
  }
  public MinusDisplayedLikes(value : number){
    this.setState({
      displayedLikes: value - 1
    })
  }
  public handleLikeClick() {
    console.log("isClick:", this.state.isLikeClick)
    this.setIsLikeClick(!this.state.isLikeClick);
    if (!this.state.isLikeClick){
      this.AddDisplayedLikes(this.state.displayedLikes);
    }else{
      this.MinusDisplayedLikes(this.state.displayedLikes);
    }
  };
  public setCookTime(value : string){
    this.setState({
      cookTime : value
    })
  }

  public setRecipes(data: any) {
    this.setState({
      recipe: data,
    });
    console.log("recipe", this.state.recipe[0]);
  }

  public async componentDidMount(){
      await this.getRecipe();
      if(this.state.recipe[0]) {this.checkCalories(this.state.recipe[0].rep_time!)};
      this.getCookieValue();
  };

  public checkCalories(value : number){
    if (value > 60){
      let keep = Math.floor(value / 60) + " ชั่วโมง :" + (value % 60)
      this.setCookTime(keep)
    }else{
      this.setCookTime(value.toString())
    }
  }

   public async getRecipe(){
    console.log("rep id :", this.props.searchParams.rep_id);
    try{
    let res = await fetch("http://localhost:3000/attractions/api_specificSearch/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rep_id : this.props.searchParams.rep_id
      }),
    });
    let data: any = await res.json();
    this.setDisplayedLikes(parseInt(JSON.stringify(this.state.recipe[0]?.likes)))
    if (!Array.isArray(data) && typeof data === 'object') {
      data = [data]; 
    
    } else if (!Array.isArray(data)){
      console.error("Unexpected data format:", data);
      // Handle the error appropriately, maybe set a default state or display an error message
      return;
    }

    console.log("data:", data);
    this.setRecipes(data);
    this.setAc_ID(this.state.recipe[0].ac_id)

    if (this.state.recipe[0]) { // Check if data is available
      this.checkCalories(this.state.recipe[0].rep_time!); 
    }
    
  } catch (error) {
    console.error("Error fetching recipe:", error);
     // Handle the error appropriately, perhaps set an error state or display a message to the user
  }
  };

  public setIsClick(turn : boolean){
    this.setState({
        isClick : turn
    })
    this.getFavourite()
  }

  private async getFavourite(){
    console.log('cookiesInbookmark:', this.state.cookieValue?.id)
    let res = await fetch("http://localhost:3000/attractions/api_aorfavourite/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rep_id : this.props.searchParams.rep_id,
          isClick : this.state.isClick,
          ac_id : this.state.cookieid,
        }),
      });
      if(res.ok){
        console.log("Favourite ADD or unFavourtie Success!");
      }else {
        console.log("Error adding favourite")
      }
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
        const decodedToken : any = jwtDecode(cookieValue); // Decode the JWT
        
        this.setCookieValue(decodedToken); // Update state with decoded data
        this.setCookieID(decodedToken.id)
      } catch (error) {
        console.error("Error decoding JWT:", error);
      }
    }
  }
  render() {
    return (
      <div className="bg-gray-200">
        <div className="overflow-y-auto"></div> {/* scroll bar */}
        <div className="w-[90vw] h-full m-auto border-20 border-x-gray-400 bg-yellow-100 px-8 space-y-6 pb-4">
          <div className="flex justify-center pt-10">
            <div className="grid-rows-4 space-y-3">
              {" "}
              {/* ชื่อ รูป แคลอนี่ และ เวลา */}
              <div className="flex justify-center">
                <h1 className="text-3xl font-kanit text-normal  text-yellow-700">
                {this.state.recipe[0]?.rep_name}
                </h1>
              </div>
              <img
                className="w-[529px] h-[343px] shadow-xl rounded-lg object-cover object-center"
                src={this.state.recipe[0]?.rep_img}
                alt="NAN"
              />{" "}
              <div className="flex justify-between px-6">
                <p className="text-yellow-800">แคลอรี่: {this.state.recipe[0]?.calories} kcal</p>
                <p className="text-yellow-800">เวลาในการทำ: {this.state.cookTime} นาที</p>
              </div>
            </div>
          </div>
          <div className="flex flex-cols justify-center">
            {" "}
            {/*ข้อมูลที่เหลือ */}
            <div className="bg-white w-[1471px] h-auto p-4 rounded-lg shadow-lg object-cover object-center">
            <Link href={{
                  pathname: `/profile/${this.state.ac_id}`,
                  query: {
                    blahblah: this.state.ac_id,
                  },
                }}>
              <div className="flex space-x-2">
                
                <img
                  src={this.state.recipe[0]?.userPFP}
                  alt="profile"
                  className="w-6 h-6 rounded-full ml-2"
                />
                <p>{this.state.recipe[0]?.username}</p>
              </div></Link>
              <div className="pl-8 py-2 text-yellow-600">
                <p>
                {this.state.recipe[0]?.rep_des}{" "}
                </p>
              </div>
            </div>
          </div>
          <h1 className="text-3xl pl-4 text-yellow-800">วัตถุดิบ</h1>
          <div className="flex flex-cols justify-center">
            {" "}
            {/*ข้อมูลที่เหลือ */}
            <div className="bg-white w-[1471px] h-auto p-4 rounded-lg shadow-lg">
              <div className="pl-8 py-2 text-yellow-600 whitespace-pre-wrap">
                {this.state.recipe[0]?.rep_ing}{" "}
              </div>
            </div>
          </div>
          <h1 className="text-3xl pl-4 text-yellow-800">วิธีทำอาหาร</h1>
          <div className="flex flex-cols justify-center">
            {" "}
            {/*ข้อมูลที่เหลือ */}
            <div className="bg-white w-[1471px] h-auto p-4 rounded-lg shadow-lg">
              <div className="pl-8 py-2 text-yellow-600 whitespace-pre-wrap">
                {this.state.recipe[0]?.rep_step}{" "}
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <img
              className="w-[1067px] h-[600px] shadow-xl rounded-lg object-cover object-center"
              src={this.state.recipe[0]?.rep_img}
              alt="NAN"
            />{" "}
          </div>
          <div className="flex flex-cols justify-center">
            {" "}
            {/*ข้อมูลที่เหลือ */}
            <div className="bg-white w-[1471px] h-auto px-10 py-4 rounded-lg shadow-lg flex justify-end">
              <div className="flex space-x-4">
              {(this.state.ac_id == this.state.cookieid) && <Link href={{
                  pathname: `/edit_recipe/${this.props.searchParams.rep_id}`,
                  query: {
                    rep_id: this.props.searchParams.rep_id,
                  },
                }}><div><button className=" border border-yellow-800 flex py-2 px-4 rounded-2xl">
                  <p>แก้ไข</p>
                </button></div></Link>}
                {this.state.isClick ? (<button onClick={() => this.setIsClick(!this.state.isClick)} className=" bg-yellow-500 border border-yellow-800 flex py-2 px-4 rounded-2xl">
                  <div className="pt-1 mr-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z" />
                    </svg>
                  </div>
                  <p>บันทึกสูตร</p>
                </button>) : (<button onClick={() => this.setIsClick(!this.state.isClick)} className=" border border-yellow-800 flex py-2 px-4 rounded-2xl">
                  <div className="pt-1 mr-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z" />
                    </svg>
                  </div>
                  <p>บันทึกสูตร</p>
                </button>)}
                <div className="flex pt-2 space-x-2">
                <button onClick={this.handleLikeClick.bind(this)}><Heart rep_id = {this.props.searchParams.rep_id} width={24} height={24}/></button>
                <p className="text-yellow-800">{this.state.displayedLikes}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
