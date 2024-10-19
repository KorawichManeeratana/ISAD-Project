'use client';
import React, { Component } from 'react'
import './page.css';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import Managerecipecard from "../../components/managerecipecard"
import Link from 'next/link';
import { Search } from 'lucide-react';


export default class manange_recipes_page extends Component {
  state : any = {
    isAdmin: false,
    cookieValue: null,
    allRecipe : [],
    search : ""
  };
  public setIsAdmin(value : boolean){
    this.setState({
      isAdmin : value 
    })
  }
  public setAllRecipe(value: []){
    this.setState({
      allRecipe: value
    })
  }

  public setCookieValue(value : JwtPayload){
    this.setState({
      cookieValue : value
    })
  }
  public kickUser(){
    location.assign("http://localhost:3000")
  }

  public setSearch(inp : string){
    this.setState({
      search : inp
    })
  }

  public async componentDidMount() {
    await this.checkRole();
    this.getRecipe();
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

  checkRole() {
    const token = this.getCookie('token'); // Replace 'token' with your cookie name
    if (token) {
      try {
        const decodedToken : any = jwtDecode(token);
        console.log(decodedToken.role)
        if (decodedToken.role === 'admin') {
          this.setIsAdmin(true);
          this.setCookieValue(decodedToken);
        }else{
          this.setIsAdmin(false);
          this.kickUser();
        }
        this.setCookieValue(decodedToken);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }

  public async getRecipe(){
    let res = await fetch("http://localhost:3000/attractions/api_getAllRecipe/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: ""
    });
    if(res.ok){
      let data: any = await res.json();
      console.log("data:", data);
      this.setAllRecipe(data);
    }else{
      console.log("Error Occur when fetching Recipe Data")
    }
  }

  render() {

    if (!this.state.isAdmin) {
      <div className='flex justify-center items-center bg-black w-full h-full'>
        <h1 className='text-3xl text-white'>ACCESS DENIED</h1>
      </div>

    }

    return ( 
      <div className="w-[100vw] h-[100vh] p-[35px] bg-yellow-600">
        <div className='flex w-full h-full'>
        {/* Left Side */}
        <div className='side-box'>
          <h1>Manage<br />Recipes</h1>
          <div className="badge">
            <li><a href="#">คนทำเยอะที่สุด</a></li>
            <li><a href="#">คนทำน้อยที่สุด</a></li>
            <li><a href="#">มีวัตถุดิบอันตราย</a></li>
          </div>
          <div className="side-btn">
            <Link href={{
              pathname: `/createpost/`,
            }}><p className='new-recipe'>New Recipe</p></Link>
          </div>
        </div>
        {/* Right Side */}
        <div className="box2 w-[95%] h-full bg-white rounded-lg space-y-2 px-4">
        <h1 className='flex justify-center text-yellow-700 text-3xl'>Find Recipes</h1>
          <div className='space-y-4 flex justify-end'>
              
              <div className=''>
                  <form  ><input
                    type="text"
                    placeholder="ค้นหาสูตรอาหาร"
                    className="search text-black w-96 px-4 py-2 rounded-l-3xl rounded-r-3xl border border-gray-400px focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    onChange={e => this.setSearch(e.target.value)}
                  /></form>
                  
                </div>
            
              </div>
              <div className='bg-yellow-50 w-full h-[85%] pl-4 space-y-4 overflow-y-auto'>
              <div className='grid grid-cols-5 underline justify-center items-center'>
                <div className="basis-1/2">รหัสสูตรอาหาร</div>
                <div className="basis-1/2">ชื่อสูตรอาหาร</div>
                <div className="basis-1/2">ผู้สร้างสูตรอาหาร</div>
                <div className="basis-1/2">แก้ไข</div>
                <div className="basis-1/2">ลบ</div>
            </div>
            {this.state.allRecipe && this.state.allRecipe.length > 0 ? ( // Check if items exists and is not empty
            this.state.allRecipe.filter((attractions: any) => 
              this.state.search === "" || 
              attractions.rep_name.toLowerCase().includes(this.state.search.toLowerCase())
          ).map((attractions: any) => (
              <React.Fragment key={attractions.rep_id}>
                <div className="">
                  <Managerecipecard
                  ac_id={attractions.ac_id}
                  rep_id={attractions.rep_id}
                  rep_name={attractions.rep_name}
                  owner={attractions.username}
                  />
                </div>
              </React.Fragment>
            ))
          ) : (
            <div className="mt-10 self-center">
              {" "}
              {/* Vertically center content */}
              <h1 className="text-center text-2xl">ไม่พบสูตรอาหารที่ต้องการ</h1>
            </div>
          )}
          </div>
          </div>
          
        </div>
      </div>       
    )
  }
}
