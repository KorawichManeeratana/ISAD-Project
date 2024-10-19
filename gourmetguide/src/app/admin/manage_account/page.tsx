"use client"
import React, { Component } from 'react'
import './page.css';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import Userform from '@/app/components/Userform';
import { Search } from 'lucide-react';

export default class manage_account_page extends Component {
  state : any = {
    isAdmin: false,
    cookieValue : null,
    deleted : false,
    item : [],
    search : ""
  };
  public setIsAdmin(value : boolean){
    this.setState({
      isAdmin : value 
    })
  }
  public kickUser(){
    location.assign("http://localhost:3000")
  }
  public setCookieValue(value : JwtPayload){
    this.setState({
      cookieValue : value
    })
  }
  componentDidMount() {
    this.checkAdminRole();
    this.getUserform();
  }

  public setSearch(inp : string){
    this.setState({
      search : inp
    })
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
  public setItem(info : []){
    this.setState({
      item : info
    });
}
  public async getUserform(){
    try {
      let data = await fetch("http://localhost:3000/attractions/api_manageUser", {
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
  public deleteForm(turn : boolean){
    this.setState({
      deleted : turn
  })
  this.getUserform()
  }
  render() {

    if (!this.state.isAdmin) {
      <div className='flex justify-center items-center bg-black w-full h-full'>
        <h1 className='text-3xl text-white'>ACCESS DENIED</h1>
      </div>
    }

    return (
        <div className="container">
        <h1 className="heading">Manage Accounts</h1>
  
        {/* Search bar aligned to the right */}
        <div className="mb-4 flex justify-end">
          <input
            type="text"
            placeholder="ค้นหาผู้ใช้งาน"
            className="search text-black w-96 px-4 py-2 rounded-l-3xl rounded-r-3xl border border-gray-400px focus:outline-none focus:ring-2 focus:ring-yellow-500"
            onChange={e => this.setSearch(e.target.value)}
          />
        </div>
  
        {/* Yellow box with specified dimensions */}
        <div className="relative overflow-x-auto bg-yellow-200 p-4 rounded-md mb-4  space-y-4 divide-y divide-dashed"style={{ width: '1500px', height: '900px' }}>
        <div className='header'>
            <div className='grid grid-cols-5 underline'>
                <div className="basis-1/2">ID</div>
                <div className="basis-1/2">Username</div>
                <div className="basis-1/2">Email</div>
                <div className="basis-1/2">Role</div>
            </div>
        </div>
        {this.state.item && this.state.item.length > 0? ( // Check if items exists and is not empty
            this.state.item.filter((attractions: any) => 
              this.state.search === "" || 
              attractions.username.toLowerCase().includes(this.state.search.toLowerCase())
          ).map((attractions: any) => (
              <React.Fragment key={attractions.ac_id}>
                  <Userform 
                  id = {attractions.ac_id}
                  username = {attractions.username}
                  email = {attractions.email}
                  role = {attractions.role}
                  />
              </React.Fragment>
            ))
          ) : ( 
            
            <div className="mt-10 self-center">
              {" "}
              {/* Vertically center content */}
              <h1 className="text-center text-2xl">ไม่พบผู้ใช้งาน</h1>
            </div>
          )}              
        </div>
      </div>
    )
  }
}