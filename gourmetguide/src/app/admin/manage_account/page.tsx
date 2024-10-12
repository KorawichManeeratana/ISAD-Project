"use client"
import React, { Component } from 'react'
import './page.css';
import { jwtDecode, JwtPayload } from 'jwt-decode';

export default class manage_account_page extends Component {
  state : any = {
    isAdmin: false,
    cookieValue : null,
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
        <div className="search-bar">
          <input
            type="text"
            placeholder="ค้นหาผู้ใช้งาน"
            className="input"
          />
          <button className="search-button">
            <i className="fas fa-search"></i>
          </button>
        </div>
  
        {/* Yellow box with specified dimensions */}
        <div className="yellow-box">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>First sign in</th>
              </tr>
            </thead>
            <tbody>
              {/* Empty table body */}
            </tbody>
          </table>
  
          {/* Pagination buttons aligned to the right */}
          <div className="pagination">
            <button className="previous" disabled>Previous</button>
            <button className="page active">1</button>
            <button className="page">2</button>
            <button className="page">...</button>
            <button className="page">20</button>
            <button className="next">Next</button>
          </div>
        </div>
      </div>
    )
  }
}