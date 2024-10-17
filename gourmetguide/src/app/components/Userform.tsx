import React, { Component } from 'react'

export default class Userform extends Component <{
    id : number,
    username : string,
    email : string,
    role : string,
    }>{
        state : any ={
            deleted : false
          }
          public setDelete(check : boolean){
            this.setState({deleted : check})
            this.deleteForm();
          }
      
          public async deleteForm(){
          try{
              let de = await fetch("http://localhost:3000/attractions/api_deleteForm(user)",{
                method: "POST",
                headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                ac_id : this.props.id,
                deleted : this.state.deleted,
              }),
                });    
              if(de.ok){
                window.location.reload();
                console.log(de);
              }
          }catch(error){
            console.log("Error : ", error);
          }
        }
  render() {
    return (
        <div className=''>
            <div className='grid grid-cols-5 bg-white text-black p-1 rounded-lg'>
                <div className="basis-1/4">{this.props.id}</div>
                <div className="basis-1/2">{this.props.username}</div>
                <div className="basis-1/2">{this.props.email}</div>
                <div className="basis-1/2">{this.props.role}</div>
                <div className='flex justify-center items-center h-full'>
                <button type="button" className='bg-red-600 w-40 h-10 rounded-lg' onClick={() => this.setDelete(true)}>Delete</button>
                </div>
            </div>
        </div>
    )
  }
}
