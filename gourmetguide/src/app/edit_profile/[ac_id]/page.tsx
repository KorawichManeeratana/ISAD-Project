"use client"
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { JwtPayload } from 'jwt-decode'
import { cookies } from 'next/headers'
import React from 'react'
import { Component } from 'react'
import { jwtDecode } from 'jwt-decode'

export default class Edit_profile extends Component{
    state : any = {
        cookieValue : null,
        oldUserData : [],
        username: "",
        prof_des: "",
        email: "",
    }
    constructor(props : any){
        super(props)
    }
    public setCookieValue(value : JwtPayload){
        this.setState({
            cookieValue : value
        })
    }
    public setOldUserData(value : string){
      this.setState({
        oldUserData : value
      })
    }
    public setUserName(value : string){
      this.setState({
        username : value
      })
    }

    public setProf_Des(value : string){
      this.setState({
        prof_des : value
      })
    }

    public setEmail(value : string){
      this.setState({
        email : value
      })
    }
    public async componentDidMount(){
        await this.getCookieValue();
        this.getUserInfo();
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
    
      getCookieValue() {
        const cookieValue = this.getCookie('token');
        if (cookieValue) {
          try {
            const decodedToken = jwtDecode(cookieValue); // Decode the JWT
            this.setCookieValue(decodedToken); // Update state with decoded data
          } catch (error) {
            console.error("Error decoding JWT:", error);
          }
        }
      }
      public async changeUserInfo(){
        let a = new FormData();
        let profImg: any = document.querySelector(".profile_Img")!;

        a.append("username", this.state.username);
        a.append("email", this.state.email);
        a.append("profile_des", this.state.prof_des);
        a.append("profile_img", profImg.files![0]);
        a.append("ac_id", this.state.oldUserData.ac_id);

        try{
          let res = await fetch(
            "http://localhost:3000/attractions/api_changeUserInfo/",
            {
              method: "POST",
              body: a
            }
          );
          if (res.ok) {
            this.setState({
                username: "",
                email: "",
                prof_des: ""
            }, () => {
                location.assign(`http://localhost:3000/profile/${this.state.oldUserData.ac_id}?blahblah=${this.state.oldUserData.ac_id}`);
            });
        }
        }catch(error){
          console.log("Error:", error)
        }
      }

      public async getUserInfo(){
        const keep_ad = this.state.cookieValue ? this.state.cookieValue.id : null
        try{
            let res = await fetch(
                "http://localhost:3000/attractions/api_getUserInfo/",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    ac_id: keep_ad,
                  }),
                }
              );
              if(res.ok){
                let data = await res.json();
                console.log("datainedit:", data[0])
                this.setOldUserData(data[0]);
                this.setUserName(data[0].username)
                this.setEmail(data[0].email)
                this.setProf_Des(data[0].profile_des)
              }
              
        }catch(error){
            console.log(error);
        }
      }
    render(){
        const userPic = this.state.cookieValue ? this.state.cookieValue.PFP : null;
        console.log("CookieInedit:", this.state.cookieValue)
        return (
            <div>
                <div className='bg-yellow-500 min-h-screen'>
                    <div className='flex flex-col first:flexjustify-center items-center gap-6 p-10'>
                            <Avatar>
                                <AvatarImage src={userPic}  className='rounded-full' width={250} height={300} />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className='pt-6 flex justify-start px-44'><label className=" w-[200px] h-20 text-3xl font-kanit bg-yellow-300 flex justify-center items-center text-black px-16 py-4 rounded-xl shadow-2xl" htmlFor="pic">Upload</label>
                <input type='file' className='profile_Img hidden' name="pic" id="pic"></input>
                </div>
                    </div>
                    <div className='flex flex-col justify-center items-center gap-2 text-2xl'>
                        <div>
                            <h4>Username</h4>
                            <input className='userName p-2' value={this.state.username} onChange={(e) => this.setUserName(e.target.value)}/>
                        </div>
                        <div>
                            <h4>Email</h4>
                            <input className='email p-2' value={this.state.email} onChange={(e) => this.setEmail(e.target.value)}/>
                        </div>
                        <div>
                            <h4>Description</h4>
                            <textarea className='profile_Des w-[800px] h-[20vh] p-2' value={this.state.prof_des} onChange={(e) => this.setProf_Des(e.target.value)}/>
                        </div>
                        <div>
                            <br/>
                            <button onClick={this.changeUserInfo.bind(this)} className='bg-blue-600 rounded-lg h-16 w-40 text-2xl'>save</button>
                        </div>
                    </div>
                </div>
            </div>
          )
    }
  
}
