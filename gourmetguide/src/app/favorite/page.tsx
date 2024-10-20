'use client'

import React, { Component, Fragment } from 'react'
import FavoriteCard from '../components/favoriteCard'
import { jwtDecode, JwtPayload } from 'jwt-decode'

export default class Favorite extends Component {
  state : any = {
    favorite : [],
    cookieValue : null,
    allFavData : [],
  }
  constructor(props : any){
    super(props)
  }
  public setFavorite(data : []){
    this.setState({
      favorite : data
    })
  }
  public setCookieValue(value : JwtPayload){
    this.setState({
      cookieValue : value
    })
  }
  
  public setAllFavData(value : []){
    this.setState({
      allFavData : value
    })
  }
  async componentDidMount() {
    await this.getCookieValue();
    this.getAllFavourite();
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
        const decodedToken = jwtDecode(cookieValue); // Decode the JWT
        this.setCookieValue(decodedToken); // Update state with decoded data
      } catch (error) {
        console.error("Error decoding JWT:", error);
      }
    }
  }

  public async getAllFavourite(){
    console.log("cookieinFav:", this.state.cookieValue.id)
    let res = await fetch("http://localhost:3000/attractions/api_getAllfavourite/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ac_id : this.state.cookieValue.id,
      }),
    });
    let data: any = await res.json();
    console.log("data:", data);
    this.setAllFavData(data);
  }
  render() {
    return (
      <>
        <div className='flex justify-center bg-gray-100 h-[92vh]'>
          <div className='w-[90vw] rounded-2xl bg-white my-[3vh] px-[5vw] py-[5vh]'>
            <div className="header mb-[3%]">
              <h1 className=' text-[2rem] mb-[5vh]'>Favorite menu 😋</h1>
              <input className=' focus:outline-none search border-solid border-gray-200 border-[1px] w-[30%] px-[2%] py-[1vh] bg-white rounded-full' type="text" placeholder='Search' />
            </div>
            {this.state.allFavData && this.state.allFavData.length > 0 ? (<div className='h-[80%] flex flex-wrap gap-[7%] overflow-scroll'>
            {this.state.allFavData.map((attractions: any) => (
              <React.Fragment key={attractions.rep_id}>
                <FavoriteCard
                rep_name={attractions.rep_name}
                rep_id={attractions.rep_id}
                rep_des={attractions.rep_des}
                rep_img={attractions.rep_img}
                rep_time={attractions.rep_time}
                ac_id = {attractions.ac_id}
                calories={attractions.calories}
                />
              </React.Fragment>
            ))}

            </div>) : (<div></div>)}
          </div>
        </div>
      </>
    )
  }
}
