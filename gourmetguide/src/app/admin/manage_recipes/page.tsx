'use client';
import React, { Component } from 'react'
import './page.css';

export default class manange_recipes_page extends Component {
  render() {
    return ( 
      <div className="box">
        {/* Left Side */}
        <div className='side-box'>
          <h1>Manage<br />Recipes</h1>
          <div className="badge">
            <li><a href="#">คนทำเยอะที่สุด</a></li>
            <li><a href="#">คนทำน้อยที่สุด</a></li>
            <li><a href="#">มีวัตถุดิบอันตราย</a></li>
          </div>
          <div className="side-btn">
            <a href='#' className='new-recipe'>New Recipe</a>
          </div>
        </div>
        {/* Right Side */}
        <div className="box2">
          <div className="flex-container">
            {/* Find Recipes Box */}
            <div className="find-recipes-box">
              <h2>Find Recipes</h2>
              <div className='search-bar'>
                  <input className = 'search-bar-input' type="text" placeholder='ค้นหาสูตรอาหาร'/>
              </div>
            </div>
            {/* Menu Box */}
            <div className="box3">
              <h3 className ="h3">Menu Name</h3>
              <div className='detail-box'>
                {/* Line 1 */}
                <h4>คำอธิบาย :</h4><input className = 'detail-input1'type="text"/>
              </div>
              <div className='detail-line'>
                {/* Line 2 */}
                <div className='detail-box'>
                  <h4>ราคา :</h4><input className = 'detail-input2'type="text"/>
                </div>
                <div className='detail-box2'>
                  <h4>ประเภท :</h4><input className = 'detail-input2'type="text"/>
                </div>
              </div>
              <div className='detail-line'>
                {/* Line 3 */}
                <div className='detail-box'>
                  <h4>แคลอรี่ :</h4><input className = 'detail-input2'type="text"/>
                </div>
                <div className='detail-box2'>
                  <h4>เวลาในการทำ :</h4><input className = 'detail-input2'type="text"/>
                </div>
              </div>
              <div className='box3-btn'>
                  <a href='#' className='delete-btn'>ลบสูตรอาหาร</a>
              </div>
            </div>
          </div>
          {/* Table Box */}
          <div className="box4">
            <div>
              <table>
                <thead>
                  <tr>
                    <th>เเก้ไข</th>
                    <th>วัตถุดิบ</th>
                    <th>จำนวน</th>
                    <th>ราคา</th>
                    <th>ลบ</th>
                  </tr>
                </thead>
                <tbody>
                  {/* recipe data*/}
                </tbody>
              </table>
            </div>
            <div className='box4-btn'>
              <a href='#' className='finish-btn'>เสร็จสิ้น</a>
            </div>
          </div>
        </div>        
      </div>
    )
  }
}
