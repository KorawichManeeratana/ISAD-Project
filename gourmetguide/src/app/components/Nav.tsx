import React from 'react'

function Header() {
  return (
    <div >
        <ul className="flex items-center justify-center py-4 text-yellow-500 font-bold bg-white space-x-6">
          <li className='hover:underline'>logo</li>
          <li className='hover:underline'>หน้าหลัก</li>
          <li className='hover:underline'>สูตรอาหาร</li>
          <li className='hover:underline'>เข้าสู่ระบบ</li>
        </ul>
    </div>
  )
}

export default Header