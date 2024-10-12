"use client"
import React, { Component } from 'react'
import cat from '../image/test01.jpg';
import Image from 'next/image';
import './page.css';

import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import Link from 'next/link';

export default class page extends Component {
render(){
    return(
    <div className='bg-yellow-100 h-full'>
      <div className="flex justify-left margin-auto">
        <div className="bg-yellow-100 h-full flex-grow flex space-x-4 space-y-6 items-start" >

          <div className='p-4'>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png"  className='rounded-full' width={200} height={200} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>

          <div className="flex flex-col items-start space-x-4">
            <div>
                <h1 className="text-4xl text-yellow-700">Gordon Ramzy</h1>
                <h1 className="text-xl text-yellow-700">Chef  and restaurateur</h1>
                <p className ="text-yellow-600">ดิชั้นอยากจะแชร์สูตรอาหารที่ค้นพบขึ้นจากโลกกรูเม่ให้ทุกๆคนได้ลองนำไปทำดูค่ะ</p>
            </div>
          <br></br>
          <div className="py-6">
            <div>
              <Link href='/edit_profile'>
                <button className="bg-white text-yellow-700 py-2 px-6 ml-10 rounded-l-3xl rounded-r-3xl h-14 w-30 text-xl font-bold">
                  Edit Profile
                </button>
              </Link>
            </div>
          </div>
        </div>
        </div>
      </div>
      <div className='p-10'>
        <div className='bg-yellow-100 h-full border-solid border-4 border-black rounded-lg'>
          <div className='grid grid-cols-6 gap-2 bg-white'>
            <Image id='recipe_com' src={cat} alt={'aun nigga'}></Image>
            <Image id='recipe_com' src={cat} alt={'aun nigga'}></Image>
            <Image id='recipe_com' src={cat} alt={'aun nigga'}></Image>     
            <Image id='recipe_com' src={cat} alt={'aun nigga'}></Image>
            <Image id='recipe_com' src={cat} alt={'aun nigga'}></Image>
            <Image id='recipe_com' src={cat} alt={'aun nigga'}></Image>
            <Image id='recipe_com' src={cat} alt={'aun nigga'}></Image>     
            <Image id='recipe_com' src={cat} alt={'aun nigga'}></Image>
            <Image id='recipe_com' src={cat} alt={'aun nigga'}></Image>
            <Image id='recipe_com' src={cat} alt={'aun nigga'}></Image>
            <Image id='recipe_com' src={cat} alt={'aun nigga'}></Image>     
            <Image id='recipe_com' src={cat} alt={'aun nigga'}></Image>
            <Image id='recipe_com' src={cat} alt={'aun nigga'}></Image>
            <Image id='recipe_com' src={cat} alt={'aun nigga'}></Image>
            <Image id='recipe_com' src={cat} alt={'aun nigga'}></Image>     
            <Image id='recipe_com' src={cat} alt={'aun nigga'}></Image>
          </div>
        </div>
      </div>
    </div>)
}
    
  }

