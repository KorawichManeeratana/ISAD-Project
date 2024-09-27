import React from 'react'
import './page.css';
import Link from 'next/link';

class Admin_page extends React.Component{
  render() {return (
    <div className='admin_main_page flex flex-col justify-center items-center'>
        <div className='admin_main_1'>
          <div>account image</div>
          <h1>username</h1>
          </div>
        <div className='admin_c'>
          <div>manage image</div>
          <li>
          <Link href="/admin/manage_account">จัดการแอคเคาท์</Link>
          </li>
          </div>
        <div className='admin_c'>
          <div>recipes image</div>
          <li>
          <Link href="/admin/manage_recipes">จัดการสูตรอาหาร</Link>
          </li>
          </div>
        <div className='admin_c'>
          <div>reports image</div>
          <li>
          <Link href="/admin/report_feedback">รับเรื่องที่แจ้ง</Link>
          </li>
          </div>
    </div>
  )}
}

export default Admin_page;