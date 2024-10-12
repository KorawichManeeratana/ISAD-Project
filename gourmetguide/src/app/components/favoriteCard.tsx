'use client'

import React, { Component } from 'react'
import Heart from './heart'

export default class FavoriteCard extends Component<{ac_id?: number, rep_name?: string, rep_des?: string, calories?: number, rep_time?: number, rep_img?: string, rep_id? : number}>{
    render() {
        return (
            <div className='border-black border-solid border-[1px] w-[25rem] h-[23rem] rounded-2xl p-[0.5%] shadow-md mb-[5vh] object-cover object-center'>
                <div className="bg-yellow-100 w-[100%] h-[100%] rounded-2xl p-[5%] relative">
                    <div className='h-[40%] aspect-square flex justify-center items-center drop-shadow-2xl mb-[5%]'>
                        <img className='rounded-full h-[100%] w-auto' src={this.props.rep_img}></img>
                    </div>
                    <div className='h-[45%]'>
                        <h1 className='mb-[3%]'>
                        {this.props.rep_name}
                        </h1>
                        <p className='h-[79%] overflow-hidden text-gray-400'>
                            {this.props.rep_des}
                        </p>
                    </div>
                    <div className='h-[15%] flex justify-between items-center'>
                        <p>
                        แคลอรี่: {this.props.calories} kcal
                        </p>
                        <p>
                        เวลาในการทำ: {this.props.calories} นาที
                        </p>
                        <button className='bg-red-400 px-[0.7em] py-[0.2em] rounded-xl text-white'>remove</button>
                    </div>
                    <button className='absolute top-0 right-0 mt-[5%] mr-[5%]'>
                        <Heart  rep_id={this.props.rep_id}  width={16} height={16}/>
                    </button>
                </div>
            </div>
        )
    }
}
