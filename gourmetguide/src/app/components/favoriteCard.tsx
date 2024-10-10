'use client'

import React, { Component } from 'react'

export default class FavoriteCard extends Component {
    render() {
        return (
            <div className='border-black border-solid border-[1px] w-[17rem] h-[23rem] rounded-2xl p-[0.5%] shadow-md mb-[5vh]'>
                <div className="bg-green-100 w-[100%] h-[100%] rounded-2xl p-[5%] relative">
                    <div className='h-[40%] aspect-square flex justify-center items-center drop-shadow-2xl mb-[5%]'>
                        <img className='rounded-full h-[100%] w-auto' src='https://s359.kapook.com/pagebuilder/26fcc205-e197-4429-9b2e-2082dd3b7383.jpg'></img>
                    </div>
                    <div className='h-[45%]'>
                        <h1 className='mb-[3%]'>
                            Inse Sapim
                        </h1>
                        <p className='h-[79%] overflow-hidden text-gray-400'>
                            ไม่มีสารหล่อลื่น ไม่มีการป้องกัน ตลอดทั้งคืน ตลอดทั้งวัน จากพื้นห้องครัวถึงที่นั่งชักโครก
                            จากโต๊ะทานอาหารไปยังห้องนอน 
                        </p>
                    </div>
                    <div className='h-[15%] flex justify-between items-center'>
                        <h1>
                            price
                        </h1>
                        <button className='bg-red-400 px-[0.7em] py-[0.2em] rounded-xl text-white'>remove</button>
                    </div>
                    <button className='absolute top-0 right-0 mt-[5%] mr-[5%]'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                        </svg>
                    </button>
                </div>
            </div>
        )
    }
}
