"use client"
import React, { Component } from 'react'
import './page.css';

export default class manage_account_page extends Component {
  render() {
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