"use client"
import React from 'react'
import Image from 'next/image';
import logoAcc from '../image/logoaccount.png';
import logoMan from '../image/logomanage.png';
import logoRec from '../image/logorecipes.png';
import logoRep from '../image/logoreport.png';
import './page.css';
import Link from 'next/link';
import { jwtDecode } from 'jwt-decode';
import { redirect } from 'next/dist/server/api-utils';
import { useRouter } from 'next/navigation';

class Admin_page extends React.Component{
  state : any = {
    cookieValue : null,
    isAdmin: false,
  };
  public setIsAdmin(value : boolean){
    this.setState({
      isAdmin : value 
    })
  }
  
  public setCookieValue(data : any){
    this.setState({
      cookieValue: data
    })
  }
  public kickUser(){
    location.assign("http://localhost:3000")
  }
  componentDidMount() {
    this.checkAdminRole();
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

  checkAdminRole() {
    const token = this.getCookie('token'); // Replace 'token' with your cookie name
    if (token) {
      try {
        const decodedToken : any = jwtDecode(token);
        console.log(decodedToken)
        if (decodedToken.role === 'admin') {
          this.setIsAdmin(true);
          this.setCookieValue(decodedToken);
        }
        this.setCookieValue(decodedToken);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }
  render() {
    console.log("cookie:", this.state.cookieValue)
    if (!this.state.isAdmin) {
      <div className='flex justify-center items-center bg-black w-full h-full'>
        <h1 className='text-3xl text-white'>ACCESS DENIED</h1>
      </div>
    }

    return (
    <div className='admin_main_page flex flex-col justify-center items-center'>
        <div className='admin_main_1'>
          {this.state.cookieValue? (<img src={this.state.cookieValue.PFP} alt={'aun nigga'} width={100} height={100}></img>) :
        (<Image src={logoAcc} alt={'aun nigga'} width={100} height={100}></Image>)}
          <h1 className='text-2xl'>WELCOME ADMIN: username</h1>
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