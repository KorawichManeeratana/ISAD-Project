'use client';
import React, { Component } from 'react';
import { jwtDecode } from 'jwt-decode';

export default class report_feedback extends Component {
  state : any = {
    isAdmin: false,
  };
  public setIsAdmin(value : boolean){
    this.setState({
      isAdmin : value 
    })
  }
  public kickUser(){
    location.assign("http://localhost:3000")
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
      // Decode the JWT (assuming you're using JWTs)
      // You'll need the 'jwt-decode' package
      try {
        const decodedToken : any = jwtDecode(token);
        if (decodedToken.role === 'admin') {
          this.setIsAdmin(true)
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }
  render() {

    if (!this.state.isAdmin) {
      this.kickUser();
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
        <div 
          className="relative overflow-x-auto bg-yellow-200 p-4 rounded-md mb-4"
          style={{ width: '1500px', height: '900px' }} // Setting width and height to 1820x650
        >
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Problem</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Report Date</th>
              </tr>
            </thead>
            <tbody>
              {/* Empty table body as requested */}
            </tbody>
          </table>

          {/* Pagination buttons aligned to the right */}
          <div className="absolute bottom-4 right-4 flex justify-end mt-4 items-end">
            <button 
              className="px-3 py-2 rounded-l-md bg-gray-300 text-gray-700 hover:bg-gray-400 focus:outline-none focus:bg-gray-400" 
              disabled>
              Previous
            </button>
            <button 
              className="px-3 py-2 hover:bg-gray-400 focus:outline-none focus:bg-gray-400 bg-blue-500 text-white">
              1
            </button>
            <button 
              className="px-3 py-2 hover:bg-gray-400 focus:outline-none focus:bg-gray-400 bg-gray-300 text-gray-700">
              2
            </button>
            <button className="px-3 py-2 bg-gray-300 text-gray-700">...</button>
            <button 
              className="px-3 py-2 hover:bg-gray-400 focus:outline-none focus:bg-gray-400 bg-gray-300 text-gray-700">
              20
            </button>
            <button 
              className="px-3 py-2 rounded-r-md bg-gray-300 text-gray-700 hover:bg-gray-400 focus:outline-none focus:bg-gray-400">
              Next
            </button>
          </div>
        </div>
      </div>
    );
  };
};
