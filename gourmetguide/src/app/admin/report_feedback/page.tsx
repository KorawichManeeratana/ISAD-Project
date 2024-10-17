'use client';
import React, { Component } from 'react';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import Reportform from '@/app/components/Reportform';

export default class report_feedback extends Component {
  state : any = {
    isAdmin: false,
    cookieValue: null,
    deleted : false,
    item : []
  };
  public setIsAdmin(value : boolean){
    this.setState({
      isAdmin : value 
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

  public setItem(info : []){
      this.setState({
        item : info
      });
  }

  componentDidMount() {
    this.checkAdminRole();
    this.getReport();
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

  checkAdminRole() {
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

  public deleteForm(turn : boolean){
    this.setState({
      deleted : turn
  })
  this.getReport()
  }

  public async getReport(){
    try {
      let data = await fetch("http://localhost:3000/attractions/api_reportFeedback", {
          method: "POST",
          headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          deleted : this.state.deleted,
        }),         
          });
  
        let info = await data.json();
        console.log(info);
        this.setItem(info);
    } catch(error){
        console.log("Error : ", error);
    }
  }
  render() {
    console.log("item : ", this.state.item);
    if (!this.state.isAdmin) {
      <div className='flex justify-center items-center bg-black w-full h-full'>
        <h1 className='text-3xl text-white'>ACCESS DENIED</h1>
      </div>
    }

    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Manage Reports</h1>

        {/* Search bar aligned to the right */}
        <div className="mb-4 flex justify-end"> 
          <input 
            type="text"
            placeholder="ค้นหาผู้ใช้งาน" 
            className="px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" 
          />
          <button className="px-3 py-2 ml-2 rounded-md bg-gray-300 text-gray-700 hover:bg-gray-400 focus:outline-none focus:bg-gray-400">
            <i className="fas fa-search"></i>
          </button>
        </div>
        
        {/* Yellow box with specified dimensions */}
        <div className="relative overflow-x-auto bg-yellow-200 p-4 rounded-md mb-4  space-y-4 divide-y divide-dashed"style={{ width: '1500px', height: '900px' }}> 
          <div className='header'>
            <div className='grid grid-cols-6 underline'>
                <div className="basis-1/2">ID</div>
                <div className="basis-1/2">Username</div>
                <div className="basis-1/2">Problem</div>
                <div className="basis-1/2">Status</div>
                <div className="basis-1/2">Reportdate</div>
                <div className="basis-1/2"></div>
            </div>
          </div>
        {this.state.item && this.state.item.length > 0 ? ( // Check if items exists and is not empty
            this.state.item.map((attractions: any) => (
              <React.Fragment key={attractions.report_id}>
                  <Reportform 
                  id = {attractions.report_id}
                  username = {attractions.username}
                  problem = {attractions.report_des}
                  status = {attractions.status}
                  created_date = {attractions.created_date}
                  />
              </React.Fragment>
            ))
          ) : (
            
            <div className="mt-10 self-center">
              {" "}
              {/* Vertically center content */}
              <h1 className="text-center text-2xl">ไม่พบเรื่องรับแจ้ง</h1>
            </div>
          )}         
        </div>
      </div>
    );
  };
};
