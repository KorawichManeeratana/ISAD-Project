'use client';
import React, { Component } from 'react'
import './page.css';

export default class manange_recipes_page extends Component {
  render() {
    return ( 
      <div className="box">
        {/* left side */}
        <div>
          <h1 className="h1">Manange<br />Recipes</h1>
          <ul>
            <li><a href="#">คนทำเยอะที่สุด</a></li>
            <li><a href="#">คนทำน้อยที่สุด</a></li>
            <li><a href="#">มีวัตถุดิบอันตราย</a></li>
          </ul>
        </div>
        {/* right side */}
        <div className="box2">
          <div className="flex-container">
            {/* Find Recipes Box */}
            <div className="Find-Recipes-Box">
              <h2 className ="h2">Find Recipes</h2>
            </div>
            {/* menu name box */}
            <div className="box3"> 

            </div>
          </div>
          {/* table box */}
          <div className="box4">

          </div>
        </div>        
      </div>
    )
  }
}
