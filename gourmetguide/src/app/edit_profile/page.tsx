"use client"
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import React from 'react'

export default function Edit_profile() {
  return (
    <div>
        <div className='bg-yellow-500 min-h-screen'>
            <div className='flex flex-col first:flexjustify-center items-center gap-6 p-10'>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png"  className='rounded-full' width={250} height={300} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
            <button className='bg-white rounded-lg h-16 w-40 text-2xl'>
                Upload
            </button>
            </div>
            <div className='flex flex-col justify-center items-center gap-2 text-2xl'>
                <div>
                    <h4>Username</h4>
                    <input/>
                </div>
                <div>
                    <h4>Email</h4>
                    <input/>
                </div>
                <div>
                    <h4>Description</h4>
                    <input/>
                </div>
                <div>
                    <br/>
                    <button className='bg-blue-600 rounded-lg h-16 w-40 text-2xl'>save</button>
                </div>
            </div>
        </div>
    </div>
  )
}
