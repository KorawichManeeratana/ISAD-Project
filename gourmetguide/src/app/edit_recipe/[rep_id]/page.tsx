"use client";
import React, { Component } from "react";
import Heart from "@/app/components/heart";
import Link from "next/link";
import { redirect } from "next/navigation";
import Loading from "@/app/loading";
import Modal from "@/app/components/modal";
import { jwtDecode, JwtPayload } from "jwt-decode";

export default class page extends Component<{ searchParams: any }> {
  state: any = {
    recipe: [],
    cookTime: "",
    ac_id : "",
    calories: "",
    hour : "",
    min: "",
    description:"",
    ingredient:"",
    step:"",
    isloading: false,
    cookieValue : null,
    cookieid : null,
  };

  constructor(props: any) {
    super(props);
  }
  
  public setIsLoading(turn : boolean){
    this.setState({
        isloading : turn
    })
  }
  public setCalories(value : number){
    this.setState({
        calories : value
    })
  }
  public setHour(value : number){
    this.setState({
        hour : value
    })
  }
  public setMin(value : number){
    this.setState({
        min : value
    })
  }
  public setDescription(value : string){
    this.setState({
        description : value
    })
  }
  public setIngredient(value : string){
    this.setState({
        ingredient: value
    })
  }
  public setStep(value : string){
    this.setState({
        step : value
    })
  }
  public setAc_ID(value : string){
    this.setState({
      ac_id : value
    })
  }

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
  };

  public checkCalories(value : number){
    if (value > 60){
      let keep = Math.round(value / 60) + " ชั่วโมง :" + (value % 60)
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
    if (!Array.isArray(data) && typeof data === 'object') {
      data = [data]; 
    
    } else if (!Array.isArray(data)){
      console.error("Unexpected data format:", data);
      return;
    }

    console.log("data:", data);
    this.setRecipes(data);
    this.setAc_ID(this.state.recipe[0].ac_id)

    if (this.state.recipe[0]) { 
      this.checkCalories(this.state.recipe[0].rep_time!); 
    }
    
  } catch (error) {
    console.error("Error fetching recipe:", error);
  }
  };

  public async updateRecipe(){
    this.setIsLoading(true);
    let a = new FormData();

    let c:any = document.querySelector(".editRep_Name");
    let repName = c.value;
    // c = document.querySelector(".repIng");
    // let repIng = c.value;
    c = document.querySelector(".editRep_Step");
    let repStep = c.value;
    c = document.querySelector(".editCalories");
    let repCal = c.value;
    c = document.querySelector(".editHour");
    let repHour : number = c.value;
    c = document.querySelector(".editMin");
    let repMin = c.value;
    let time = (parseInt(repMin) + repHour * 60).toString();
    c = document.querySelector(".editRep_Des");
    let repDes = c.value;

    let repImg:any = document.querySelector(".repImg")!;

    c = document.querySelector(".editRep_Ing")
    let repIng = c.value;

    
    a.append("rep_name", repName);
    a.append("rep_step", repStep);
    a.append("calories", repCal);
    a.append("rep_time", time);
    a.append("rep_des", repDes);
    a.append("rep_img", repImg.files![0]);
    a.append("rep_ing", repIng);
    a.append("rep_id", this.props.searchParams.rep_id)

    let res = await fetch("http://localhost:3000/attractions/api_updateRecipe", {
        method: "POST",
        body: a
    });
    if(res.ok){
        this.setIsLoading(false);
        console.log("Update Recipe Success!");
        location.assign(`/recipe/${this.props.searchParams.rep_id}?rep_id=${this.props.searchParams.rep_id}`);
    }else{
        console.log("Update Recipe Error")
    }
  }
  
  render() {
    return (
      <div className="bg-gray-200">
            <Modal
                isVisible={this.state.loading}
                onClose={() => this.setIsLoading(false)}
              >
                <>
                  <Loading />
                </>
         </Modal>
        <div className="overflow-y-auto"></div> {/* scroll bar */}
        <div className="w-[90vw] h-full m-auto border-20 border-x-gray-400 bg-yellow-100 px-8 space-y-6 pb-4">
          <div className="flex justify-center pt-10">
            <div className="grid-rows-4 space-y-3">
              {" "}
              {/* ชื่อ รูป แคลอนี่ และ เวลา */}
              <div className="w-[100%] h-[15%] flex justify-center">
                <textarea placeholder={this.state.recipe[0]?.rep_name} className="editRep_Name text-3xl font-kanit text-normal text-yellow-700">
                </textarea>
              </div>
              <div className="flex justify-center">
              <img
                className="w-[529px] h-[343px] shadow-xl rounded-lg object-cover object-center"
                src={this.state.recipe[0]?.rep_img}
                alt="NAN"
              />
              </div>
              <div className="flex justify-between">
                <div className="flex justify-end space-x-2">
                <p className=" text-yellow-800">แคลอรี่: </p>
                <textarea className="editCalories w-[20%] h-[50%] p-2" placeholder={this.state.recipe[0]?.calories}></textarea>
                <p className="text-yellow-800">Kcal</p>
                </div>
                <div className="flex justify-center space-x-2">
                <p className="text-yellow-800">เวลาในการทำ: </p>
                <textarea className="editHour w-[10%] h-[50%] p-2" placeholder={Math.round(this.state.cookTime / 60).toString()}></textarea>
                <p className="text-yellow-800">ชั่วโมง</p>
                <textarea className="editMin w-[10%] h-[50%] p-2" placeholder={this.state.cookTime}></textarea>
                <p className="text-yellow-800">นาที</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-cols justify-center">
            {" "}
            {/*ข้อมูลที่เหลือ */}
            <div className="bg-white w-[1471px] h-auto p-4 rounded-lg shadow-lg object-cover object-center">
              <div className="pl-8 py-2 text-yellow-600">
                <textarea className="editRep_Des w-[100%] h-[100%] border"placeholder={this.state.recipe[0]?.rep_des}>
                </textarea>
              </div>
            </div>
          </div>
          <h1 className="text-3xl pl-4 text-yellow-800">วัตถุดิบ</h1>
          <div className="flex flex-cols justify-center">
            {" "}
            {/*ข้อมูลที่เหลือ */}
            <div className="bg-white w-[1471px] h-auto p-4 rounded-lg shadow-lg">
              <div className=" pl-8 py-2 text-yellow-600 whitespace-pre-wrap">
                <textarea className="editRep_Ing w-[100%] h-[20vh] border"placeholder={this.state.recipe[0]?.rep_ing}></textarea>
              </div>
            </div>
          </div>
          <h1 className="text-3xl pl-4 text-yellow-800">วิธีทำอาหาร</h1>
          <div className="flex flex-cols justify-center">
            {" "}
            {/*ข้อมูลที่เหลือ */}
            <div className="bg-white w-[1471px] h-auto p-4 rounded-lg shadow-lg">
              <div className="pl-8 py-2 text-yellow-600 whitespace-pre-wrap">
                <textarea className="editRep_Step w-[100%] h-[20vh] border" placeholder={this.state.recipe[0]?.rep_step}></textarea>
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
          <div className='pt-6 flex justify-center px-44'><label className=" w-[400px] h-60 bg-yellow-300 flex justify-center items-center text-black px-16 py-4 rounded-xl shadow-2xl" htmlFor="pic"><svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" fill="currentColor" viewBox="0 0 16 16">
  <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4z"/>
  <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5m0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"/>
</svg></label>
                <input type='file' className='repImg hidden' name="pic" id="pic"></input>
                </div>
          <div className="flex flex-cols justify-center">
            {" "}
            {/*ข้อมูลที่เหลือ */}
            <div className="bg-white w-[1471px] h-auto px-10 py-4 rounded-lg shadow-lg flex justify-end">
              <div className="flex space-x-4">
                 <button onClick={() => this.updateRecipe()} className=" border border-yellow-800 flex py-2 px-4 rounded-2xl">
                  <p>บันทึก</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
