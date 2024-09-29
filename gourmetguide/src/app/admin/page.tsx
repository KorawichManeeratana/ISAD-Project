"use client"
import React from 'react'
import Image from 'next/image';
import logoAcc from '../image/logoaccount.png';
import logoMan from '../image/logomanage.png';
import logoRec from '../image/logorecipes.png';
import logoRep from '../image/logoreport.png';
import './page.css';
import Link from 'next/link';

class Admin_page extends React.Component{
  render() {return (
    <div className='admin_main_page flex flex-col justify-center items-center'>
        <div className='admin_main_1'>
        <Image src={logoAcc} alt={'aun nigga'} width={100} height={100}></Image>
          <h1>username</h1>
          </div>
        <div className='admin_c'>
          <Link href="/admin/manage_account">
          <Image src={logoMan} alt={'aun nigga'} width={100} height={100}></Image>
          </Link>
          <p>
          <Link href="/admin/manage_account">จัดการแอคเคาท์</Link>
          </p>
          </div>
        <div className='admin_c'>
          <Link href="/admin/manage_recipes">
          <Image src={logoRec} alt={'aun nigga'} width={100} height={100}></Image>
          </Link>
          <p>
          <Link href="/admin/manage_recipes">จัดการสูตรอาหาร</Link>
          </p>
          </div>
        <div className='admin_c'>
          <Link href="/admin/report_feedback">
            <Image src={logoRep} alt={'aun nigga'} width={100} height={100}></Image>
          </Link>
          <p>
          <Link href="/admin/report_feedback">รับเรื่องที่แจ้ง</Link>
          </p>
          </div>
    </div>
  )}
}

export default Admin_page;