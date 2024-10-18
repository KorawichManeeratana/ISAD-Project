"use client";
import React, { Component } from "react";
import Image from "next/image";
import "./page.css";

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";

import Heart from "@/app/components/heart";
import CadeshowRecipe from "@/app/components/cadeshowRecipe";
import RecipesPost1 from "@/app/components/topRecommend/recipesInProf";
import { JwtPayload } from "jwt-decode";
import { jwtDecode } from "jwt-decode";
import { decode } from "punycode";

export default class page extends Component<{ searchParams: any }> {
  state: any = {
    userData: [],
    prof_detail: [],
    isClick: false,
    cookieValue: null,
    cookieID : null,
  };

  constructor(props: any) {
    super(props);
  }
  public setCookieID(value : number){
    this.setState({
      cookieID : value
    })
  }
  public setCookieValue(value : JwtPayload){
    this.setState({
      cookieValue : value
    })
    
  }

  public setUserData(value: []) {
    this.setState({
      userData: value,
    });
  }

  public setProf_Detail(value: []) {
    this.setState({
      prof_detail: value,
    });
  }

  public setIsClick(value: boolean) {
    this.setState({
      isClick: value,
    });
  }

  public async componentDidMount() {
    await this.getCookieValue();
    this.getUserInfo();
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
  public async getUserInfo() {
    try{
      let res = await fetch(
        "http://localhost:3000/attractions/api_getUserInfo/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ac_id: this.props.searchParams.blahblah,
          }),
        }
      );
      let data: any = await res.json();
      console.log("data:", data[0]);
      this.setUserData(data);
      this.setProf_Detail(data[0]);
    }catch(error){
      console.log("error:", error);
    }
  }

  render() {
    console.log("CookieID:", this.state.cookieID)
    console.log("user:", this.state.userData[0]);
    return (
      <div className="bg-gray-400 relative z-10">
        <div className="overflow-y-auto"></div> {/* scroll bar */}
        <div className="w-[10vw] h-auto m-auto bg-gray-400 absolute left-0 z-10"></div>
        <div className="w-[90vw] h-[1800px] m-auto border-20 border-x-gray-400 bg-yellow-100 pl-8 absolute right-0">
          <div className="flex justify-left margin-auto">
            <div className="bg-yellow-100 h-full flex-grow flex space-x-4 space-y-6 items-start">
              <div className="p-4">
                <Avatar>
                  <AvatarImage
                    src={this.state.prof_detail.userPFP!}
                    className="rounded-full"
                    width={200}
                    height={200}
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>

              <div className="flex flex-col items-start space-x-4">
                <div>
                  <h1 className="text-4xl text-yellow-700">
                    {this.state.prof_detail.username}
                  </h1>
                  <h1 className="text-xl text-yellow-700">
                    Chef and restaurateur
                  </h1>
                  <p className="text-yellow-600">
                    {this.state.prof_detail.profile_des}
                  </p>
                </div>
                <br></br>
                <div className="py-6">
                  <div>
                    {(this.props.searchParams.blahblah == this.state.cookieID) && <Link href={{
                  pathname: `/edit_profile/${this.props.searchParams.blahblah}`
                }}>
                      <button className="bg-white text-yellow-700 py-2 px-6 ml-10 rounded-l-3xl rounded-r-3xl h-14 w-30 text-xl font-bold">
                        Edit Profile
                      </button>
                    </Link>}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-10">
            <div className="yourRecipe flex flex-col items-startrelative">
              {" "}
              {/* Changed to flex-col */}
              <div className=" items-start bg-yellow-700 rounded-full px-4 py-2 relative">
                <div className="flex items-center justify-between w-full">
                  {" "}
                  {/* New div for header */}
                  <h1 className="text-white pl-4 text-xl"> สูตรอาหารของคุณ </h1>
                  <div
                    className="pr-6 pt-2 cursor-pointer"
                    onClick={() => this.setIsClick(!this.state.isClick)}
                  >
                    {" "}
                    {/* onClick on div */}
                    <CadeshowRecipe /> {/* No longer wrapped in a button */}
                  </div>
                </div>
              </div>
              {!this.state.isClick && (
                <div className="picRecipe justify-center items-center grid grid-cols-4 gap-2">
                  {this.state.userData.length > 0 &&
                    this.state.userData.map((attractions: any) => (
                      <React.Fragment key={attractions.rep_id}>
                        <div className="py-6 flex flex-col justify-center items-center">
                          <div className="w-auto cursor-pointer">
                            {" "}
                            {/* กดอันนี้ละไปหน้าแต่ละอัน */}
                            <RecipesPost1 rep_id={attractions.rep_id} Img={attractions.rep_img} rep_name={<Heart
                                rep_id={attractions.rep_id}
                                width={16}
                                height={16}
                              />}/>
                            </div>
                          </div>
                      </React.Fragment>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
