'use client'

import React, { Component, Fragment } from 'react'
import FavoriteCard from '../components/favoriteCard'

export default class Favorite extends Component {
  render() {
    return (
      <>
        <div className='flex justify-center bg-gray-100 h-[92vh]'>
          <div className='w-[90vw] rounded-2xl bg-white my-[3vh] px-[5vw] py-[5vh]'>
            <div className="header mb-[3%]">
              <h1 className=' text-[2rem] mb-[5vh]'>Favorite menu 😋</h1>
              <input className=' focus:outline-none search border-solid border-gray-200 border-[1px] w-[30%] px-[2%] py-[1vh] bg-white rounded-full' type="text" placeholder='Search' />
            </div>
            <div className='h-[80%] flex flex-wrap gap-[7%] justify-center overflow-scroll'>
              <FavoriteCard />
              <FavoriteCard />
              <FavoriteCard />
              <FavoriteCard />
              <FavoriteCard />
              <FavoriteCard />
              <FavoriteCard />
              <FavoriteCard />
            </div>
          </div>
        </div>
      </>
    )
  }
}
