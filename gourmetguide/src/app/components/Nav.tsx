"use client"
import React from 'react'
import Link from 'next/link'
import { useState } from 'react';
import Modal from './modal';

function Header() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div >
        <ul className="flex items-center justify-center py-4 text-yellow-500 font-bold bg-white space-x-6">
          <li className='hover:underline'><Link href="/">logo</Link></li>
          <li className='hover:underline'><Link href="/">หน้าหลัก</Link></li>
          <li className='hover:underline'><Link href="/recipe">สูตรอาหาร</Link></li>
          <p className='hover:underline' onClick={ () => setShowModal(true)}>เข้าสู่ระบบ</p>
        </ul>
        <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
          <div>
          <h3 className='text-black font-bold text-xl mb-5 flex justify-center items-center'>เข้าสู่ระบบ</h3>
          </div>
        </Modal>
    </div>
  )
}

export default Header