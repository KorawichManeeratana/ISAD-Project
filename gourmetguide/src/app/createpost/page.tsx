"use client"
import { jwtDecode, JwtPayload } from 'jwt-decode'
import Link from 'next/link';
import React, { Component } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface Recipe{
  rep_name : string
  rep_des : string
  calories : number
  rep_step : string
  rep_ing : string
  hour: number
  min: number
  time : number
  

}
export default class page extends Component {
  state = {
    errorCreate : "",
    cookieid: null,
  }
  constructor(props : any){
    super(props)
  }

  public setErrorCreate(word : string){
    this.setState({
      errorCreate : word
    })
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
  async componentDidMount() {
    await this.getCookieValue();
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

  public async insertNewRecipe() {
        const img: HTMLImageElement = document.querySelector('.image')!;
        
        let a = new FormData();

        let c:any = document.querySelector(".repName");
        let repName = c.value;
        // c = document.querySelector(".repIng");
        // let repIng = c.value;
        c = document.querySelector(".repStep");
        let repStep = c.value;
        c = document.querySelector(".repCal");
        let repCal = c.value;
        c = document.querySelector(".repHour");
        let repHour : number = c.value;
        c = document.querySelector(".repMin");
        let repMin = c.value;
        let time = (parseInt(repMin) + repHour * 60).toString();
        c = document.querySelector(".repDes");
        let repDes = c.value;

        let repImg:any = document.querySelector(".repImg")!;

        c = document.querySelector(".repIng")
        let repIng = c.value;

        if (!repName || !repStep || !repImg || !repMin){
          this.setErrorCreate("Please commits all form first!")
          return;
        }
        
        a.append("rep_name", repName);
        a.append("rep_step", repStep);
        a.append("calories", repCal);
        a.append("rep_time", time);
        a.append("rep_des", repDes);
        a.append("rep_img", repImg.files![0]);
        a.append("rep_ing", repIng);
        a.append("ac_id", this.state.cookieid!)



        let req = await fetch("http://localhost:3000/attractions/api_Recipes", {
            method: "POST",
            body: a
        });
        let b = await req.json();
        console.log(b.message);
        img.src = b.message;
    }
    public notify(){
      toast.success("Recipe has been created")
    }
  render() {
    return (
      <div className='bg-gray-200'>
        <div className="overflow-y-auto"></div> {/* scroll bar */}
          <div className="w-[90vw] h-auto m-auto border-20 border-x-gray-400 bg-yellow-100 px-8">  {/* เนื้อหา */}
              {this.state.errorCreate && (
                <div className="flex justify-center items-center bg-red-500 w-fit text-white text-sm py-1 px-3 rounded-md">
                  {this.state.errorCreate}
                </div>
              )}
            <h1 className="text-yellow-950 text-3xl font-bold mb-4 pl-16 pt-16">สร้างสูตรอาหาร</h1>
            <div className="flex flex-center justify-center items-center space-x-8">
              <div className="flex flex-col p-6 space-y-14">
              </div>
            </div>
            <h1 className="text-xl text-yellow-400 grid px-40 pt-2">ชื่ออาหาร</h1>
            <input onChange={() => this.setErrorCreate("")} type="text" className='mt-3 ml-44 w-900 h-10 border border-gray-300 rounded-xl px-6 repName' placeholder='ระบุชื่ออาหาร'></input>
            <h1 className="text-xl text-yellow-400 grid px-40 pt-6">วัตถุดิบ</h1>
            <textarea onChange={() => this.setErrorCreate("")} className='mt-3 ml-44 w-900 h-52 border border-gray-300 rounded-xl px-6 pt-4 repIng' placeholder='ระบุวัตถุดิบ(รวมทั้งปริมาณ)'></textarea>
            <h1 className="text-xl text-yellow-400 grid px-40 pt-6">วิธีทำ</h1>
            <textarea onChange={() => this.setErrorCreate("")} className='mt-3 ml-44 w-900 h-60 border border-gray-300 rounded-xl px-6 pt-4 repStep' placeholder='ระบุวิธีทำ(เป็นขั้นตอน)'></textarea>
            <h1 className="text-xl text-yellow-400 grid px-40 pt-6">แคลอรี่</h1>
            <input type="text" className='mt-3 ml-44 w-900 h-10 border border-gray-300 rounded-xl px-6 repCal' placeholder='ระบุจำนวนแคลอรี่'></input>
            <h1 className="text-xl text-yellow-400 grid px-40 pt-6">เวลาในการทำ</h1>
            <div>
                <input onChange={() => this.setErrorCreate("")} type="text" className='mt-3 ml-44 w-450 h-10 border border-gray-300 rounded-xl px-6 repHour' placeholder='ชั่วโมง'></input>
                <span className='ml-5 text-gray-500'>-</span>
                <input onChange={() => this.setErrorCreate("")} type="text" className='mt-3 ml-5 w-450 h-10 border border-gray-300 rounded-xl px-6 repMin' placeholder='นาที'></input>
            </div>
            <h1 className="text-xl text-yellow-400 grid px-40 pt-6">คำอธิบาย</h1>
            <textarea onChange={() => this.setErrorCreate("")} className='mt-3 ml-44 w-900 h-40 border border-gray-300 rounded-xl px-6 pt-4 repDes' placeholder='ระบุคำอธิบาย(ไม่จำเป็นต้องระบุ)'></textarea>
            <h1 className="text-xl text-yellow-400 grid px-40 pt-6">เลือกรูปภาพ</h1>
            <div className="flex items-center justify-center h-4/5">
                    <img className="image h-4/5 rounded-xl shadow-2xl" src=""></img>
              </div>
                <div className='pt-6 flex justify-start px-44'><label className=" w-[400px] h-60 bg-yellow-300 flex justify-center items-center text-black px-16 py-4 rounded-xl shadow-2xl" htmlFor="pic"><svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" fill="currentColor" viewBox="0 0 16 16">
  <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4z"/>
  <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5m0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"/>
</svg></label>
                <input onChange={() => this.setErrorCreate("")} type='file' className='repImg hidden' name="pic" id="pic"></input>
                </div>
            
            {/* <h1 className="text-xl text-yellow-400 grid px-40 pt-6">เลือกวิดีโอ</h1>
            <input type='file' id='imageUpload' className='ml-44 pt-6 file:rounded-full file:px-4 file:border-gray-400 file:text-yellow-600 file:mr-4'></input> */}
            <div className='justify-end flex pb-10 pt-6 gap-2'>
                <button onClick={()=> {this.insertNewRecipe(); this.notify()}} className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-6 ml-10 rounded-l-3xl rounded-r-3xl">สร้างสูตรอาหาร</button>
                <ToastContainer/>
                <Link href={{pathname :'http://localhost:3000/'}}>
                      <button 
                      className='bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-6 ml-10 rounded-l-3xl rounded-r-3xl'>Back</button>
                </Link>
            </div>
          </div>
      </div>
    )
  }
}
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// public notify(){
//   toast("user has been deleted")
// }
// public timeout(delay: number) {
//   return new Promise( res => setTimeout(res, delay) );
// }


// <button type="button" className='bg-red-600 w-40 h-10 rounded-lg' onClick={() => {this.setDelete(true); this.notify()}}>Delete</button>
// <ToastContainer/>